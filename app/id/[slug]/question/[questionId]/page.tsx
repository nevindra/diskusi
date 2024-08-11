'use client';

import { CommentSection } from '@/components/profile/commentSection';
import { QuestionActions } from '@/components/profile/questions/questionActions';
import { QuestionHeader } from '@/components/profile/questions/questionHeader';
import { ShareModal } from '@/components/profile/questions/questionShare';
import { QuestionStats } from '@/components/profile/questions/questionStats';
import { SkeltonProfile } from '@/components/profile/skeleton';
import { UserProfileBox } from '@/components/profile/userProfile';
import { useQuestionData } from '@/hooks/useQuestions';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Rewind } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';

export default function QuestionPage({
	params,
}: {
	params: { questionId: string; slug: string };
}) {
	const { user, isLoading, question, error } = useQuestionData(
		params.questionId
	);
	const [showComments, setShowComments] = useState(false);
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);

	const toggleQuestionBox = () => {}

	if (isLoading) return <SkeltonProfile />;
	
	return (
		<div className="flex flex-col items-center justify-center md:m-8 lg:m-10">
			{/* Main Card */}
			<div className="w-full xl:w-[70%] px-3 lg:px-0">
				<UserProfileBox username={params.slug} onToggleQuestionBox={toggleQuestionBox} isSingleQuestion={true} />
			</div>
			<div className="w-full xl:w-[70%] px-3 lg:px-0 flex justify-start">
				<button
					className="text-primary text-left text-sm lg:text-base font-thin my-3 px-4 py-2 rounded-lg"
					type="button"
				>
					<Button
						variant="bordered"
						color="primary"
						as={Link}
						href={`/id/${params.slug}`}
						className='border-1'
						startContent={<Rewind size={15} />}
					>
						Back
					</Button>
				</button>
			</div>
			{/* Question List Box */}
			<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1">
				{error ? (
					<Card className="flex flex-col items-center justify-center py-4 px-4">
						<p className='text-danger text-center text-lg font-semibold mb-2'>Error loading question</p>
						<p className='text-sm'>Please try again later or contact the administrator (X - @nezhifi).</p>
					</Card>
				) : !question ? (
					<Card className="flex flex-col items-center justify-center py-4 px-4">
						<p className='text-primary text-center text-lg font-semibold mb-2'>Question not found</p>
						<p className='text-sm'>This question may have been deleted or does not exist.</p>
					</Card>
				) : (
					<Card key={question.questionId} className="p-2 sm:p-4">
						{/* Question Header is for the user avatar and post metadata */}
						<QuestionHeader
							posterId={question.posterId}
							posterUsername={question.posterUsername}
							createdAt={question.createdAt}
							questionId={question.questionId}
							avatarUrl={question.avatarUrl}
							user={user}
							username={params.slug}
						/>
						<CardBody className="py-1 sm:py-2">
							<p className="text-sm sm:text-base">
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
								isSingleQuestion={true}
							/>
							<Divider className="my-1 sm:my-2" />
							{/* Question Actions is for the like, comment, and share buttons. In this file, Like is handled. */}
							<QuestionActions
								questionId={question.questionId}
								isLiked={question.isLiked ? question.isLiked : false}
								user={user}
								onCommentToggle={() => setShowComments(!showComments)}
								onShare={() => setIsShareModalOpen(true)}
								isCommentsShown={true}
								currentUsername={params.slug}
							/>

							<CommentSection
								questionId={question.questionId}
								user={user}
								isSingleQuestion={true}
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
				)}
			</div>
		</div>
	);
}
