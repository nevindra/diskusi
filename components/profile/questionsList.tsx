'use client';
import type { QuestionWithPosterUsernameType } from '@/types/questionType';
import type { UserType } from '@/types/userType';
import { CommentInput } from './commentInput';
import { CommentBox } from './commentList';

import { deleteLike, postLike } from '@/service/likeService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useState } from 'react';

import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { BiLike, BiRepost, BiSolidLike } from 'react-icons/bi';
import { MdOutlineComment } from 'react-icons/md';

export const QuestionsList = ({
	question: questionData,
	user,
}: {
	question: QuestionWithPosterUsernameType;
	user: UserType | null;
}) => {
	const [showComments, setShowComments] = useState(false);
	const queryClient = useQueryClient();

	const likeMutation = useMutation({
		mutationFn: ({
			userId,
			questionId,
			isLiked,
		}: { userId: string; questionId: string; isLiked: boolean }) =>
			isLiked
				? deleteLike(questionData.questionId, userId)
				: postLike({ userId, questionId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['questions'] });
			queryClient.invalidateQueries({ queryKey: ['likes', user?.id] });
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
			questionId: questionData.questionId,
			isLiked: questionData.isLiked,
		});
	};

	return (
		<Card key={questionData.questionId} className="p-4">
			<CardHeader className="flex items-center space-x-4 pb-2">
				<Avatar
					isBordered
					radius="full"
					size="md"
					src="/user.png"
					className="border-2 border-secondary"
				/>
				<div>
					<p className="font-semibold text-secondary">
						{questionData.posterId === ''
							? 'Anonymous'
							: questionData.posterUsername}
					</p>
					<p className="text-small text-default-500">
						{formatDistanceToNow(parseISO(questionData.createdAt), {
							addSuffix: true,
						})}
					</p>
				</div>
			</CardHeader>
			<CardBody className="py-2">
				<p className="text-base line-clamp-3">{questionData.content}</p>
			</CardBody>
			<CardFooter className="flex flex-col items-start pt-2">
				<div className="flex items-center justify-start w-full mb-2">
					<p className="text-small text-default-500 mr-2">
						{questionData.likeCount} likes
					</p>
					<p className="text-small text-default-500">
						{questionData.commentCount} comments
					</p>
				</div>
				<Divider className="my-2" />
				<div className="flex items-center justify-around w-full">
					<Button
						size="md"
						variant="light"
						onClick={handleLike}
						startContent={questionData.isLiked ? <BiSolidLike /> : <BiLike />}
						color={questionData.isLiked ? 'secondary' : 'default'}
						isLoading={likeMutation.isPending}
					>
						{questionData.isLiked ? 'Unlike' : 'Like'}
					</Button>
					<Button
						size="md"
						variant="light"
						startContent={<MdOutlineComment />}
						onClick={() => setShowComments(!showComments)}
					>
						Comment
					</Button>
					<Button size="md" variant="light" startContent={<BiRepost />}>
						Share
					</Button>
				</div>
				{showComments && (
					<>
						<Divider className="my-2" />
						<div className="w-full space-y-2">
							{/* Existing comments would go here */}
							<CommentBox id={questionData.questionId} />
							{/* Add comment input */}
							<CommentInput question_id={questionData.questionId} user={user} />
						</div>
					</>
				)}
			</CardFooter>
		</Card>
	);
};
