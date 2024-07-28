import {
	QuestionsTable,
	UsersTable
} from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';
import { NextResponse } from 'next/server';

// POST API to create a new question
// The Url is /api/questions
export async function POST(request: Request) {
	const { question, usernameId, posterId } = await request.json();

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