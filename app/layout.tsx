import { FooterComponent } from '@/components/home/footer';
import { NavigationTop } from '@/components/navigation/navbar';
import { MontserratFont as FontSans } from '@/config/fonts';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { clsx } from 'clsx';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Komunal - Q&A Platform',
	description:
		'Platform to ask and get answers on various topics. Explore new knowledge every day.',
	openGraph: {
		title: 'Komunal - Q&A Platform',
		description:
			'Platform to ask and get answers on various topics. Explore new knowledge every day.',
		url: 'https://komunal.club',
		siteName: 'Komunal App',
		images: [
			{
				url: '/banner.png',
				width: 1200,
				height: 630,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Komunal - Q&A Platform',
		description:
			'Platform to ask and get answers on various topics. Explore new knowledge every day.',
		images: ['https://komunal.club/banner.png'],
	},
	icons: {
		apple: '/apple-touch-icon.png',
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
			<Script
					src="https://cloud.umami.is/script.js"
					data-website-id="bfd4effa-2d4d-409d-bc3e-add89b26869d"
					strategy="afterInteractive"
				/>
			</head>
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
