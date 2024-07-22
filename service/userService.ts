export async function getUserByUsername({ username }: { username: string }) {
    const response = await fetch(`/api/users?username=${encodeURIComponent(username)}`, {
        // Add this line
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return response.json();
}