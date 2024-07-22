'use client';

import { QuestionBox } from '@/components/profile/questionBox';
import { QuestionList } from '@/components/profile/questionList';
import { UserBio } from '@/components/profile/userBio';
import { useSession } from '@/hooks/useSession';
import { getQuestions } from '@/service/questionService';
import { Card } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
	const { user, isLoading, isUnauthenticated, isAuthenticated } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const _queryClient = useQueryClient();

	useEffect(() => {
		if (isUnauthenticated) {
			router.push('/login');
		}
	}, [isUnauthenticated, router]);

	const { data: questions = [] } = useQuery({
		queryKey: ['questions', user?.id],
		queryFn: () => getQuestions(pathname.split('/')[2]),
		enabled: isAuthenticated && !!user,
		staleTime: 60000, // Data will be considered fresh for 1 minute
		refetchOnWindowFocus: false, // Disable refetch on window focus
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
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);
	return (
		<div className="flex flex-col items-center justify-center md:m-8 lg:m-10">
			{/* Main Card */}
			<Card className="flex flex-col w-full xl:w-[70%] lg:flex-row m-2 lg:space-x-8 p-4 lg:p-8">
				{/* Left Side - Account Info */}
				<UserBio />
				{/* Right Side - Ask Question Box */}
				<QuestionBox />
			</Card>
			<h1 className="text-primary items-start text-left text-xl font-semibold mb-3">
				Questions
			</h1>
			{/* Question List Box */}
			<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1 lg:px-4">
				{isLoading
					? [1, 2, 3].map((i) => <Skeleton key={i} className="w-full h-24" />)
					: sortedQuestions.map((question) => (
							<QuestionList key={question.questionId} question={question} />
						))}
			</div>
		</div>
	);
}
