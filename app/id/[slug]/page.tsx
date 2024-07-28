'use client';

import { CommentSection } from '@/components/profile/commentSection';
import { QuestionHeader } from '@/components/profile/questionHeader';
import { QuestionBox } from '@/components/profile/questionInputBox';
import { QuestionActions } from '@/components/profile/questionLike';
import { ShareModal } from '@/components/profile/questionShare';
import { QuestionStats } from '@/components/profile/questionStats';
import { UserProfileBox } from '@/components/profile/userProfile';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';
import { useState } from 'react';

import { SkeltonProfile } from '@/components/profile/skeleton';
import { useProfileData } from '@/hooks/useQuestions';
import type { QuestionsType } from '@/types/questionType';
import { useQueryClient } from '@tanstack/react-query';

export default function ProfilePage() {
	const queryClient = useQueryClient();
	const { user, isLoading, questions, refetchQuestions, username } =
		useProfileData();
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
			<div className="w-full xl:w-[70%] px-3 lg:px-0">
				<UserProfileBox username={username} />
			</div>
			<div className="w-full xl:w-[70%] px-3 lg:px-0">
				<QuestionBox onQuestionAdded={refetchQuestions} />
			</div>
			<h1 className="text-primary items-start text-left text-xl font-semibold mb-3">
				Pertanyaan
			</h1>
			{/* Question List Box */}
			<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1">
				{isLoading
					? [1, 2, 3].map((i) => <Skeleton key={i} className="w-full h-24" />)
					: questions.map((question: QuestionsType) => (
							<Card key={question.questionId} className="p-2 sm:p-4">
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
									<QuestionStats
										likeCount={question.likeCount}
										commentCount={question.commentCount}
									/>
									<Divider className="my-1 sm:my-2" />
									<QuestionActions
										questionId={question.questionId}
										isLiked={question.isLiked}
										user={user}
										onCommentToggle={() => toggleComments(question.questionId)}
										onShare={() => toggleShareModal(question.questionId)}
										refetchQuestion={() => refetchQuestion(question.questionId)}
									/>
									{showComments[question.questionId] && (
										<CommentSection
											questionId={question.questionId}
											user={user}
											refetchQuestion={() =>
												refetchQuestion(question.questionId)
											}
										/>
									)}
								</CardFooter>
								<ShareModal
									isOpen={isShareModalOpen[question.questionId] || false}
									onClose={() => toggleShareModal(question.questionId)}
									questionId={question.questionId}
									questionContent={question.content}
									username={question.posterUsername}
								/>
							</Card>
						))}
			</div>
		</div>
	);
}
