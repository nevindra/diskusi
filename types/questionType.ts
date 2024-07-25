export type QuestionType = {
    questionId: string;
    content: string;
    createdAt: string;
    userId: string;
    posterId: string;
    username: string;
    likeCount: number;
    commentCount: number;
}
export type QuestionWithPosterUsernameType = {
	commentId: string;
	questionId: string;
	userId: string;
	posterId: string;
	posterUsername: string;
	content: string;
	createdAt: string;
	likeCount: number;
	commentCount: number;
	isLiked: boolean;
};
