import { FooterComponent } from '@/components/home/footer';
import { MontserratFont as FontSans } from '@/config/fonts';
import '@/styles/globals.css';
import { clsx } from 'clsx';

import { NavigationTop } from '@/components/navigation/navbar';
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
				</Providers>
			</body>
		</html>
	);
}
