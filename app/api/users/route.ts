import { QuestionsTable, UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
export async function GET() {

	const usersData = await db
		.select({
            username: UsersTable.username,
            avatarUrl: UsersTable.avatarUrl,
            bio: UsersTable.bio,
            questionCount: sql<number>`COALESCE(COUNT(DISTINCT ${QuestionsTable.questionId}), 0)`,
        })
		.from(UsersTable)
		.leftJoin(QuestionsTable, eq(UsersTable.id, QuestionsTable.userId))
		.groupBy(UsersTable.username, UsersTable.avatarUrl, UsersTable.bio)
	return NextResponse.json(usersData);
}