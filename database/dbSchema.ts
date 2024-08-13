import {
	boolean,
	jsonb,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
	id: uuid('id')
		.primaryKey()
		.references(() => authUsers.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	username: varchar('username', { length: 21 }).notNull(),
	email: varchar('email', { length: 36 }).notNull(),
	bio: text('bio'),
	avatarUrl: varchar('avatarUrl', { length: 64 }),
});

export const QuestionsTable = pgTable('questions', {
	questionId: varchar('question_id', { length: 36 }).primaryKey(), // nanoid default length
	userId: uuid('user_id')
		.notNull()
		.references(() => UsersTable.id, {
			onUpdate: 'cascade',
			onDelete: 'cascade',
		}),
	posterId: uuid('poster_id').references(() => UsersTable.id, {
		onUpdate: 'cascade',
		onDelete: 'cascade',
	}),
	content: text('content').notNull(),
	imageUrls: jsonb('image_urls').$type<string[] | null>(), // Update this line
	createdAt: timestamp('created_at').defaultNow(),
	isAnon: boolean('is_anon').default(true),
});

export const CommentsTable = pgTable('comments', {
	commentId: varchar('comment_id', { length: 36 }).primaryKey(), // nanoid default length
	questionId: varchar('question_id', { length: 36 }).references(
		() => QuestionsTable.questionId,
		{ onDelete: 'cascade', onUpdate: 'cascade' }
	),
	userId: uuid('user_id')
		.notNull()
		.references(() => UsersTable.id, {
			onUpdate: 'cascade',
			onDelete: 'cascade',
		}),
	posterId: uuid('poster_id').references(() => UsersTable.id, {
		onUpdate: 'cascade',
		onDelete: 'cascade',
	}),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
});

export const LikesTable = pgTable(
	'likes',
	{
		likeId: uuid('like_id').defaultRandom().primaryKey(),
		userId: uuid('user_id')
			.notNull()
			.references(
				() => UsersTable.id,
				{ onDelete: 'cascade', onUpdate: 'cascade' }
			),
		questionId: varchar('question_id', { length: 36 }).references(
			() => QuestionsTable.questionId,
			{ onDelete: 'cascade', onUpdate: 'cascade' }
		),
		createdAt: timestamp('created_at').defaultNow(),
	},
	(table) => {
		return {
			userQuestionUnique: uniqueIndex('user_question_unique').on(
				table.userId,
				table.questionId
			),
		};
	}
);

export type InsertQuestion = typeof QuestionsTable.$inferInsert;
export type InsertComment = typeof CommentsTable.$inferInsert;
export type InsertLike = typeof LikesTable.$inferInsert;

export type SelectQuestion = typeof QuestionsTable.$inferSelect;
export type SelectComment = typeof CommentsTable.$inferSelect;
export type SelectLike = typeof LikesTable.$inferSelect;

// This represents the Supabase Auth users table
// Note: This is for reference only and won't be used for direct queries
const authUsers = pgTable(
	'users',
	{
		id: uuid('id').primaryKey(),
		// other fields in auth.users...
	},
	(_table) => {
		return {
			tableName: 'users',
			schema: 'auth',
		};
	}
);
