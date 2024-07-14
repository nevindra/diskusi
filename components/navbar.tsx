"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const NavbarComponent = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const isSignupPage = pathname === "/signup";

	if (isSignupPage) {
		return null;
	}
	return (
		<NextUINavbar maxWidth="xl" position="sticky" isBordered>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="lg:hidden"
				/>
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-inherit text-md">Tanyakan.io</p>
					</NextLink>
				</NavbarBrand>
				{/* <ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium",
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul> */}
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem className="hidden md:flex">
					<Link href="#">Sign in</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href="/signup" variant="bordered">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent>

			{!isSignupPage && <NavbarMenu>
				{siteConfig.navMenuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={
								index === 2
									? "primary"
									: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
							}
							className="w-full"
							href="#"
							size="lg"
						>
							{item.label}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>}
		</NextUINavbar>
	);
};
