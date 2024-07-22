import { useSession } from "@/hooks/useSession";
import { Avatar } from "@nextui-org/avatar";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarContent } from "@nextui-org/navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { GrUserSettings } from "react-icons/gr";


export const AuthenticatedNavbar = () => {
	const { user, logout, isUnauthenticated } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (isUnauthenticated) {
			router.push("/login");
		}
	}, [isUnauthenticated, router]);

	return (
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
					<DropdownItem isReadOnly showDivider key="profile" className="h-14 gap-2">
						<p className="font-semibold">Signed in as</p>
						<p className=" text-secondary">{user?.user_metadata.display_name}</p>
					</DropdownItem>
					<DropdownItem key="settings" startContent={<GrUserSettings />}>My Settings</DropdownItem>
					<DropdownItem key="logout" startContent={<BiLogOut />} onClick={logout}>
						<p className="font-semibold text-secondary">Log Out</p>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</NavbarContent>
	);
};
