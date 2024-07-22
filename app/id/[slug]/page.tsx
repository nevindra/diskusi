'use client';

import { QuestionBox } from '@/components/profile/questionBox';
import { QuestionList } from '@/components/profile/questionList';
import { UserBio } from '@/components/profile/userBio';
import { useSession } from '@/hooks/useSession';
import { getQuestions } from '@/service/questionService';
import { Card } from '@nextui-org/card';
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
	});

	// useEffect(() => {
	// 	if (isLoading) return; // Skip if loading
	// 	if (isAuthenticated && user) {
	// 		const fetchQuestions = async () => {
	// 			const questionsList = await getQuestions(user.id);
	// 			setQuestions(
	// 				questionsList.map((q) => ({
	// 					questionId: q.questionId,
	// 					question: q.question,
	// 					userId: q.userId,
	// 					posterId: q.posterId, // Optional
	// 				}))
	// 			);
	// 		};
	// 		fetchQuestions();
	// 	}
	// }, [isAuthenticated, isLoading, user]); // Depend on isAuthenticated, isLoading, and user

	if (isLoading) {
		return <div>Loading...</div>;
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
				{sortedQuestions.map((question) => (
					<QuestionList key={question.questionId} question={question} />
				))}
			</div>
		</div>
	);
}
