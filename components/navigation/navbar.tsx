'use client';
import { useSession } from '@/hooks/useSession';
import { Navbar as NextUINavbar } from '@nextui-org/navbar';
import { useState } from 'react';
import { DesktopNavContent } from './desktopNavContent';
import { MobileNavContent } from './mobileNavContent';
import { NavbarBrand } from './navbarBrand';
import { NavbarMenu } from './navbarMenu';

export const NavigationTop = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, isUnauthenticated, logout } = useSession();

	return (
		<NextUINavbar
			position="sticky"
			isBlurred
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			<MobileNavContent isMenuOpen={isMenuOpen} />
			<NavbarBrand />
			<NavbarMenu
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				user={user}
				isUnauthenticated={isUnauthenticated}
				logout={logout}
			/>
			<DesktopNavContent
				user={user}
				isUnauthenticated={isUnauthenticated}
				logout={logout}
			/>
		</NextUINavbar>
	);
};