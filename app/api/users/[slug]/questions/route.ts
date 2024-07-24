import {
	CommentsTable,
	LikesTable,
	QuestionsTable,
	UsersTable,
} from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq, inArray, sql } from 'drizzle-orm';
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
		// First query: Get questions
        const questions = await db
            .select({
                questionId: QuestionsTable.questionId,
                content: QuestionsTable.content,
                createdAt: QuestionsTable.createdAt,
                userId: QuestionsTable.userId,
                posterId: QuestionsTable.posterId,
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

        // Extract unique posterIds
        const posterIds = [...new Set(questions.map(q => q.posterId).filter(Boolean))];

        // Second query: Get usernames for posterIds
		const posters = posterIds.length > 0 ? await db
		.select({
			id: UsersTable.id,
			username: UsersTable.username,
		})
		.from(UsersTable)
		.where(inArray(UsersTable.id, posterIds as string[])) : [];

        // Create a map of posterId to username
        const posterUsernameMap = new Map(posters.map(p => [p.id, p.username]));

        // Combine the results
        const questionsWithPosterUsernames = questions.map(q => ({
            ...q,
            posterUsername: q.posterId ? posterUsernameMap.get(q.posterId) || null : null,
        }));

        return NextResponse.json(questionsWithPosterUsernames);

	} catch (error) {
		console.error('Error fetching questions:', error);
		return NextResponse.json(
			{ message: 'Error fetching questions' },
			{ status: 500 }
		);
	}
}
