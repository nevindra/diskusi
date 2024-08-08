'use client';

import { CommentSection } from '@/components/profile/commentSection';
import { QuestionActions } from '@/components/profile/questions/questionActions';
import { QuestionHeader } from '@/components/profile/questions/questionHeader';
import { ShareModal } from '@/components/profile/questions/questionShare';
import { QuestionStats } from '@/components/profile/questions/questionStats';
import { SkeltonProfile } from '@/components/profile/skeleton';
import { UserProfileBox } from '@/components/profile/userProfile';
import { useQuestionData } from '@/hooks/useQuestions';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import Link from 'next/link';
import { useState } from 'react';

export default function QuestionPage({
	params,
}: {
	params: { questionId: string; slug: string };
}) {
	const { user, isLoading, question, error, refetchQuestion } = useQuestionData(
		params.questionId
	);
	
	const [showComments, setShowComments] = useState(false);
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	if (isLoading) return <SkeltonProfile />;
	if (error) return <div>Error: {(error as Error).message}</div>;
	if (!question) return <div>Question not found</div>;

	return (
		<div className="flex flex-col items-center justify-center md:m-8 lg:m-10">
			{/* Main Card */}
			<div className="w-full xl:w-[70%] px-3 lg:px-0">
				<UserProfileBox username={params.slug} />
			</div>
			<div className="w-full xl:w-[70%] px-3 lg:px-0 flex justify-start">
				<button
					className="text-primary text-left text-sm lg:text-base font-thin my-3 px-4 py-2 rounded-lg"
					type="button"
				>
					<Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/id/${params.slug}`}>
						Back
					</Link>
				</button>
			</div>
			{/* Question List Box */}
			<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1">
				<Card key={question.questionId} className="p-2 sm:p-4">
					{/* Question Header is for the user avatar and post metadata */}
					<QuestionHeader
						posterId={question.posterId || ''}
						posterUsername={question.posterUsername}
						createdAt={question.createdAt}
						questionId={question.questionId}
						avatarUrl={question.avatarUrl}
						user={user}
						username={params.slug}
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
							isLiked={question.isLiked ? question.isLiked : false}
							user={user}
							onCommentToggle={() => setShowComments(!showComments)}
							onShare={() => setIsShareModalOpen(true)}
							refetchQuestion={refetchQuestion}
							isCommentsShown={true}
						/>

						<CommentSection
							questionId={question.questionId}
							user={user}
							refetchQuestion={refetchQuestion}
						/>
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
