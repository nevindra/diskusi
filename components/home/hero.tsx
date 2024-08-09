import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import dynamic from 'next/dynamic';

const Image = dynamic(() => import('next/image'), { ssr: false });

export const HeroComponent = () => {
	return (
		<div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-12 px-4 md:px-12 lg:max-w-4xl mx-auto">
			<div className="w-full space-y-4 text-center">
				<h1 className="text-4xl lg:text-7xl font-black">
					Ask Your Friends <br />
					<span className="text-primary">Questions</span>
				</h1>
				<p className="text-xl lg:text-2xl py-1 w-[90%] text-center mx-auto">
					Connect with friends, ask questions, and get real answers.
				</p>
				<Button className='mt-4 text-md  lg:text-lg px-4 py-2 md:px-6 md:py-3' color='primary' variant='solid' as={Link} href='/signup'>
					Join Now
				</Button>
			</div>
		</div>
	);
};
