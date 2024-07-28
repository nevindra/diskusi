export type QuestionsType = {
	// commentId: string;
	questionId: string;
	posterId: string | null;
	posterUsername: string;
	content: string;
	createdAt: string;
	likeCount: number;
	commentCount: number;
	isLiked: boolean;
	likedUserIds: string[];
};
