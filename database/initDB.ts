import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
	throw new Error("SUPABASE_URL is not set");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
	throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
}

const connectionString = `postgresql://${process.env.NEXT_SUPABASE_USERNAME}:${process.env.NEXT_SUPABASE_PASSWORD}@${process.env.NEXT_SUPABASE_HOST}/${process.env.NEXT_SUPABASE_DBNAME}`
// Disable prefetch as it is not supported for "Transaction" pool mode 
export const client = postgres(connectionString, { prepare: true })
export const db = drizzle(client);

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY
);