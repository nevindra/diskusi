import { Link } from "@nextui-org/link";

export const FooterComponent = () => {
	return (
		<footer className="w-full flex flex-col items-center justify-center py-3 text-sm">
			<div className="mb-2">
				© {new Date().getFullYear()} <Link href="https://x.com/nezhifi" isExternal className="text-primary">Nevindra</Link>. <span className="text-secondary text-base">All rights reserved.</span>
			</div>
			<div>
				{/* <Link href="/terms" className="mr-4">Terms of Service</Link> */}
				{/* <Link href="/privacy" className="mr-4">Privacy Policy</Link> */}
				<Link href='https://komunal.featurebase.app/'>Roadmap & Request</Link>
			</div>
		</footer>
	);
};