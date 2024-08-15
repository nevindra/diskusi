import { supabase_client } from '@/database/client';
import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export async function login(data: LoginFormData): Promise<void> {
	const { data: _authData, error } =
		await supabase_client.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

	if (error) {
		throw new Error(error.message);
	}
}

export async function loginWithGoogle(): Promise<void> {
	await supabase_client.auth.signInWithOAuth({
		provider: 'google', // use the provider you configured in your Supabase project
		options: {
			redirectTo: 'http://localhost:3000/auth/callback'
		},
	});
}
