import type { Config } from "drizzle-kit";

export default {
	schema: "./database/dbSchema.ts",
	out: "./supabase/migrations",
	dialect:"postgresql",
	dbCredentials: {
		url:'postgresql://postgres.acbxjfkgfvesimpavkio:tnNKSumHMs1GnvZK@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
	}
} satisfies Config;
