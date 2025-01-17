'use client';

import { CommentSection } from '@/components/profile/commentSection';
import { QuestionActions } from '@/components/profile/questions/questionActions';
import { QuestionBody } from '@/components/profile/questions/questionBody';
import { QuestionHeader } from '@/components/profile/questions/questionHeader';
import { QuestionBox } from '@/components/profile/questions/questionInputBox';
import { ShareModal } from '@/components/profile/questions/questionShare';
import { QuestionStats } from '@/components/profile/questions/questionStats';
import { SkeltonProfile } from '@/components/profile/skeleton';
import { UserProfileBox } from '@/components/profile/userProfile';
import { useProfileData } from '@/hooks/useQuestions';
import { useProfileStore } from '@/state/profileState';
import type { QuestionsType } from '@/types/questionType';
import type { UsersExplore } from '@/types/userType';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Image } from '@nextui-org/image';
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal'; // Import a modal component from your UI library
import { Skeleton } from '@nextui-org/skeleton';
import { useCallback, useEffect, useState } from 'react';

export default function ProfilePageContent({ profileData }: { profileData: UsersExplore }) {
    const { setProfile, profileUser } = useProfileStore();
    useEffect(() => {
        setProfile(
            profileData.username ?? '',
            profileData.avatarUrl ?? '',
            profileData.id ?? '',
            profileData.bio ?? '',
        );
    }, [profileData, setProfile])
    

	const { user, isLoading, questions, isError } =
		useProfileData(profileUser.username);

	const [showComments, setShowComments] = useState<Record<string, boolean>>({});
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isShareModalOpen, setIsShareModalOpen] = useState<
		Record<string, boolean>
	>({});

	const toggleComments = useCallback((questionId: string) => {
		setShowComments((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
	}, []);
	const toggleShareModal = useCallback((questionId: string) => {
		setIsShareModalOpen((prev) => ({
			...prev,
			[questionId]: !prev[questionId],
		}));
	}, []);

	const handleImageClick = (imageUrl: string) => {
		setSelectedImage(imageUrl);
	};

	const handleCloseModal = () => {
		setSelectedImage(null);
	};

	if (isLoading) {
		<SkeltonProfile />;
	}

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Main Card */}
			<div className="mt-4">
				<UserProfileBox />
			</div>
			<div className="mt-4">
				<QuestionBox user={user} username={profileData.id} />
			</div>
			{/* Question List Box */}
			<div className="flex flex-col w-full space-y-4 mt-4">
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
								isAnon={question.isAnon}
								posterId={question.posterId}
								questionId={question.questionId}
								posterUsername={question.posterUsername}
								createdAt={question.createdAt}
								avatarUrl={question.avatarUrl}
								user={user}
							/>
							<CardBody className="py-1 sm:py-2">
								<QuestionBody
									content={question.content}
									imageUrls={question.imageUrls || []}
									onImageClick={handleImageClick}
								/>
							</CardBody>
							<CardFooter className="flex flex-col items-start pt-1 sm:pt-2">
								<QuestionStats
									likeCount={question.likeCount}
									commentCount={question.commentCount}
									questionId={question.questionId}
									username={profileData.username}
									isSingleQuestion={false}
								/>
								<Divider className="my-1 sm:my-2" />
								<QuestionActions
									questionId={question.questionId}
									isLiked={question.isLiked}
									user={user}
									onCommentToggle={() => toggleComments(question.questionId)}
									onShare={() => toggleShareModal(question.questionId)}
									currentUsername={profileData.username}
									isCommentsShown={showComments[question.questionId] || false}
								/>
								{showComments[question.questionId] && (
									<CommentSection
										questionId={question.questionId}
										user={user}
										isSingleQuestion={false}
										username={profileData.username}
									/>
								)}
							</CardFooter>
							<ShareModal
								isOpen={isShareModalOpen[question.questionId] || false}
								onClose={() => toggleShareModal(question.questionId)}
								questionId={question.questionId}
								questionContent={question.content}
								username={profileData.username}
							/>
						</Card>
					))
				)}
			</div>
			{selectedImage && (
				<Modal
					isOpen={!!selectedImage}
					onClose={handleCloseModal}
					backdrop="blur"
					size="xl"
					className="bg-transparent flex items-center shadow-none"
					placement="center"
				>
					<ModalContent>
						{(onClose) => (
							<ModalBody className="p-0 overflow-hidden rounded-lg">
								<Image
									src={selectedImage || ''}
									alt="Zoomed Image"
									className="max-w-full max-h-[80vh] object-contain"
									onClick={onClose}
								/>
							</ModalBody>
						)}
					</ModalContent>
				</Modal>
			)}
		</div>
	);
}
