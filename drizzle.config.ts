import type { Config } from "drizzle-kit";

const{NEXT_SUPABASE_USERNAME, NEXT_SUPABASE_PASSWORD, NEXT_SUPABASE_HOST, NEXT_SUPABASE_DBNAME} = process.env;

export default {
	schema: "./database/dbSchema.ts",
	out: "./supabase/migrations",
	dialect:"postgresql",
	dbCredentials: {
		url:`postgresql://${NEXT_SUPABASE_USERNAME}:${NEXT_SUPABASE_PASSWORD}@${NEXT_SUPABASE_HOST}/${NEXT_SUPABASE_DBNAME}`,
	}
} satisfies Config;
