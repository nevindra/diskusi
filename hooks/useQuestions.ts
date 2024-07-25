import { useSession } from '@/hooks/useSession';
import { getLikes } from '@/service/likeService';
import { getQuestions } from '@/service/questionService';
import type { UserType } from '@/types/userType';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export function useProfileData() {
	const {
		user,
		isLoading: isSessionLoading,
	}: { user: UserType | null; isLoading: boolean } = useSession();
	const _queryClient = useQueryClient();
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

	const {
		data: likes = [],
		refetch: refetchLikes,
		isLoading: isLikesLoading,
	} = useQuery({
		queryKey: ['likes', user?.id],
		queryFn: () => getLikes(user?.id || ''),
		enabled: !!user?.id,
		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		refetchOnReconnect: false,
		retry: 3,
	});

	const isLoading = isSessionLoading || isQuestionsLoading || isLikesLoading;

	// Sort questions by createdAt in descending order (newest first)
	const sortedQuestions = [...questions].sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);

	// Combine questions with likes only when both data are available
	const questionsWithLikes =
		!isLoading && questions.length > 0 && likes.length > 0
			? sortedQuestions.map((question) => ({
					...question,
					isLiked: likes.some(
						(like) => like.questionId === question.questionId
					),
				}))
			: sortedQuestions.map((question) => ({
					...question,
					isLiked: false,
				}));

	return {
		user,
		isLoading,
		questionsWithLikes,
		refetchQuestions,
		refetchLikes,
		username,
	};
}
