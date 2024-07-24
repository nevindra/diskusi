import heroSVG from '@/public/hero.svg';
import { Button } from '@nextui-org/button';
import Image from 'next/image';

export const HeroComponent = () => {
	return (
		<div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-12 px-4 md:px-12">
			<div className="w-full lg:w-1/2">
				<Image
					src={heroSVG}
					alt="hero"
					width={500}
					height={500}
					className="w-full h-auto max-w-[500px] mx-auto"
				/>
			</div>
			<div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left lg:mr-[3rem]">
				<h1 className="text-3xl md:text-4xl font-bold">
					Temukan <span className="text-secondary">Jawaban</span>, Bagikan{' '}
					<span className="text-secondary">Pengetahuan</span>!
				</h1>
				<p className="text-sm md:text-base lg:text-xl py-1 w-full text-center lg:text-left">
					Platform untuk bertanya dan mendapatkan jawaban dari berbagai topik.
					Jelajahi pengetahuan baru setiap hari.{' '}
				</p>
				<Button 
					className="mt-4 text-sm md:text-base lg:text-lg px-4 py-2 md:px-6 md:py-3" 
					color="secondary" 
					variant="bordered"
				>
					Gabung Sekarang
				</Button>
			</div>
		</div>
	);
};
