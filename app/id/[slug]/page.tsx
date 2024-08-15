import { UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import ProfilePageContent from './profilePageContent';
export default async function ProfilePage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const user = await db.select({
		username: UsersTable.username,
		avatarUrl: UsersTable.avatarUrl,
		bio: UsersTable.bio,
		id: UsersTable.id,
	}).from(UsersTable)
	.where(eq(UsersTable.username, slug))
	.limit(1);

	if (user.length === 0) {
		notFound();	
	}

	return <ProfilePageContent profileData={user[0]} />;
}