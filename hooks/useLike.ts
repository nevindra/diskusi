import { deleteLike, postLike } from '@/handlers/likeHandlers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLike() {
	const queryClient = useQueryClient();

	const likeMutation = useMutation({
		mutationFn: ({
			userId,
			questionId,
			isLiked,
		}: { userId: string; questionId: string; isLiked: boolean }) =>
			isLiked
				? deleteLike(userId,questionId)
				: postLike({ userId, questionId }),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['questions'] });
			queryClient.invalidateQueries({ queryKey: ['likes', variables.userId] });
		},
		onError: (error) => {
			console.error('Error liking/unliking:', error);
		},
	});

	const handleLike = (userId: string, questionId: string, isLiked: boolean) => {
		if (!userId) {
			console.log('User must be logged in to like/unlike a post');
			return;
		}

		likeMutation.mutate({ userId, questionId, isLiked });
	};

	return {
		handleLike,
		isLoading: likeMutation.isPending,
		error: likeMutation.error,
	};
}
