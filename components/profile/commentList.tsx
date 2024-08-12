import { getComments } from '@/handlers/commentHandlers';
import type { CommentType } from '@/types/commentType';
import { Card } from '@nextui-org/card';
import { Spinner } from '@nextui-org/spinner';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

const formatCommentContent = (content: string | null) => {
	return (content || '').split('\n').map((line, index) => (
		<React.Fragment key={index}>
			{line}
			{index < (content || '').split('\n').length - 1 && <br />}
		</React.Fragment>
	));
};

export const CommentBox = ({
	id,
	isSingleQuestion,
}: { id: string; isSingleQuestion: boolean }) => {
	// Query the comment data from the backend
	const {
		data: comments = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['comments', id],
		queryFn: () => getComments(id),
		staleTime: 60000, // Data will be considered fresh for 1 minute
		refetchOnWindowFocus: false, // Disable refetch on window focus
	});
	return (
		<>
			{isLoading ? (
				<div className="flex items-center justify-center">
					<Spinner size="sm" />
				</div>
			) : isError ? (
				<div className="flex items-center justify-center">
					<p>Error loading comments</p>
				</div>
			) : comments.length > 0 ? (
				comments.map((comment: CommentType) => (
					<div
						key={comment.commentId}
						className="flex items-start space-x-2 shadow-none"
					>
						{/* <Avatar
							size="sm"
							src={avatar || '/user.png'}
							radius="full"
							isBordered
							className="border-2 border-primary"
						/> */}
						<Card className="flex flex-col items-start space-y-1 w-full h-full p-2 pb-2">
							<p className="text-small font-semibold text-primary mx-2">
								{comment.posterUsername ? comment.posterUsername : 'Anonymous'}{' '}
								-{' '}
								<span className="text-xs text-default-400">
									{comment.createdAt
										? formatDistanceToNow(new Date(comment.createdAt), {
												addSuffix: true,
											})
										: 'Unknown'}
								</span>
							</p>
							<div
								className={`w-full overflow-y-scroll ${isSingleQuestion ? 'max-h-40' : 'max-h-20'}`}
							>
								<p className="text-small font-normal text-secondary mx-2">
									{formatCommentContent(comment.content)}
								</p>
							</div>
						</Card>
					</div>
				))
			) : (
				<div className="flex items-center justify-center my-3">
					<p className="text-secondary/70">No comments yet</p>
				</div>
			)}
		</>
	);
};
