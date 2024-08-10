import { QuestionsTable, UsersTable } from '@/database/dbSchema';
import { db } from '@/database/initDB';
import { eq } from 'drizzle-orm';
import type { Metadata } from 'next';

type Props = {
	params: { questionId: string; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const question = await db
	.select({
		questionId: QuestionsTable.questionId,
		content: QuestionsTable.content,
		posterUsername: UsersTable.username,
	})
	.from(QuestionsTable)
	.innerJoin(UsersTable, eq(QuestionsTable.userId, UsersTable.id))
	.where(eq(QuestionsTable.questionId, params.questionId))
	.limit(1);

	const title = `${question[0].posterUsername}'s question`;
	const description = `Someone asked ${question[0].posterUsername} a question: ${question[0].content}`;
	const image = `${process.env.NEXT_PUBLIC_BASE_URL}/og?question=${encodeURIComponent(question[0].content)}`;
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/id/${question[0].posterUsername}/question/${question[0].questionId}`;
	return {
		title,
		description,
		openGraph: { title, description, images: [image], siteName: 'Komunal', url },
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
			},
		},
	};
}

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
		</>
	);
}