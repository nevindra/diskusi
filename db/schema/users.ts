import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const users = sqliteTable("users", {
	id: text("id").primaryKey().$defaultFn(() => nanoid(10)).unique(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.defaultNow(),
    isVerfied: integer("isVerified", {mode: 'boolean'}).default(false),
});
