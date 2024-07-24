import { getComments } from '@/service/commentService';
import type { CommentType } from '@/types/commentType';
import { Avatar } from '@nextui-org/avatar';
import { Card } from '@nextui-org/card';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const CommentBox = ({ id }: { id: string }) => {
	// Query the comment data from the backend
	const _queryClient = useQueryClient();
	const { data: comments = [] } = useQuery({
		queryKey: ['comments', id],
		queryFn: () => getComments(id),
		staleTime: 60000, // Data will be considered fresh for 1 minute
		refetchOnWindowFocus: false, // Disable refetch on window focus
	});

	return (
		<>
			{comments.map((comment: CommentType) => (
				<div key={comment.commentId} className="flex items-start space-x-2 shadow-none">
					<Avatar
						size="sm"
						src="/user.png"
						radius="full"
						isBordered
						className="border-2 border-primary"
					/>
					<Card className="flex flex-col items-start space-y-1 w-full h-full p-2 pb-2">
						<p className="text-small text-secondary">
							{comment.username} -{' '}
							<span className="text-small text-default-400">
								{formatDistanceToNow(parseISO(comment.createdAt), {
									addSuffix: true,
								})}
							</span>
						</p>
						<p className="text-small text-primary line-clamp-3">
							{comment.content}
						</p>
					</Card>
				</div>
			))}
		</>
	);
};
