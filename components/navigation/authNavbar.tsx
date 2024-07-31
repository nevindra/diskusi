import type { UserType } from '@/types/userType';
import { Avatar } from '@nextui-org/avatar';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/dropdown';
import { NavbarContent } from '@nextui-org/navbar';
import { SignOut, UserCircle, UserCircleGear } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
export const AuthenticatedNavbar = ({
	user,
	logout,
}: { user: UserType | null; logout: () => void }) => {
	const router = useRouter();
	async function handleLogout() {
		await logout();
		// localStorage.removeItem('isAuthenticated');
		// localStorage.removeItem('user');
		router.push('/login');
	}
	return (
		<>
			<NavbarContent as="div" justify="end">
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Avatar
							isBordered
							as="button"
							className="transition-transform"
							color="secondary"
							name="Jason Hughes"
							size="sm"
							src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem
							isReadOnly
							showDivider
							key="profile"
							className="h-14 gap-2"
						>
							<p className="font-semibold">Signed in as</p>
							<p className=" text-secondary">{user?.username}</p>
						</DropdownItem>
						<DropdownItem
							key="user"
							startContent={<UserCircle />}
							href={`${process.env.NEXT_PUBLIC_BASE_URL}/id/${user?.username}`}
						>
							My Profile
						</DropdownItem>
						<DropdownItem key="settings" href={`${process.env.NEXT_PUBLIC_BASE_URL}/id/${user?.username}/setting`} startContent={<UserCircleGear />}>
							My Settings
						</DropdownItem>
						<DropdownItem
							key="logout"
							startContent={<SignOut />}
							onClick={handleLogout}
						>
							<p className="font-semibold text-secondary">Log Out</p>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
		</>
	);
};
