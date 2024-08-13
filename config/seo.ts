import type { Metadata } from 'next';

type RobotsOptions = {
	index?: boolean;
	follow?: boolean;
	noarchive?: boolean;
	nosnippet?: boolean;
	noimageindex?: boolean;
	nocache?: boolean;
};

export function generateSEOMetadata({
	title,
	description,
	keywords = [],
	robots = {},
}: {
	title: string;
	description: string;
	keywords?: string[];
	robots?: RobotsOptions;
}): Metadata {
	const defaultKeywords = [
		'Anonymous Q&A',
		'Ask Me Anything',
		'Social Q&A platform',
		'Online question-answer community',
		'Anonymous questions',
		'Public answers',
		'Personal insights',
		'Social interaction',
		'Ask questions anonymously',
		'Get honest answers',
		'Share your thoughts',
		'Connect with others',
		'Learn from others',
		'Express yourself freely',
		'Gain new perspectives',
		'Build online connections',
		'Komunal Q&A',
		'Tanya jawab anonim',
		'Platform pertanyaan',
		'Tanya jawab anonim',
		'Platform pertanyaan',
		'Tanyakan apa saja',
		'Pengakuan rahasia',
		'Anonimitas online',
		'Jejaring sosial',
		'Tanya jawab interaktif',
		'Pesan pribadi',
		'Platform berbasis rasa ingin tahu',
		'Umpan balik jujur',
		'Pertanyaan personal',
		'Media sosial anonim',
		'Pertanyaan terbuka',
		'Tanya jawab privat',
		'Pengakuan digital',
	];

	const allKeywords = [...new Set([...defaultKeywords, ...keywords])];
	const robotsContent = generateRobotsContent(robots);

	return {
		title,
		description,
		keywords: allKeywords,
		openGraph: {
			title,
			description,
			url: 'https://komunal.club',
			siteName: 'Komunal Club - Anonymous Q&A Platform',
			locale: 'en_US',
			type: 'website',
			images: [
				{
					url: '/banner.png',
					width: 1200,
					height: 630,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['https://komunal.club/banner.png'],
			creator: '@nezhifi',
		},
		icons: {
			apple: '/apple-touch-icon.png',
			icon: '/favicon.ico',
		},
		robots: robotsContent,
	};
}

function generateRobotsContent(options: RobotsOptions): string {
	const directives = [];

	if (options.index === false) directives.push('noindex');
	else if (options.index === true) directives.push('index');

	if (options.follow === false) directives.push('nofollow');
	else if (options.follow === true) directives.push('follow');

	if (options.noarchive) directives.push('noarchive');
	if (options.nosnippet) directives.push('nosnippet');
	if (options.noimageindex) directives.push('noimageindex');
	if (options.nocache) directives.push('nocache');

	return directives.join(', ');
}
