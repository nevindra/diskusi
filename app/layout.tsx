import { FooterComponent } from '@/components/home/footer';
import { NavigationTop } from '@/components/navigation/navbar';
import { MontserratFont as FontSans } from '@/config/fonts';
import { generateSEOMetadata } from '@/config/seo';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { clsx } from 'clsx';
import Script from 'next/script';
import { Providers } from './providers';

export const metadata = generateSEOMetadata({
	title: 'Komunal - Anonymous Q&A Platform',
	description:
		'Platform to ask and get answers on various topics. Explore new knowledge every day.',
    robots: {
        index: true,
        follow: true,
        noarchive: true,
        nosnippet: true,
        noimageindex: true,
        nocache: true,
    }
});

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
