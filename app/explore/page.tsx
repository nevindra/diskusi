import { UsersCard } from '@/components/explore/usersCard';
import { QuestionsTable, UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import type { UsersExplore } from '@/types/userType';
import { eq, sql } from 'drizzle-orm';

async function getUsers(): Promise<UsersExplore[]> {
	const usersData: UsersExplore[] = await db
		.select({
			username: UsersTable.username,
			avatarUrl: UsersTable.avatarUrl,
			bio: UsersTable.bio,
			questionCount: sql<number>`COALESCE(COUNT(DISTINCT ${QuestionsTable.questionId}), 0)`,
		})
		.from(UsersTable)
		.leftJoin(QuestionsTable, eq(UsersTable.id, QuestionsTable.userId))
		.groupBy(UsersTable.username, UsersTable.avatarUrl, UsersTable.bio)
		.orderBy(
			sql`COALESCE(COUNT(DISTINCT ${QuestionsTable.questionId}), 0) DESC`
		);

	return usersData;
}

export default async function Page() {
	const users = await getUsers();
	return (
		<div className="flex flex-col items-center justify-center mt-3">
			<div className="flex flex-col my-10 items-center justify-center gap-3">
				<h1 className="text-4xl font-bold text-center">Explore</h1>
				<p className="text-center text-secondary text-base px-4">
					Check all people who create profiles in <span className='text-primary font-bold'>Komunal</span> and see their
					profiles.
				</p>
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:max-w-[75%]">
				{users?.map((item, _index) => (
					<UsersCard
						key={item.username}
						username={item.username}
						avatarUrl={item.avatarUrl || null}
						bio={item.bio || null}
					/>
				))}
			</div>
		</div>
	);
}
