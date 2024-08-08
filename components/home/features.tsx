import { benefitsCopy } from "@/config/copywriting";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export const Features = () => {
	return (
		<div className="my-3 py-3">
            <h1 className="font-bold text-2xl lg:text-3xl text-center">
				Features Highlight
			</h1>
			<p className="text-sm text-center mt-3 md:text-base lg:text-lg">
				A variety of features to help you get the best answers.
			</p>
			<div className=" justify-center mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 my-2 p-4 md:p-6 lg:p-8 lg:max-w-4xl">
				{benefitsCopy.map((benefit, _index) => (
					<Card key={benefit.index} className="p-4 bg-primary shadow-lg rounded-lg ">
						<CardHeader className="text-white font-bold text-lg lg:text-xl">
							{benefit.header}
						</CardHeader>
						<CardBody className="text-white font-thin text-sm md:text-base lg:text-lg">
							{benefit.body}
						</CardBody>
					</Card>
				))}
			</div>
        </div>
	);
};
