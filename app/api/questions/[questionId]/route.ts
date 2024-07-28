import {
    CommentsTable,
    LikesTable,
    QuestionsTable,
    UsersTable,
} from '@/database/dbSchema';
import { db } from '@/database/initDB';
import type { QuestionsType } from '@/types/questionType';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// GET API to fetch a question by its ID
// The Url is /api/questions/[questionId]
export async function GET(
	request: Request,
	{ params }: { params: { questionId: string } }
) {
	const questionId = params.questionId;

	if (!questionId) {
		return NextResponse.json(
			{ message: 'Question ID is required' },
			{ status: 400 }
		);
	}
	try {
		const questionResult = await db
			.select({
				questionId: QuestionsTable.questionId,
				content: QuestionsTable.content,
				createdAt: QuestionsTable.createdAt,
				posterId: QuestionsTable.posterId,
				posterUsername: UsersTable.username,
				likeCount: sql<number>`COALESCE((
                        SELECT COUNT(*)
                        FROM ${LikesTable}
                        WHERE ${LikesTable.questionId} = ${questionId}
                    ), 0)`,
				commentCount: sql<number>`COALESCE((
                        SELECT COUNT(*)
                        FROM ${CommentsTable}
                        WHERE ${CommentsTable.questionId} = ${questionId}
                    ), 0)`,
				likedUserIds: sql<string[]>`ARRAY(
                        SELECT ${LikesTable.userId}
                        FROM ${LikesTable}
                        WHERE ${LikesTable.questionId} = ${questionId}
                    )`,
			})
			.from(QuestionsTable)
			.innerJoin(UsersTable, eq(QuestionsTable.userId, UsersTable.id))
			.where(eq(QuestionsTable.questionId, questionId))
			.limit(1);

		if (questionResult.length === 0) {
			return NextResponse.json(
				{ message: 'Question not found' },
				{ status: 404 }
			);
		}

		const question: QuestionsType = {
			...questionResult[0],
			createdAt: questionResult[0].createdAt ? questionResult[0].createdAt.toISOString() : '',
			isLiked: false, // You'll need to implement this based on the current user
		};

        console.log ('the return is', question)
		return NextResponse.json(question);
	} catch (error) {
		console.error('Error fetching question:', error);
		return NextResponse.json(
			{ message: 'Error fetching question' },
			{ status: 500 }
		);
	}
}