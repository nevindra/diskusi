import {
	CommentsTable,
	LikesTable,
	QuestionsTable,
	UsersTable,
} from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	const username = params.slug;

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
				likeCount: sql<number>`CAST(COUNT(DISTINCT ${LikesTable.questionId}) AS INTEGER)`,
				commentCount: sql<number>`CAST(COUNT(DISTINCT ${CommentsTable.commentId}) AS INTEGER)`,
			})
			.from(QuestionsTable)
			.innerJoin(UsersTable, eq(QuestionsTable.userId, UsersTable.id))
			.leftJoin(
				LikesTable,
				eq(QuestionsTable.questionId, LikesTable.questionId)
			)
			.leftJoin(
				CommentsTable,
				eq(QuestionsTable.questionId, CommentsTable.questionId)
			)
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
