import { useAnon } from '@/hooks/useAnon';
import type { UserType } from '@/types/userType';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/dropdown';
import { Link } from '@nextui-org/link';
import { NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Switch } from '@nextui-org/switch';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Gear, SignOut, UserCircle } from '@phosphor-icons/react/dist/ssr';

type DesktopNavContentProps = {
	user: UserType | null | undefined;
	isUnauthenticated: boolean;
	logout: () => void;
};

export const DesktopNavContent = ({
	user,
	isUnauthenticated,
	logout,
}: DesktopNavContentProps) => {
	const avatar = user?.avatarUrl
		? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${user.avatarUrl}`
		: '/user.png';

    const { isAnon, toggleAnon } = useAnon();

	return (
		<NavbarContent className="hidden sm:flex" justify="end">
			{isUnauthenticated ? (
				<>
					<NavbarItem>
						<Button as={Link} color="primary" href="/explore" variant="light">
							Explore
						</Button>
					</NavbarItem>
					<NavbarItem>
						<Button
							as={Link}
							color="primary"
							href="/login"
							variant="bordered"
							data-umami-event="Login:Click"
						>
							Login
						</Button>
					</NavbarItem>
					<NavbarItem>
						<Button
							as={Link}
							color="primary"
							href="/signup"
							variant="solid"
							data-umami-event="Signup:Click"
						>
							Sign Up
						</Button>
					</NavbarItem>
				</>
			) : (
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Avatar
							isBordered
							as="button"
							className="transition-transform"
							size="sm"
							src={avatar}
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem isReadOnly key="profile" className="h-14 gap-2">
							<p className="font-semibold">Signed in as</p>
							<p className="text-primary">{user?.username}</p>
						</DropdownItem>
						<DropdownItem isReadOnly key="switch-mode" showDivider>
							<Switch aria-label="Anonymous Mode" isSelected={isAnon} onChange={toggleAnon}>
								<p className="text-sm">Hide Profile</p>
							</Switch>
						</DropdownItem>
						<DropdownItem
							key="user"
							startContent={<UserCircle />}
							href={`/id/${user?.username}`}
						>
							My Questions
						</DropdownItem>
						<DropdownItem
							key="settings"
							href={`/id/${user?.username}/setting`}
							startContent={<Gear />}
						>
							Settings
						</DropdownItem>
						<DropdownItem
							key="search"
							startContent={<MagnifyingGlass />}
							href={'/explore'}
						>
							Explore Users
						</DropdownItem>
						<DropdownItem
							key="logout"
							startContent={<SignOut />}
							onClick={logout}
						>
							<p className="font-semibold text-primary">Log Out</p>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			)}
		</NavbarContent>
	);
};
