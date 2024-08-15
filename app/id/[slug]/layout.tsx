import { generateSEOMetadata } from '@/config/seo';
import type { Metadata } from 'next';

type Props = {
	params: {  slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug;
    const title = `${slug}'s profile`;
    return generateSEOMetadata({
      title,
      description:
        `Ask ${slug} a question and get answers from the community on Komunal`,
      robots: {
        index: true,
        follow: true,
        noarchive: true,
        nosnippet: true,
        noimageindex: true,
        nocache: true,
      }
    });
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