import { NavbarBrand, NavbarContent, NavbarMenuToggle } from '@nextui-org/navbar';
import Image from 'next/image';
import NextLink from 'next/link';

type MobileNavContentProps = {
	isMenuOpen: boolean;
};

export const MobileNavContent = ({ isMenuOpen }: MobileNavContentProps) => (
	<NavbarContent className="sm:hidden" justify="start">
		<NavbarMenuToggle
			aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
		/>
		<NavbarBrand>
			<NextLink className="flex justify-start items-center gap-1" href="/">
				<Image src="/komunal.png" alt="Komunal ID" width={40} height={40} />
				<p className="text-2xl font-bold text-primary">Komunal</p>
			</NextLink>
		</NavbarBrand>
	</NavbarContent>
);