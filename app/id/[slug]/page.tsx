'use client';

import { QuestionBox } from '@/components/profile/questionBox';
import { QuestionsList } from '@/components/profile/questionsList';
import { UserProfileBox } from '@/components/profile/userProfile';
import { useSession } from '@/hooks/useSession';
import { getQuestions } from '@/service/questionService';
import type { QuestionType } from '@/types/questionType';
import type { UserType } from '@/types/userType';
import { Card } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export default function ProfilePage() {
	const {
		user,
		isLoading,
		isAuthenticated,
	}: { user: UserType; isLoading: boolean; isAuthenticated: boolean } =
		useSession();
	const queryClient = useQueryClient();

	const pathname = usePathname();
	const username = pathname.split('/')[2];

	const { data: questions = [] }: { data: QuestionType[] } = useQuery({
		queryKey: ['questions', username],
		queryFn: () => getQuestions(username),
		enabled: !!username,
		staleTime: 5 * 60 * 1000, // Data will be considered fresh for 5 minutes
		gcTime: 30 * 60 * 1000, // Cache data for 30 minutes
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retry: 3,
	});

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center md:m-8 lg:m-10">
				<Card className="flex flex-col w-full xl:w-[70%] lg:flex-row m-2 lg:space-x-8 p-4 lg:p-8">
					<Skeleton className="w-1/2 h-64" /> {/* UserBio skeleton */}
					<Skeleton className="w-1/2 h-64" /> {/* QuestionBox skeleton */}
				</Card>
				<h1 className="text-primary items-start text-left text-xl font-semibold mb-3">
					Questions
				</h1>
				<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1 lg:px-4">
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} className="w-full h-24" />
					))}
				</div>
			</div>
		);
	}
	// Sort questions by createdAt in descending order (newest first)
	const sortedQuestions = [...questions].sort(
		(a, b) =>
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);

	return (
		<div className="flex flex-col items-center justify-center md:m-8 lg:m-10">
			{/* Main Card */}
			<div className="w-full xl:w-[70%] px-3 lg:px-0">
				<UserProfileBox username={username} />
			</div>
			<div className="w-full xl:w-[70%] px-3 lg:px-0">
				<QuestionBox />
			</div>
			<h1 className="text-primary items-start text-left text-xl font-semibold mb-3">
				Questions
			</h1>
			{/* Question List Box */}
			<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1">
				{isLoading
					? [1, 2, 3].map((i) => <Skeleton key={i} className="w-full h-24" />)
					: sortedQuestions.map((question: QuestionType) => (
							<QuestionsList
								key={question.questionId}
								question={question}
								user={user}
							/>
						))}
			</div>
		</div>
	);
}
