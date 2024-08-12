import { deleteLike, postLike } from '@/handlers/likeHandlers';
import type { UserType } from '@/types/userType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLikeMutation = (
	user: UserType | null | undefined,
	questionId: string,
	isLiked: boolean,
	username: string
) => {
	const queryClient = useQueryClient();
	
	const likeMutation = useMutation({
		mutationFn: () =>
			isLiked
				? deleteLike(questionId, user?.id ?? '')
				: postLike({ userId: user?.id ?? '', questionId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['questions', username] });
			queryClient.invalidateQueries({ queryKey: ['question', questionId] });
		},
		onError: (error) => {
			console.error('Error liking/unliking:', error);
		},
	});

	const handleLike = () => {
		if (!user?.id) {
			return false;
		}
		likeMutation.mutate();
		return true;
	};

	return { handleLike, isLoggedIn: !!user?.id };
};
