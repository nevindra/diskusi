import { LikesTable, QuestionsTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Url: /api/likes?username=username&userId=userId
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 },
        );
    }
	
    try {
        const questions = await db
            .select({
                likes: LikesTable.likeId,
                questionId: LikesTable.questionId,
                userId:LikesTable.userId,
            })
            .from(LikesTable)
            .innerJoin(QuestionsTable, eq(LikesTable.questionId, QuestionsTable.questionId))
            .where(eq(LikesTable.userId, userId))
        console.log(questions);
        return NextResponse.json(questions);
    } catch (error) {
        console.error("Error fetching likes:", error);
        return NextResponse.json(
            { message: "Error fetching likes" },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    const {userId, questionId} = await request.json();

    if (!userId || !questionId) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 },
        );
    }
    try {
        const like = await db
            .insert(LikesTable)
            .values({
                userId,
                questionId,
            })
            .execute();

        return NextResponse.json(like, { status: 201 });
    } catch (error) {
        console.error("Error creating like:", error);
        return NextResponse.json(
            { message: "Error creating like" },
            { status: 500 },
        );
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');
    const userId = searchParams.get('userId');

    if ( !questionId) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 },
        );
    }
    try {
        const like = await db
            .delete(LikesTable)
            .where(eq(LikesTable.questionId, questionId) && eq(LikesTable.userId, userId))
            .execute();

        return NextResponse.json(like, { status: 200 });
    } catch (error) {
        console.error("Error deleting like:", error);
        return NextResponse.json(
            { message: "Error deleting like" },
            { status: 500 },
        );
    }
}