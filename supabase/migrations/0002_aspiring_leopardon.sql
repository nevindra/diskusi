ALTER TABLE "likes" ALTER COLUMN "question_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "poster_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "image_urls" jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_poster_id_users_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN IF EXISTS "is_anonymous";