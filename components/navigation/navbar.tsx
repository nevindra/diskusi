"use client";
import { Navbar as NextUINavbar } from "@nextui-org/navbar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthenticatedNavbar } from "./authNavbar";
import { HomeNavbar } from "./homeNavbar";

import { NavbarLeftComponent } from "./navbar-left";

export const NavigationTop = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const pathname = usePathname();
	let isHomePage = true;
	if (pathname !== "/" && pathname !== "/signup" && pathname !== "/login") {
		isHomePage = false;
	}
	return (
		<NextUINavbar
			maxWidth="xl"
			position="sticky"
			isBordered
			onMenuOpenChange={setIsMenuOpen}
		>
			
			<NavbarLeftComponent isMenuOpen={isMenuOpen} />
			{isHomePage ? <HomeNavbar /> : <AuthenticatedNavbar />}
		</NextUINavbar>
	);
};
