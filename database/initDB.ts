import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = `postgresql://${process.env.NEXT_SUPABASE_USERNAME}:${process.env.NEXT_SUPABASE_PASSWORD}@${process.env.NEXT_SUPABASE_HOST}/${process.env.NEXT_SUPABASE_DBNAME}`
// Disable prefetch as it is not supported for "Transaction" pool mode 
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);