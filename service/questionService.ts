import { z } from "zod";
export const QuestionSchema = z.object({
	questionId: z.string().optional(),
	question: z.string().min(2, "Question must be at least 4 characters"),
	usernameId: z.string(),
	posterId: z.string().optional(),
});

export type QuestionFormData = z.infer<typeof QuestionSchema>;

export async function postQuestion(data: Omit<QuestionFormData, 'questionId'>): Promise<void> {
	console.log('Sending data to server:', data);
	const response = await fetch("/api/questions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message);
	}

	return response.json();
}

export async function getQuestions(username: string) {
	const response = await fetch(`/api/questions/?username=${username}`);
	console.log('RESPONSE:', response);
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message);
	}

	return response.json();
}