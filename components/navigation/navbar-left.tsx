import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import {
	NavbarBrand,
	NavbarContent,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/navbar';
import Image from 'next/image';
import NextLink from 'next/link';

export const NavbarLeftComponent = ({
	isMenuOpen,
	closeMenu,
}: { isMenuOpen: boolean; closeMenu: () => void }) => {
	return (
		<>
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				/>
				<NavbarBrand>
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Image
							src="/komunal-logo.svg"
							alt="Komunal ID"
							width={40}
							height={40}
						/>
						<p className="text-2xl font-bold text-secondary">Komunal</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex basis-1/5" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Image
							src="/komunal-logo.svg"
							alt="Komunal ID"
							width={40}
							height={40}
						/>
						<p className="text-2xl font-bold text-secondary">Komunal</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
			<NavbarMenu>
				<NavbarMenuItem>
					<Link className="w-full" href="/" size="lg" onPress={closeMenu}>
						Halaman Utama
					</Link>
				</NavbarMenuItem>
				<Divider />
				<NavbarMenuItem>
					<Link className="w-full" href="/signup" size="lg" onPress={closeMenu}>
						Daftar Akun
					</Link>
				</NavbarMenuItem>
				<Divider />
				<NavbarMenuItem>
					<Link className="w-full" href="/login" size="lg" onPress={closeMenu}>
						Masuk
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</>
	);
};
