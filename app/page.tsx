import FAQ from '@/components/home/faq';
import { Features } from '@/components/home/features';
import { HeroComponent } from '@/components/home/hero';

export default function Home() {
	return (
		<>
			<HeroComponent />
			<Features />
			{/* <Statistics /> */}
			<FAQ/> 
		</>
	);
}
