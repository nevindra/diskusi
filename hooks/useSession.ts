import { supabase_client } from '@/database/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useSession() {
	const queryClient = useQueryClient();

	const {
		data: session,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['session'],
		queryFn: async () => {
			const { data, error } = await supabase_client.auth.getSession();
			if (error) throw error;
			return data.session;
		},
	});

	const logout = async () => {
		await supabase_client.auth.signOut();
		queryClient.setQueryData(['session'], null);
	};

	return {
		isLoading,
		isAuthenticated: !!session,
		isUnauthenticated: isError || (!isLoading && !session),
		user: session?.user ?? null,
		logout,
	};
}
