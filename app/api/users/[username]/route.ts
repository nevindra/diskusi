import { UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { createClient } from '@/database/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { username: string } }
) {
	const username = params.username;
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
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
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

export async function PATCH(
	request: Request,
	{ params }: { params: { username: string } }
) {
	const username = params.username;
	if (!username) {
		return NextResponse.json(
			{ message: 'Username is required' },
			{ status: 400 }
		);
	}

	try {
		const formData = await request.formData();
		const user = await db
			.select()
			.from(UsersTable)
			.where(eq(UsersTable.username, username))
			.limit(1)
			.execute();

		if (user.length === 0) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		}

		const updateData: Partial<typeof UsersTable.$inferInsert> = {};

		// Handle text fields
		for (const [key, value] of formData.entries()) {
			if (key !== 'avatar' && typeof value === 'string') {
				updateData[key as keyof typeof updateData] = value;
			}
		}

		// Handle file upload
		const avatarFile = formData.get('avatar') as File | null;
		if (avatarFile) {
			const fileExt = avatarFile.name.split('.').pop();
			const fileName = `${username}-${Date.now()}.${fileExt}`;
			const supabase_server = createClient()
			const { data, error } = await supabase_server.storage
				.from('profile-images')
				.upload(fileName, avatarFile);

			if (error) {
				throw new Error('Failed to upload image');
			}

			updateData.avatarUrl = `profile-images/${fileName}`;
			// Delete previous avatar if exists
			if (user[0].avatarUrl) {
				const oldFileName = user[0].avatarUrl.split('/').pop();
				if (oldFileName) {
					await supabase_server.storage
						.from('profile-images')
						.remove([oldFileName]);
				}
			}
		}

		const updatedUser = await db
			.update(UsersTable)
			.set(updateData)
			.where(eq(UsersTable.username, username))
			.returning()
			.execute();

		return NextResponse.json(updatedUser[0]);
	} catch (error) {
		console.error('Error updating user:', error);
		return NextResponse.json(
			{ message: 'Error updating user' },
			{ status: 500 }
		);
	}
}