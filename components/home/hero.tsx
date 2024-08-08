import heroSVG from '@/public/hero.svg';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import dynamic from 'next/dynamic';

const Image = dynamic(() => import('next/image'), { ssr: false });

export const HeroComponent = () => {
	return (
		<div className="flex flex-col lg:flex-row items-center justify-between gap-8 mx-10 py-12 px-4 md:px-12 ">
			<div className="w-full lg:w-1/2">
				<Image
					src={heroSVG}
					alt="hero"
					width={300}
					height={300}
					className="w-full h-auto max-w-[500px] mx-auto"
				/>
			</div>
			<div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left lg:mr-[3rem]">
				<h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
					Find <span className="text-primary">Answers</span>,
					<br />
					Share <span className="text-primary">Knowledge</span>!
				</h1>
				<p className="text-base md:text-lg py-1 w-full text-center lg:text-left">
					A platform to ask and get answers from various topics.
					Explore new knowledge every day.{' '}
				</p>
				<Button
					className="mt-4 text-sm md:text-base lg:text-lg px-4 py-2 md:px-6 md:py-3"
					color="primary"
					variant="solid"
					as={Link}
					href='/signup'
				>
					Join Now
				</Button>
			</div>
		</div>
	);
};
