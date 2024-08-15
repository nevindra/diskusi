import { createBrowserClient } from '@supabase/ssr';

export const supabase_client = createBrowserClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);
