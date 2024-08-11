import { Link } from '@nextui-org/link';

export const FooterComponent = () => {
	return (
		<footer className="w-full flex flex-col items-center justify-center py-3 mt-4 text-sm text-white bg-primary">
			<div className="mb-2">
				© {new Date().getFullYear()}{' '}
				<Link href="https://x.com/nezhifi" isExternal className="text-white">
					Nevindra
				</Link>
				. All rights reserved.
			</div>
			<div className="flex flex-row gap-2 justify-between">
				<Link href="/terms-of-use" className=" text-white text-base xs:text-sm">
					Terms of Service
				</Link>
				<Link href="/privacy-policy" className="text-white text-base xs:text-sm">
					Privacy Policy
				</Link>
				<Link
					href="https://komunal.featurebase.app/"
					isExternal
					className="text-white text-base xs:text-sm"
				>
					Report a bug
				</Link>
			</div>
		</footer>
	);
};
