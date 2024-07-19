import { benefitsCopy } from "@/config/copywriting";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { UnbiasedIcon } from "../icons";
export const BenefitsComponent = () => {
	return (
		<div className="my-3 py-3">
            <h1 className="font-bold text-primary text-2xl md:text-3xl lg:text-4xl text-center">
				Features
			</h1>
			<p className="text-sm text-center m-2 md:text-base lg:text-xl">
				Features to unlock a world of knowledge and insights.
			</p>
			<div className="gap-4 grid grid-cols-1 mx-10 sm:grid-cols-2 lg:grid-cols-4 my-2 p-4 md:p-6 lg:p-8">
				{benefitsCopy.map((benefit, _index) => (
					<Card key={benefit.index} className="p-4 m-2 shadow-lg rounded-lg">
						<CardHeader className="text-primary font-bold text-lg md:text-xl lg:text-2xl">
							<UnbiasedIcon/>
						</CardHeader>
						<CardBody className=" text-sm md:text-base lg:text-lg">
							{benefit.body}
						</CardBody>
					</Card>
				))}
			</div>
        </div>
	);
};
