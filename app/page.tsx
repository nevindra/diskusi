import { BenefitsComponent } from "@/components/home/benefits";
import { HeroComponent } from "@/components/home/hero";
import { Statistics } from "@/components/home/statistics";
export default function Home() {
	return (
		<>
			<HeroComponent />
			<BenefitsComponent />
			<Statistics/>
		</>
	);
}
