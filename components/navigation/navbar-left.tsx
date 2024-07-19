
import { NavbarBrand, NavbarContent, NavbarMenuToggle } from "@nextui-org/navbar";
import Image from "next/image";
import NextLink from "next/link";

export const NavbarLeftComponent = ({isMenuOpen}:{isMenuOpen:boolean}) => {
    return (
        <>
        <NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
			</NavbarContent>

			<NavbarContent className="sm:hidden" justify="center">
				<NavbarBrand>
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Image
							src="/diskusi-logo.png"
							alt="Tanyakan.io"
							width={40}
							height={40}
						/>
						<p className="text-2xl font-bold text-primary">Diskusi</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Image
							src="/diskusi-logo.png"
							alt="Tanyakan.io"
							width={40}
							height={40}
						/>
						<p className="text-2xl font-bold text-primary">Diskusi</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
            </>
    );
}
