export async function getUserByUsername({ username }: { username: string }) {
    try {
        const response = await fetch(`/api/users/${username}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch user');
        }
        return await response.json();
    } catch (error) {
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}