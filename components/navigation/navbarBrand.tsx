import { NavbarContent, NavbarBrand as NextUINavbarBrand } from '@nextui-org/navbar';
import Image from 'next/image';
import NextLink from 'next/link';

export const NavbarBrand = () => (
	<NavbarContent className="hidden sm:flex basis-1/5" justify="start">
		<NextUINavbarBrand as="li" className="gap-3 max-w-fit">
			<NextLink className="flex justify-start items-center gap-1" href="/">
				<Image src="/komunal.png" alt="Komunal ID" width={40} height={40} priority />
				<p className="text-2xl font-bold text-primary">Komunal</p>
			</NextLink>
		</NextUINavbarBrand>
	</NavbarContent>
);