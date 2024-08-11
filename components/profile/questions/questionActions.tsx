import { useLikeMutation } from '@/hooks/useLike';
import type { UserType } from '@/types/userType';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Chats, Share, ThumbsUp } from '@phosphor-icons/react/dist/ssr';
export const QuestionActions = ({
	questionId,
	isLiked,
	user,
	onCommentToggle,
	onShare,
	isCommentsShown,
	currentUsername,
}: {
	questionId: string;
	isLiked: boolean;
	user: UserType | null | undefined;
	onCommentToggle: () => void;
	onShare: () => void;
	isCommentsShown: boolean;
	currentUsername: string;
}) => {
	const { handleLike, isLoggedIn } = useLikeMutation(
		user,
		questionId,
		isLiked,
		currentUsername
	);

	return (
		<div className="flex items-center justify-around w-full">
			{isLoggedIn ? (
				<Button
					size="sm"
					variant="light"
					onClick={handleLike}
					startContent={isLiked ? <ThumbsUp weight="fill" /> : <ThumbsUp />}
					color={isLiked ? 'primary' : 'default'}
					className="text-xs sm:text-sm"
				>
					{isLiked ? 'Unlike' : 'Like'}
				</Button>
			) : (
				<Popover>
					<PopoverTrigger>
						<Button
							size="sm"
							variant="light"
							startContent={<ThumbsUp />}
							className="text-xs sm:text-sm"
						>
							Like
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div className="px-1 py-2">
							<div className="text-xs">Login Required</div>
							<div className="text-xs">
								Please <span className='text-primary font-semibold'>log in</span> to like this question.
							</div>
						</div>
					</PopoverContent>
				</Popover>
			)}
			<Button
				size="sm"
				variant="light"
				startContent={isCommentsShown ? <Chats className='text-primary' weight="fill" /> : <Chats className='text-default-500' />}
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
