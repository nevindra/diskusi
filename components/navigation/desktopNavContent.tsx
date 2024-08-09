import type { UserType } from '@/types/userType';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Link } from '@nextui-org/link';
import { NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { SignOut, UserCircle, UserCircleGear } from '@phosphor-icons/react/dist/ssr';

type DesktopNavContentProps = {
	user: UserType | null | undefined;
	isUnauthenticated: boolean;
	logout: () => void;
};

export const DesktopNavContent = ({ user, isUnauthenticated, logout }: DesktopNavContentProps) => {
	const avatar = user?.avatarUrl ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${user.avatarUrl}` : '/user.png';

	return (
		<NavbarContent className="hidden sm:flex" justify="end">
			{isUnauthenticated ? (
				<>
                <NavbarItem>
						<Button as={Link} color="primary" href="/login" variant="light">
							Explore
						</Button>
					</NavbarItem>
					<NavbarItem>
						<Button as={Link} color="primary" href="/login" variant="bordered">
							Login
						</Button>
					</NavbarItem>
					<NavbarItem>
						<Button as={Link} color="primary" href="/signup" variant="solid">
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
						<DropdownItem isReadOnly showDivider key="profile" className="h-14 gap-2">
							<p className="font-semibold">Signed in as</p>
							<p className="text-primary">{user?.username}</p>
						</DropdownItem>
						<DropdownItem key="user" startContent={<UserCircle />} href={`/id/${user?.username}`}>
							Question Profile
						</DropdownItem>
						<DropdownItem key="settings" href={`/id/${user?.username}/setting`} startContent={<UserCircleGear />}>
							My Settings
						</DropdownItem>
						<DropdownItem key="logout" startContent={<SignOut />} onClick={logout}>
							<p className="font-semibold text-primary">Log Out</p>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			)}
		</NavbarContent>
	);
};