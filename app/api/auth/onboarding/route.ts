import { UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
	const { username, prevUname, photo } = await request.json();
	
	if (!username || !photo) {
		return NextResponse.json(
			{ message: 'Missing required fields' },
			{ status: 400 }
		);
	}

	try {
		const user = await db
			.update(UsersTable)
			.set({
				username,
				avatarUrl: `profile-images/${photo}.png`,
			})
			.where(eq(UsersTable.username, prevUname))
			.returning()
			.execute();

		return NextResponse.json(user[0], { status: 200 });
	} catch (error) {
		console.error('Error updating user:', error);
		return NextResponse.json(
			{ message: 'Error updating user' },
			{ status: 500 }
		);
	}
}
