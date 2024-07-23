import { z } from 'zod';

export const QuestionSchema = z.object({
	questionId: z.string().optional(),
	question: z.string().min(5, 'Question must be at least 5 characters'),
	usernameId: z.string(),
	posterId: z.string().optional(),
});

export type QuestionFormData = z.infer<typeof QuestionSchema>;

export async function postQuestion(
	data: Omit<QuestionFormData, 'question_id'>
): Promise<void> {
	try {
		const response = await fetch(
			'/api/questions',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		);

		// Check if the response status is not 2xx
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to post question');
		}
		return await response.json(); // Assuming the response contains data
	} catch (error) {
		throw error instanceof Error ? error : new Error('An unknown error occurred');
	}
}

export async function getQuestions(username: string) {
	try {
		const response = await fetch(
			`/api/users/${username}/questions`
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to fetch questions');
		}
		return await response.json();
	} catch (error) {
		throw error instanceof Error ? error : new Error('An unknown error occurred');
	}
}