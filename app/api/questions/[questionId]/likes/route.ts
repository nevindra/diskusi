import { LikesTable } from "@/database/dbSchema";
import { db } from "@/database/initDB";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
export async function GET(
  request: Request,
  { params }: { params: { questionId: string } },
) {
  const questionId = params.questionId;

  if (!questionId) {
    return NextResponse.json(
      { message: "Question ID is required" },
      { status: 400 },
    );
  }

  try {
    const likes = await db
      .select()
      .from(LikesTable)
      .where(eq(LikesTable.questionId, questionId))
      .orderBy(LikesTable.createdAt);

    if (likes.length === 0) {
      return NextResponse.json({ message: "No likes found" }, { status: 404 });
    }

    return NextResponse.json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json(
      { message: "Error fetching likes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { questionId, userId } = await request.json();

  if (!questionId || !userId) {
    return NextResponse.json(
      { message: "Question ID is required" },
      { status: 400 },
    );
  }
  const nanoid = customAlphabet(
    "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    10,
  );
  const likeId = nanoid();
  try {
    const newLike = await db
      .insert(LikesTable)
      .values({
        likeId: likeId,
        questionId: questionId,
        userId: userId,
      })
      .returning();

    if (!newLike || newLike.length === 0) {
      return NextResponse.json(
        { message: "Failed to insert like" },
        { status: 500 },
      );
    }
    // Return the created like
    return NextResponse.json(newLike, { status: 201 });
  } catch (error) {
    console.error("Error inserting like:", error);
    return NextResponse.json(
      { message: "Error inserting like" },
      { status: 500 },
    );
  }
}
