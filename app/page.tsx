import dynamic from 'next/dynamic';

const HeroComponent = dynamic(() => import('@/components/home/hero').then(mod => mod.HeroComponent), { ssr: true });
const Features = dynamic(() => import('@/components/home/features').then(mod => mod.Features), { ssr: true });
const Statistics = dynamic(() => import('@/components/home/statistics').then(mod => mod.Statistics), { ssr: false });

export default function Home() {
	return (
		<>
			<HeroComponent />
			<Features />
			<Statistics />
		</>
	);
}
