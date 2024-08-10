'use client';

import { CommentSection } from '@/components/profile/commentSection';
import { QuestionActions } from '@/components/profile/questions/questionActions';
import { QuestionHeader } from '@/components/profile/questions/questionHeader';
import { QuestionBox } from '@/components/profile/questions/questionInputBox';
import { ShareModal } from '@/components/profile/questions/questionShare';
import { QuestionStats } from '@/components/profile/questions/questionStats';
import { UserProfileBox } from '@/components/profile/userProfile';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';
import { useState } from 'react';

import { SkeltonProfile } from '@/components/profile/skeleton';
import { useProfileData } from '@/hooks/useQuestions';
import type { QuestionsType } from '@/types/questionType';
import { useQueryClient } from '@tanstack/react-query';

export default function ProfilePage({ params }: { params: { slug: string } }) {
	const currentUsername = params.slug;
	const queryClient = useQueryClient();
	const { user, isLoading, questions, refetchQuestions, isError } =
		useProfileData(currentUsername);
	const [showComments, setShowComments] = useState<{ [key: string]: boolean }>(
		{}
	);
	
	const [isShareModalOpen, setIsShareModalOpen] = useState<{
		[key: string]: boolean;
	}>({});

	const toggleComments = (questionId: string) => {
		setShowComments((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
	};

	const toggleShareModal = (questionId: string) => {
		setIsShareModalOpen((prev) => ({
			...prev,
			[questionId]: !prev[questionId],
		}));
	};
	const refetchQuestion = (questionId: string) => {
		queryClient.invalidateQueries({ queryKey: ['questions', questionId] });
		refetchQuestions();
	};
	if (isLoading) {
		<SkeltonProfile />;
	}

	return (
		<div className="flex flex-col items-center justify-center md:m-8 lg:m-10">
			{/* Main Card */}
			<div className="w-full xl:w-[70%] 2xs:mt-1 px-3 lg:px-0">
				<UserProfileBox username={currentUsername} />
			</div>
			<div className="w-full xl:w-[70%] px-3 lg:px-0">
				<QuestionBox
					onQuestionAdded={refetchQuestions}
					username={currentUsername}
					user={user}
				/>
			</div>
			<div className="w-full xl:w-[70%] px-3 lg:px-0 flex justify-center">
				<p className="text-white bg-primary text-left text-sm lg:text-base font-semibold mb-3 px-4 py-2 rounded-lg">
					Questions List
				</p>
			</div>
			{/* Question List Box */}
			<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1">
				{isError ? (
					<Card className="flex flex-col items-center justify-center py-4 px-4">
						<p className="text-secondary text-center text-lg font-semibold mb-2">
							Error loading questions
						</p>
						<p className="text-secondary text-center text-sm">
							Please try again later or contact the administrator.
						</p>
					</Card>
				) : isLoading ? (
					[1, 2, 3].map((i) => <Skeleton key={i} className="w-full h-24" />)
				) : questions.length === 0 ? (
					<Card className="flex flex-col items-center justify-center py-4 px-4">
						<p className="text-secondary text-center text-lg font-semibold mb-2">
							No questions created yet
						</p>
						<p className="text-secondary text-center text-sm">
							You can become the first one to create a question for them.
						</p>
					</Card>
				) : (
					questions.map((question: QuestionsType) => (
						<Card key={question.questionId} className="p-2 sm:p-4">
							<QuestionHeader
								posterId={question.posterId}
								questionId={question.questionId}
								posterUsername={question.posterUsername}
								createdAt={question.createdAt}
								avatarUrl={question.avatarUrl}	
								username={currentUsername}
								user={user}
							/>
							<CardBody className="py-1 sm:py-2">
								<p className="text-sm sm:text-base line-clamp-3">
									{question.content}
								</p>
							</CardBody>
							<CardFooter className="flex flex-col items-start pt-1 sm:pt-2">
								<QuestionStats
									likeCount={question.likeCount}
									commentCount={question.commentCount}
									questionId={question.questionId}
									username={currentUsername}
								/>
								<Divider className="my-1 sm:my-2" />
								<QuestionActions
									questionId={question.questionId}
									isLiked={question.isLiked}
									user={user}
									onCommentToggle={() => toggleComments(question.questionId)}
									onShare={() => toggleShareModal(question.questionId)}
									refetchQuestion={() => refetchQuestion(question.questionId)}
									isCommentsShown={showComments[question.questionId] || false}
								/>
								{showComments[question.questionId] && (
									<CommentSection
										questionId={question.questionId}
										user={user}
										refetchQuestion={() => refetchQuestion(question.questionId)}
									/>
								)}
							</CardFooter>
							<ShareModal
								isOpen={isShareModalOpen[question.questionId] || false}
								onClose={() => toggleShareModal(question.questionId)}
								questionId={question.questionId}
								questionContent={question.content}
								username={currentUsername}
							/>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
