import { getQuestionById, getQuestions } from '@/handlers/questionHandlers';
import { useSession } from '@/hooks/useSession';
import type { UserType } from '@/types/userType';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export function useProfileData() {
	const {
		user,
		isLoading: isSessionLoading,
	}: { user: UserType | null; isLoading: boolean } = useSession();
	const pathname = usePathname();
	const username = pathname.split('/')[2];

	const {
		data: questions = [],
		refetch: refetchQuestions,
		isLoading: isQuestionsLoading,
	} = useQuery({
		queryKey: ['questions', username],
		queryFn: () => getQuestions(username),
		enabled: !!username,
		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		refetchOnReconnect: false,
		retry: 3,
	});

	const isLoading = isSessionLoading || isQuestionsLoading;

	// Sort questions and add isLiked property
	const sortedQuestionsWithLikes = useMemo(() => {
		return questions
			.map((question) => ({
				...question,
				isLiked: user ? question.likedUserIds.includes(user.id) : false,
			}))
	}, [questions, user]);

	return {
		user,
		isLoading,
		questions: sortedQuestionsWithLikes,
		refetchQuestions,
		username,
	};
}
export function useQuestionData(questionId: string) {
	const queryClient = useQueryClient();
	const {
		user,
		isLoading: isSessionLoading,
	}: { user: UserType | null; isLoading: boolean } = useSession();

	const {
		data: question,
		isLoading: isQuestionLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ['question', questionId],
		queryFn: () => getQuestionById(questionId),
		enabled: !!questionId,
		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		refetchOnReconnect: false,
		retry: 3,
	});

	const isLoading = isSessionLoading || isQuestionLoading;

	const refetchQuestion = async () => {
		queryClient.invalidateQueries({ queryKey: ['questions', questionId] });
		await refetch();
	};

	const isLiked = useMemo(() => {
		return user ? question?.likedUserIds.includes(user.id) : false;
	}, [question, user]);

	return {
		user,
		isLoading,
		question: question ? { ...question, isLiked } : null,
		error,
		refetchQuestion,
	};
}
