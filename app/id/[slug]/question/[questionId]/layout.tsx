import { getQuestionById } from '@/handlers/questionHandlers';
import type { Metadata } from 'next';

type Props = {
	params: { questionId: string; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const question = await getQuestionById(params.questionId);
	console.log(question);
	const title = `${question.posterUsername}'s question`;
	const description = `Answer this question: ${question.content}`;
	const image = `${process.env.NEXT_PUBLIC_BASE_URL}/og?question=${encodeURIComponent(question.content)}`;

	return {
		title,
		description,
		openGraph: { title, description, images: [image] },
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
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