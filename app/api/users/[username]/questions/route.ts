import {
  CommentsTable,
  LikesTable,
  QuestionsTable,
  UsersTable,
} from "@/database/dbSchema";
import { db } from "@/database/initDB";
import { desc, eq, sql } from 'drizzle-orm';
import { alias } from "drizzle-orm/pg-core";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { username: string } },
) {
  const username = params.username;

  if (!username) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const PosterUsers = alias(UsersTable, "poster_users");

    const questions = await db
    .select({
      questionId: QuestionsTable.questionId,
      posterId: QuestionsTable.posterId,
      posterUsername: PosterUsers.username,
      content: QuestionsTable.content,
      createdAt: QuestionsTable.createdAt,
      avatarUrl: PosterUsers.avatarUrl,
      isAnon: QuestionsTable.isAnon,
      likeCount: sql<number>`COALESCE(COUNT(DISTINCT ${LikesTable.userId}), 0)`,
      commentCount: sql<number>`COALESCE(COUNT(DISTINCT ${CommentsTable.commentId}), 0)`,
      likedUserIds: sql<string[]>`ARRAY_REMOVE(ARRAY_AGG(DISTINCT ${LikesTable.userId}), NULL)`,
    })
    .from(QuestionsTable)
    .innerJoin(UsersTable, eq(QuestionsTable.userId, UsersTable.id))
    .leftJoin(PosterUsers, eq(QuestionsTable.posterId, PosterUsers.id))
    .leftJoin(LikesTable, eq(QuestionsTable.questionId, LikesTable.questionId))
    .leftJoin(CommentsTable, eq(QuestionsTable.questionId, CommentsTable.questionId))
    .where(eq(UsersTable.username, username))
    .groupBy(
      QuestionsTable.questionId,
      QuestionsTable.posterId,
      QuestionsTable.content,
      QuestionsTable.createdAt,
      PosterUsers.avatarUrl,
      PosterUsers.username
    )
    .orderBy(desc(QuestionsTable.createdAt));

  return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { message: "Error fetching questions" },
      { status: 500 },
    );
  }
}