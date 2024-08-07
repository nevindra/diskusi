import { FooterComponent } from '@/components/home/footer';
import { NavigationTop } from '@/components/navigation/navbar';
import { MontserratFont as FontSans } from '@/config/fonts';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';

import { clsx } from 'clsx';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Komunal ID',
	description:
		'Platform untuk bertanya dan mendapatkan jawaban dari berbagai topik. Jelajahi pengetahuan baru setiap hari.',
	openGraph: {
		title: 'Komunal ID',
		description:
			'Platform untuk bertanya dan mendapatkan jawaban dari berbagai topik. Jelajahi pengetahuan baru setiap hari.',
		url: 'https://komunal-seven.vercel.app/',
		siteName: 'Komunal ID',
		images: [
			{
				url: '/bg.jpg',
				width: 1200,
				height: 630,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Komunal ID',
		description:
			'Platform untuk bertanya dan mendapatkan jawaban dari berbagai topik. Jelajahi pengetahuan baru setiap hari.',
		images: ['https://yourwebsite.com/twitter-image.jpg'],
	},
};

export const viewport: Viewport = {
	themeColor: [
	  { media: "(prefers-color-scheme: light)", color: "white" },
	  { media: "(prefers-color-scheme: dark)", color: "black" },
	],
  };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={clsx(
					'min-h-screen bg-background font-sans antialiased',
					FontSans.variable
				)}
			>
				<Providers>
					<div className="flex flex-col min-h-screen w-full">
						<NavigationTop />
						<main className="flex-grow">{children}</main>
						<FooterComponent />
					</div>
					<Analytics />
					<SpeedInsights />
				</Providers>
			</body>
		</html>
	);
}
