import { CommentsTable, UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import type { CommentType } from '@/types/commentType';
import { asc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const { searchParams } = new URL(request.url);
	const questionId = searchParams.get('question_id');
	const { content, poster_id, username } = await request.json();
	if (!content || !questionId) {
		return NextResponse.json(
			{ message: 'Missing required fields' },
			{ status: 400 }
		);
	}
	console.log('Data from FE', content, poster_id, username);
	const userId = await db
		.select()
		.from(UsersTable)
		.where(eq(UsersTable.username, username))
		.limit(1);

	try {
		const newComment = await db
			.insert(CommentsTable)
			.values({
				commentId: nanoid(),
				content: content,
				questionId: questionId,
				userId: userId[0].id,
				posterId: poster_id ? poster_id : null,
			})
			.returning();

		if (!newComment || newComment.length === 0) {
			return NextResponse.json(
				{ message: 'Failed to insert comment' },
				{ status: 500 }
			);
		}
		// Return the created comment
		return NextResponse.json(newComment, { status: 201 });
	} catch (error) {
		console.error('Error inserting comment:', error);
		return NextResponse.json(
			{ message: 'Error inserting comment' },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const questionId = searchParams.get('question_id');
	if (!questionId) {
		return NextResponse.json(
			{ message: 'Missing required fields' },
			{ status: 400 }
		);
	}
	try {
		const PosterUsers = alias(UsersTable, 'poster_users');

		const comments: CommentType[] = await db
			.select({
				commentId: CommentsTable.commentId,
				posterUsername: PosterUsers.username,
				posterId: CommentsTable.posterId,
				questionId: CommentsTable.questionId,
				createdAt: CommentsTable.createdAt,
				content: CommentsTable.content,
				userId: CommentsTable.userId,
			})
			.from(CommentsTable)
			.leftJoin(UsersTable, eq(CommentsTable.userId, UsersTable.id))
			.leftJoin(PosterUsers, eq(CommentsTable.posterId, PosterUsers.id))
			.where(eq(CommentsTable.questionId, questionId))
			.orderBy(asc(CommentsTable.createdAt));
			console.log(comments)
		return NextResponse.json(comments);
	} catch (error) {
		console.error('Error fetching comments:', error);
		return NextResponse.json(
			{ message: 'Error fetching comments', error: (error as Error).message },
			{ status: 500 }
		);
	}
}
