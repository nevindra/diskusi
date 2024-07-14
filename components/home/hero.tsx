import { subtitle, title } from "@/components/primitives";
import { Card } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
export const HeroComponent = () => {
	return (
		<Card 
        className="flex flex-col items-center justify-center gap-4 mt-4 py-8 md:py-10 lg:py-12 lg:mx-3 bg-[#eff0f3]/20 rounded-lg"
        shadow="lg">
			<div className="inline-block max-w-lg text-center justify-center px-4 md:px-6 lg:px-8">
				{/* Find Answers. Share Knowledge. Grow Together. */}
				<h1 className={title()}>Find </h1>
				<h1 className={title({ color: "orangeFade" })}>Answers.&nbsp;</h1>
				<br />
				<h1 className={title()}>Share </h1>
				<h1 className={title({ color: "orangeFade" })}>Knowledge.&nbsp;</h1>
				<br />
				<h1 className={title()}>Grow </h1>
				<h1 className={title({ color: "orangeFade" })}>Together.&nbsp;</h1>
				<br />
				<h2 className={subtitle({ class: "mt-4 text-sm md:text-base lg:text-lg" })}>
					Get the insights you need, anonymously or publicly. Share your
					expertise and help others.{" "}
				</h2>
			</div>
			<Link className="text-primary text-sm md:text-base lg:text-lg" href="/signup">
				Join the conversation <span className="ml-1"><FaArrowAltCircleRight /></span>
			</Link>
		</Card>
	);
};