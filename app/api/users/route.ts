import { UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const username = url.searchParams.get('username'); // Accessing the userId from query parameters

	if (!username) {
		return NextResponse.json(
			{ message: 'Username is required' },
			{ status: 400 }
		);
	}

	try {
		const user = await db
			.select()
			.from(UsersTable)
			.where(eq(UsersTable.username, username))
			.limit(1);
		
		if (user.length === 0) {
			return NextResponse.json(
				{ message: 'User not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(user[0]);
	} catch (error) {
		console.error('Error fetching user:', error);
		return NextResponse.json(
			{ message: 'Error fetching user' },
			{ status: 500 }
		);
	}
}