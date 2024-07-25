import { z } from "zod";

export const LikeSchema = z.object({
    likeId: z.string().optional(),
    userId: z.string(),
    questionId: z.string(),
});

export type LikeFormData = z.infer<typeof LikeSchema>;

export async function postLike (
    data: Pick<LikeFormData, 'userId' | 'questionId'>
): Promise<LikeFormData> {
    try {
        const response = await fetch(
            '/api/likes',
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
            throw new Error(errorData.message || 'Failed to post like');
        }
        return await response.json(); // Assuming the response contains data
    } catch (error) {
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}

export async function getLikes(userId: string): Promise<LikeFormData[]> {
    try {
        const response = await fetch(`/api/likes?userId=${userId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to get likes');
        }
        return await response.json();
    } catch (error) {
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}

export async function deleteLike(questionId: string, userId: string): Promise<LikeFormData> {
    try {
        const response = await fetch(
            `/api/likes?questionId=${questionId}&userId=${userId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Check if the response status is not 2xx
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete like');
        }
        return await response.json(); // Assuming the response contains data
    } catch (error) {
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}