import { getQuestionById } from '@/handlers/questionHandlers';
import type { Metadata } from 'next';

type Props = {
	params: { questionId: string; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const question = await getQuestionById(params.questionId);
	const title = `${question.posterUsername}'s question`;
	const description = `Someone asked ${question.posterUsername} a question: ${question.content}`;
	const image = `${process.env.NEXT_PUBLIC_BASE_URL}/og?question=${encodeURIComponent(question.content)}`;
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/id/${question.posterUsername}/question/${question.questionId}`;
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