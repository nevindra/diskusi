import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
	const cookieStore = cookies();
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
		throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
	}

	if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
		throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
	}
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						for (const { name, value, options } of cookiesToSet) {
							cookieStore.set(name, value, options);
						}
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		}
	);
}
