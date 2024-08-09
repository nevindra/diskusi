import { z } from 'zod';

export const SignupSchema = z.object({
	username: z
		.string()
		.min(4, 'Username must be at least 4 characters')
		.refine(
			(val) => !/(anjing|kontol|memek|asu|jancok)/i.test(val),
			'Username contains inappropriate words'
		),
	email: z
		.string()
		.email('Invalid email address')
		.refine(
			(val) => !/(anjing|kontol|memek|asu|jancok)/i.test(val),
			'Username contains inappropriate words'
		),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	terms: z
		.boolean()
		.refine((val) => val === true, 'You must agree to the terms'),
});

export type SignupFormData = z.infer<typeof SignupSchema>;

export async function signUp(data: SignupFormData): Promise<void> {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message);
	}

	return response.json();
}
