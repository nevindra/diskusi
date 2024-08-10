import type { UserType } from '@/types/userType';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import {
	NavbarMenuItem,
	NavbarMenu as NextUINavbarMenu,
} from '@nextui-org/navbar';

type NavbarMenuProps = {
	isMenuOpen: boolean;
	setIsMenuOpen: (isOpen: boolean) => void;
	user: UserType | null | undefined;
	isUnauthenticated: boolean;
	logout: () => void;
};

export const NavbarMenu = ({
	isMenuOpen,
	setIsMenuOpen,
	user,
	isUnauthenticated,
	logout,
}: NavbarMenuProps) => {
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<NextUINavbarMenu>
			<NavbarMenuItem>
				<Link className="w-full" href="/" size="lg" onPress={closeMenu}>
					Home
				</Link>
			</NavbarMenuItem>
			<Divider />
			{isUnauthenticated ? (
				<>
					<NavbarMenuItem>
						<Link
							className="w-full"
							href="/explore"
							size="lg"
							onPress={closeMenu}
						>
							Explore Users
						</Link>
					</NavbarMenuItem>
					<Divider />
					<NavbarMenuItem>
						<Link
							className="w-full"
							href="/signup"
							size="lg"
							onPress={closeMenu}
						>
							Create Account
						</Link>
					</NavbarMenuItem>
					<Divider />
					<NavbarMenuItem>
						<Link
							className="w-full"
							href="/login"
							size="lg"
							onPress={closeMenu}
						>
							Login
						</Link>
					</NavbarMenuItem>
				</>
			) : (
				<>
					<NavbarMenuItem>
						<Link
							className="w-full"
							href="/explore"
							size="lg"
							onPress={closeMenu}
						>
							Explore Users
						</Link>
					</NavbarMenuItem>
					<Divider />
					<NavbarMenuItem>
						<Link
							className="w-full"
							href={`/id/${user?.username}`}
							size="lg"
							onPress={closeMenu}
						>
							Question Profile
						</Link>
					</NavbarMenuItem>
					<Divider />
					<NavbarMenuItem>
						<Link
							className="w-full"
							href={`/id/${user?.username}/setting`}
							size="lg"
							onPress={closeMenu}
						>
							My Settings
						</Link>
					</NavbarMenuItem>
					<Divider />
					<NavbarMenuItem>
						<Link
							className="w-full"
							href="#"
							size="lg"
							onPress={() => {
								closeMenu();
								logout();
							}}
						>
							Log Out
						</Link>
					</NavbarMenuItem>
				</>
			)}
		</NextUINavbarMenu>
	);
};
