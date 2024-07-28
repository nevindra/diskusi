import { z } from 'zod';

export const commentSchema = z.object({
	content: z.string().min(5, 'Comment must be at least 5 characters'),
    poster_id: z.string().optional(),
    question_id: z.string().optional(),
});

export type CommentFormData = z.infer<typeof commentSchema>;

export async function postComment(
	data: CommentFormData,
): Promise<void> {
	try {
		const response = await fetch(
			`/api/comments?question_id=${data.question_id}`,
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

export async function getComments(question_id: string) {
    try {
        const response = await fetch(`/api/comments?question_id=${question_id}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch comments');
        }
        return await response.json();
    } catch (error) {
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}