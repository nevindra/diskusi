import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/users";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
	throw new Error("SUPABASE_URL or SUPABASE_ANON_KEY is not set");
}

const pool = new Pool({
	connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL,
});

export const db = drizzle(pool, { schema });

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function checkSupabaseConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Supabase connection error:', error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking Supabase connection:', error);
      return false;
    }
  }