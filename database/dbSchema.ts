import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: uuid('id').primaryKey().references(() => authUsers.id),
  username: varchar('username', { length: 21 }).notNull(),
  email: varchar('email', { length: 36 }).notNull(),
  bio: text('bio'),
  avatarUrl: varchar('avatar_url', { length: 36 }),
});

export const QuestionsTable = pgTable('questions', {
  questionId: varchar('question_id', { length: 36 }).primaryKey(), // nanoid default length
  userId: uuid('user_id').notNull().references(() => UsersTable.id),
  posterId: varchar('poster_id', { length: 36 }),
  content: text('content').notNull(),
  isAnonymous: boolean('is_anonymous').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow()
});

export const CommentsTable = pgTable('comments', {
  commentId: varchar('comment_id', { length: 36 }).primaryKey(), // nanoid default length
  questionId: varchar('question_id', { length: 36 }).references(() => QuestionsTable.questionId),
  userId: uuid('user_id').notNull().references(() => UsersTable.id),
  posterId: varchar('poster_id', { length: 36 }),
  content: text('content').notNull(),
  isAnonymous: boolean('is_anonymous').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow()
});

export const LikesTable = pgTable('likes', {
  likeId: uuid('like_id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => UsersTable.id),
  questionId: varchar('question_id', { length: 21 }).references(() => QuestionsTable.questionId),
  createdAt: timestamp('created_at').defaultNow()
}, (table) => {
  return {
    userQuestionUnique: uniqueIndex('user_question_unique').on(table.userId, table.questionId)
  }
});

export const SharesTable = pgTable('shares', {
  shareId: uuid('share_id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => UsersTable.id),
  questionId: varchar('question_id', { length: 21 }).references(() => QuestionsTable.questionId),
  createdAt: timestamp('created_at').defaultNow()
});

export type InsertQuestion = typeof QuestionsTable.$inferInsert;
export type InsertComment = typeof CommentsTable.$inferInsert;
export type InsertLike = typeof LikesTable.$inferInsert;
export type InsertShare = typeof SharesTable.$inferInsert;

export type SelectQuestion = typeof QuestionsTable.$inferSelect;
export type SelectComment = typeof CommentsTable.$inferSelect;
export type SelectLike = typeof LikesTable.$inferSelect;
export type SelectShare = typeof SharesTable.$inferSelect;

// This represents the Supabase Auth users table
// Note: This is for reference only and won't be used for direct queries
const authUsers = pgTable('users', {
  id: uuid('id').primaryKey(),
  // other fields in auth.users...
}, (table) => {
  return {
    tableName: 'users',
    schema: 'auth',
  }
});