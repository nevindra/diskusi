import { supabase_client } from "@/database/client";
import type { UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type State = {
	status: "idle" | "loading" | "authenticated" | "unauthenticated";
	user: UserResponse["data"] | null;
};

export function useSession() {
	const [state, setState] = useState<State>({ status: "idle", user: null });

	const logout = async () => {
		await supabase_client.auth.signOut();
		setState({ status: "unauthenticated", user: null });
	};

	useEffect(() => {
		if (state.status === "authenticated" || state.status === "loading") return;
		async function checkAuthStatus() {
			setState((s) => ({ ...s, status: "loading" }));
			try {
				const { data, error } = await supabase_client.auth.getSession();
				if (error) throw error;
				setState((s) => ({ ...s, status: "authenticated", user: data.session }));
			} catch (error) {
				console.error("Error checking auth status:", error);
				setState({ status: "unauthenticated", user: null });
			}
		}
		checkAuthStatus();
	}, [state]);

	
	return {
		isLoading: state.status === "loading",
		isAuthenticated: state.status === "authenticated",
		isUnauthenticated: state.status === "unauthenticated",
		user: state.user?.user,
		logout,
	};
}
