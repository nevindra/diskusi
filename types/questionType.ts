export type QuestionsType = {
	// commentId: string;
	questionId: string;
	posterId: string | null;
	posterUsername: string;
	content: string;
	createdAt: string;
	likeCount: number;
	commentCount: number;
	imageUrls: string[] | null;
	isLiked: boolean;
	isAnon: boolean | null;
	likedUserIds: string[];
	avatarUrl: string | null;
};
