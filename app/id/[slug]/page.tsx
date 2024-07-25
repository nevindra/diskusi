'use client';

import { QuestionBox } from '@/components/profile/questionBox';
import { QuestionsList } from '@/components/profile/questionsList';
import { UserProfileBox } from '@/components/profile/userProfile';
import { Skeleton } from '@nextui-org/skeleton';

import { SkeltonProfile } from '@/components/profile/skeleton';
import { useProfileData } from '@/hooks/useQuestions';
import type { QuestionWithPosterUsernameType } from '@/types/questionType';

export default function ProfilePage() {
	const {
		user,
		isLoading,
		questionsWithLikes,
		refetchQuestions,
		refetchLikes,
		username,
	} = useProfileData();

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
				<QuestionBox
					onQuestionAdded={() => {
						refetchQuestions();
						refetchLikes();
					}}
				/>
			</div>
			<h1 className="text-primary items-start text-left text-xl font-semibold mb-3">
				Questions
			</h1>
			{/* Question List Box */}
			<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1">
				{isLoading
					? [1, 2, 3].map((i) => <Skeleton key={i} className="w-full h-24" />)
					: questionsWithLikes.map(
							(question: QuestionWithPosterUsernameType) => (
								<QuestionsList
									key={question.questionId}
									question={question}
									user={user}
								/>
							)
						)}
			</div>
		</div>
	);
}
