import { FooterComponent } from "@/components/home/footer";
import { NavbarComponent } from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import { QueryClient } from "@tanstack/react-query";
import { Providers } from "./providers";

const queryClient = new QueryClient();

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
					<div className="flex flex-col flex-grow bg-background">
						<NavbarComponent />
						<main className="container mx-auto max-w-7xl flex-grow">
							{children}
						</main>
						<FooterComponent />
					</div>
				</Providers>
			</body>
		</html>
	);
}
