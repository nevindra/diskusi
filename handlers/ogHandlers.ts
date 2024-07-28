export async function getOgImage(question: string): Promise<string> {
    try {
        const response = await fetch(`/api/og?question=${encodeURIComponent(question)}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get OG image: ${response.status} ${response.statusText}. ${errorText}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error getting OG image:', error);
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}