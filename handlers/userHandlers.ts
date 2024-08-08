import type { UserType } from '@/types/userType';
import { z } from 'zod';

export const UserSchema = z.object({
	id: z.string().optional(),
	username: z
		.string()
		.min(5, 'Username must be at least 5 characters')
		.max(20, 'Username must be at most 20 characters')
		.optional(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.optional(),
	email: z.string().email('Invalid email').optional(),
	bio: z.string().optional(),
	avatarUrl: z.string().optional(),
});

export type UserFormData = z.infer<typeof UserSchema>;

export async function getUserByUsername(username: string): Promise<UserType> {
	try {
		const response = await fetch(`/api/users/${username}`);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to fetch user');
		}
		return await response.json();
	} catch (error) {
		throw error instanceof Error
			? error
			: new Error('An unknown error occurred');
	}
}

export async function patchUser({
	username,
	data,
	file,
}: {
	username: string;
	data: FormData;
	file: File | null;
}): Promise<UserType> {
	try {
		if (data === null || data.entries().next().done) {
			throw new Error('No data provided or FormData is empty');
		}
		if (file) {
			data.append('avatar', file);
		}

		const response = await fetch(`/api/users/${username}`, {
			method: 'PATCH',
			body: data,
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to update user');
		}

		return (await response.json()) as UserType;
	} catch (error) {
		throw error instanceof Error
			? error
			: new Error('An unknown error occurred');
	}
}
