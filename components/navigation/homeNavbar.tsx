import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";

export const HomeNavbar = () => {
	return (
		<NavbarContent className="hidden sm:flex" justify="end">
			<NavbarItem>
				<Link href="/login">Sign in</Link>
			</NavbarItem>
			<NavbarItem>
				<Button as={Link} color="primary" href="/signup" variant="bordered">
					Sign Up
				</Button>
			</NavbarItem>
		</NavbarContent>
	);
};
