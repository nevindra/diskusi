export type CommentType = {
	commentId: string;
	questionId: string | null;
	userId: string | null;
	posterId: string | null;
	createdAt: Date | null;
	posterUsername: string | null;
	content: string | null;
};

