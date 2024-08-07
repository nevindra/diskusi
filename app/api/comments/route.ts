import {
    CommentsTable,
    UsersTable
} from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('question_id');
	const { content, poster_id } = await request.json();
    if (!content || !questionId) {
		return NextResponse.json(
			{ message: 'Missing required fields' },
			{ status: 400 }
		);
	}
	try {
		const newComment = await db
			.insert(CommentsTable)
			.values({
                commentId: nanoid(),
				content: content,
				questionId: questionId,
				userId: poster_id,
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
        const comments = await db
            .select({
                commentId: CommentsTable.commentId,
                content: CommentsTable.content,
                createdAt: CommentsTable.createdAt,
                username: UsersTable.username,
            })
            .from(CommentsTable)
            .innerJoin(UsersTable, eq(CommentsTable.userId, UsersTable.id))
            .where(eq(CommentsTable.questionId, questionId));
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { message: 'Error fetching comments', error: (error as Error).message },
            { status: 500 }
        );
    }
}