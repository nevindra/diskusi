'use client';
import { Navbar as NextUINavbar } from '@nextui-org/navbar';

import { AuthenticatedNavbar } from './authNavbar';
import { HomeNavbar } from './homeNavbar';
import { NavbarLeftComponent } from './navbar-left';

import { useSession } from '@/hooks/useSession';
import { useState } from 'react';

export const NavigationTop = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const closeMenu = () => setIsMenuOpen(false);

	const { user, isUnauthenticated, logout } = useSession();
	return (
		<NextUINavbar
			position="sticky"
			isBlurred
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarLeftComponent isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
			{isUnauthenticated ? (
				<HomeNavbar />
			) : (
				<AuthenticatedNavbar user={user} logout={logout} />
			)}
		</NextUINavbar>
	);
};
