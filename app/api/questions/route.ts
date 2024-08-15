import {
	CommentsTable,
	LikesTable,
	QuestionsTable
} from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { createClient } from '@/database/server';
import { eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';
import { NextResponse } from 'next/server';

// POST API to create a new question
// The Url is /api/questions
export async function POST(request: Request) {
	const formData = await request.formData();
	const question = formData.get('question') as string;
	const usernameId = formData.get('usernameId') as string;
	const posterId = formData.get('posterId') as string;
	const isAnon = formData.get('isAnon') === 'true';
	
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

	try {
		const imageUrls: string[] = [];
		// Upload images to Supabase storage if present
		for (let i = 0; formData.get(`image${i}`); i++) {
			const base64Image = formData.get(`image${i}`) as string;
			const supabase_server = createClient()
			const { data, error } = await supabase_server.storage
				.from('question-images')
				.upload(
					`${questionId}/${nanoid()}.jpg`,
					Buffer.from(base64Image.split(',')[1], 'base64'),
					{
						contentType: 'image/jpeg',
					}
				);

			if (error) throw error;

			const {
				data: { publicUrl },
			} = supabase_server.storage.from('question-images').getPublicUrl(data.path);

			imageUrls.push(publicUrl);
		}

		const newQuestion = await db
			.insert(QuestionsTable)
			.values({
				questionId: questionId,
				content: question,
				userId: usernameId,
				posterId: posterId ? posterId : null,
				imageUrls: imageUrls.length > 0 ? imageUrls : null,
				isAnon: isAnon,
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

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const questionId = searchParams.get('questionId');

	if (!questionId) {
		return NextResponse.json(
			{ message: 'Missing required fields' },
			{ status: 400 }
		);
	}

	try {
		// Start a transaction
		await db.transaction(async (trx) => {
			// Check if the question exists
			const question = await trx
				.select({
					id: QuestionsTable.questionId,
					imageUrls: QuestionsTable.imageUrls,
				})
				.from(QuestionsTable)
				.where(eq(QuestionsTable.questionId, questionId))
				.limit(1);

			if (question.length === 0) {
				throw new Error('Question not found');
			}

			// Delete images from Supabase storage
			if (question[0].imageUrls) {
				const imagePaths = question[0].imageUrls.map((url) => {
					const parts = url.split('/');
					return `${questionId}/${parts[parts.length - 1]}`;
				});
				const supabase_server = createClient()
				const { data, error } = await supabase_server.storage
					.from('question-images')
					.remove(imagePaths);

				if (error) {
					console.error('Error deleting images from storage:', error);
				}
			}

			// Delete related comments and likes
			await trx
				.delete(CommentsTable)
				.where(eq(CommentsTable.questionId, questionId))
				.execute();

			await trx
				.delete(LikesTable)
				.where(eq(LikesTable.questionId, questionId))
				.execute();

			// Delete the question
			await trx
				.delete(QuestionsTable)
				.where(eq(QuestionsTable.questionId, questionId))
				.execute();
		});

		return NextResponse.json(
			{ message: 'Question and related data deleted successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error deleting question:', error);
		if (error instanceof Error && error.message === 'Question not found') {
			return NextResponse.json(
				{ message: 'Question not found' },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: 'Error deleting question and related data' },
			{ status: 500 }
		);
	}
}
