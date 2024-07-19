import { FooterComponent } from "@/components/home/footer";
import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";

import { NavigationTop } from "@/components/navigation/navbar";
import { Providers } from "./providers";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
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
