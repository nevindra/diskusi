import { FooterComponent } from '@/components/home/footer';
import { NavigationTop } from '@/components/navigation/navbar';
import { MontserratFont as FontSans } from '@/config/fonts';
import '@/styles/globals.css';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { clsx } from 'clsx';
import { Providers } from './providers';

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