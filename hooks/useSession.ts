import { supabase_client } from '@/database/client';
import { useAnonStore } from '@/state/anonState';
import { useTempQuestionStore } from '@/state/questionState';
import type { UserType } from '@/types/userType';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useSession() {
	const queryClient = useQueryClient();

	const {
		data: session,
		isLoading: isSessionLoading,
		isError: isSessionError,
	} = useQuery({
		queryKey: ['session'],
		queryFn: async () => {
			const { data, error } = await supabase_client.auth.getSession();
			if (error) throw error;
			return data.session;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	
	const {
		data: user,
		isLoading: isUserLoading,
		isError: isUserError,
	} = useQuery<UserType | null, Error>({
		queryKey: ['user', session?.user?.id],
		queryFn: async () => {
			if (!session?.user?.id) return null;
			const { data, error } = await supabase_client
				.from('users')
				.select('*')
				.eq('id', session.user.id)
				.single();
			if (error) {
				if (error.code === 'PGRST116') {
					// User not found
					return null;
				}
				throw error;
			}
			return data as UserType;
		},
		enabled: !!session?.user?.id,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	const logout = async () => {
		await supabase_client.auth.signOut();
		queryClient.setQueryData(['session'], null);
		queryClient.setQueryData(['user', session?.user?.id], null);
		useTempQuestionStore.getState().clearAllQuestions();
	};

	const isLoading = isSessionLoading || isUserLoading;
	const isError = isSessionError || isUserError;
	const {setIsAnon} = useAnonStore();

	useEffect(() => {
		if (user?.id === undefined) {
			setIsAnon(true);
		} 
	}, [user, setIsAnon]);

	return {
		isLoading,
		isAuthenticated: !!session,
		isUnauthenticated: isError || (!isLoading && !session),
		user: user,
		logout,
	};
}
