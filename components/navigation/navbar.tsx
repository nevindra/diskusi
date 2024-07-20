"use client";
import { Navbar as NextUINavbar } from "@nextui-org/navbar";

import { AuthenticatedNavbar } from "./authNavbar";
import { HomeNavbar } from "./homeNavbar";
import { NavbarLeftComponent } from "./navbar-left";

import { usePathname } from "next/navigation";
import { useState } from "react";


export const NavigationTop = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const closeMenu = () => setIsMenuOpen(false);

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
			isBlurred
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			
			<NavbarLeftComponent isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
			{isHomePage ? <HomeNavbar /> : <AuthenticatedNavbar />}
		</NextUINavbar>
	);
};
