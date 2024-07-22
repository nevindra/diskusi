import { CommentsTable, LikesTable, QuestionsTable, UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq, sql } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const { question, usernameId, posterId } = await request.json();
	console.log('DATA:', question, usernameId, posterId);
	if (!question) {
		return NextResponse.json(
			{ message: 'Missing required fields' },
			{ status: 400 }
		);
	}
	const nanoid = customAlphabet(
		'1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
		10
	);
	const questionId = nanoid();
	console.log('QUESTION ID:', questionId);

	const userId = await db
		.select()
		.from(UsersTable)
		.where(eq(UsersTable.username, usernameId))
		.limit(1);
	try {
		const newQuestion = await db
			.insert(QuestionsTable)
			.values({
				questionId: questionId,
				content: question,
				userId: userId[0].id,
				posterId: posterId,
			})
			.returning();

		if (!newQuestion || newQuestion.length === 0) {
			return NextResponse.json(
				{ message: 'Failed to insert question' },
				{ status: 500 }
			);
		}
		// Return the created question
		return NextResponse.json(newQuestion, { status: 201 });
	} catch (error) {
		console.error('Error inserting question:', error);
		return NextResponse.json(
			{ message: 'Error inserting question' },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	const url = new URL(request.url);
    const username = url.searchParams.get('username'); // Changed from userId to username

	if (!username) {
		return NextResponse.json(
			{ message: 'Missing required fields' },
			{ status: 400 }
		);
	}
	try {
		const questions = await db
			.select({
				questionId: QuestionsTable.questionId,
				content: QuestionsTable.content,
				createdAt: QuestionsTable.createdAt,
				userId: QuestionsTable.userId,
				posterId: QuestionsTable.posterId,
				username: UsersTable.username,
                likeCount: sql<number>`CAST(COUNT(DISTINCT ${LikesTable.userId}) AS INTEGER)`,
                commentCount: sql<number>`CAST(COUNT(DISTINCT ${CommentsTable.userId}) AS INTEGER)`,
			})
			.from(QuestionsTable)
            .innerJoin(UsersTable, eq(QuestionsTable.userId, UsersTable.id))
            .leftJoin(LikesTable, eq(QuestionsTable.questionId, LikesTable.questionId))
            .leftJoin(CommentsTable, eq(QuestionsTable.questionId, CommentsTable.questionId))
            .where(eq(UsersTable.username, username))
            .groupBy(QuestionsTable.questionId, UsersTable.username);

            return NextResponse.json(questions);
	} catch (error) {
		console.error('Error fetching questions:', error);
		return NextResponse.json(
			{ message: 'Error fetching questions' },
			{ status: 500 }
		);
	}
}
