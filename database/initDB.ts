import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
	throw new Error("SUPABASE_URL or SUPABASE_ANON_KEY is not set");
}

const connectionString = 'postgresql://postgres.acbxjfkgfvesimpavkio:tnNKSumHMs1GnvZK@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
// Disable prefetch as it is not supported for "Transaction" pool mode 
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function checkSupabaseConnection() {
	try {
		const { data, error } = await supabase.auth.getSession();
		if (error) {
			console.error('Error fetching session:', error);
			return false;
		}
		return true;
	} catch (error) {
		console.error('Error checking Supabase connection:', error);
		return false;
	}
}
