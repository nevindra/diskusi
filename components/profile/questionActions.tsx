import { deleteLike, postLike } from '@/handlers/likeHandlers';
import type { UserType } from '@/types/userType';
import { Button } from '@nextui-org/button';
import { Chats, Share, ThumbsUp } from '@phosphor-icons/react/dist/ssr';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const QuestionActions = ({
	questionId,
	isLiked,
	user,
	onCommentToggle,
	onShare,
	refetchQuestion,
}: {
	questionId: string;
	isLiked: boolean;
	user: UserType | null;
	onCommentToggle: () => void;
	onShare: () => void;
	refetchQuestion: () => void;
}) => {
	const queryClient = useQueryClient();

	const likeMutation = useMutation({
		mutationFn: ({ userId, questionId, isLiked }: { userId: string; questionId: string; isLiked: boolean }) =>
			isLiked
				? deleteLike(questionId, userId)
				: postLike({ userId, questionId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['questions'] });
			queryClient.invalidateQueries({ queryKey: ['likes', user?.id] });
			refetchQuestion();
		},
		onError: (error) => {
			console.error('Error liking/unliking:', error);
		},
	});

	const handleLike = () => {
		if (!user?.id) {
			console.log('User must be logged in to like/unlike a post');
			return;
		}

		likeMutation.mutate({
			userId: user.id,
			questionId: questionId,
			isLiked: isLiked,
		});
	};

	return (
		<div className="flex items-center justify-around w-full">
			<Button
				size="sm"
				variant="light"
				onClick={handleLike}
				startContent={isLiked ? <ThumbsUp weight="fill" /> : <ThumbsUp />}
				color={isLiked ? 'secondary' : 'default'}
				className="text-xs sm:text-sm"
			>
				{isLiked ? 'Unlike' : 'Like'}
			</Button>
			<Button
				size="sm"
				variant="light"
				startContent={<Chats />}
				onClick={onCommentToggle}
				className="text-xs sm:text-sm"
			>
				Comment
			</Button>
			<Button
				size="sm"
				variant="light"
				startContent={<Share />}
				onClick={onShare}
				className="text-xs sm:text-sm"
			>
				Share
			</Button>
		</div>
	);
};
