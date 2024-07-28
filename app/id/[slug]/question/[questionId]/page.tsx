'use client';

import { CommentSection } from '@/components/profile/commentSection';
import { QuestionHeader } from '@/components/profile/questionHeader';
import { QuestionActions } from '@/components/profile/questionLike';
import { ShareModal } from '@/components/profile/questionShare';
import { QuestionStats } from '@/components/profile/questionStats';
import { UserProfileBox } from '@/components/profile/userProfile';
import { useQuestionData } from '@/hooks/useQuestions';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { useState } from 'react';

export default function QuestionPage({
	params,
}: {
	params: { questionId: string; slug: string };
}) {
	const { user, isLoading, question, error, refetchQuestion } =
		useQuestionData(params.questionId);
	const [showComments, setShowComments] = useState(false);
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {(error as Error).message}</div>;
	if (!question) return <div>Question not found</div>;

	return (
		<div className="flex flex-col items-center justify-center md:m-8 lg:m-10">
			{/* Main Card */}
			<div className="w-full xl:w-[70%] px-3 lg:px-0">
				<UserProfileBox username={params.slug} />
			</div>
			<h1 className="text-primary items-start text-left text-xl font-semibold mb-3">
				Detail Pertanyaan
			</h1>
			{/* Question List Box */}
			<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1">
				<Card key={question.questionId} className="p-2 sm:p-4">
					{/* Question Header is for the user avatar and post metadata */}
					<QuestionHeader
						posterId={question.posterId || ''}
						posterUsername={question.posterUsername}
						createdAt={question.createdAt}
					/>
					<CardBody className="py-1 sm:py-2">
						<p className="text-sm sm:text-base line-clamp-3">
							{question.content}
						</p>
					</CardBody>
					<CardFooter className="flex flex-col items-start pt-1 sm:pt-2">
						{/* Question Stats is for the likes and comments */}
						<QuestionStats
							likeCount={question.likeCount}
							commentCount={question.commentCount}
							questionId={question.questionId}
							username={question.posterUsername}
						/>
						<Divider className="my-1 sm:my-2" />
						{/* Question Actions is for the like, comment, and share buttons. In this file, Like is handled. */}
						<QuestionActions
							questionId={question.questionId}
							isLiked={question.isLiked? question.isLiked : false}
							user={user}
							onCommentToggle={() => setShowComments(!showComments)}
							onShare={() => setIsShareModalOpen(true)}
							refetchQuestion={refetchQuestion}
						/>
						{showComments && (
							<CommentSection
								questionId={question.questionId}
								user={user}
								refetchQuestion={refetchQuestion}
							/>
						)}
					</CardFooter>
					{/* Share Modal is for the share button */}
					<ShareModal
						isOpen={isShareModalOpen}
						onClose={() => setIsShareModalOpen(false)}
						questionId={question.questionId}
						questionContent={question.content}
						username={question.posterUsername}
					/>
				</Card>
			</div>
		</div>
	);
}