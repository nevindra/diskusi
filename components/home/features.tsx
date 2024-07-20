import { benefitsCopy } from "@/config/copywriting";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
export const Features = () => {
	return (
		<div className="my-3 py-3">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center">
				Fitur Aplikasi
			</h1>
			<p className="text-sm text-center mt-3 md:text-base lg:text-xl">
				Berbagai fitur yang membantu Anda mendapatkan jawaban yang terbaik.
			</p>
			<div className=" justify-center mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 my-2 p-4 md:p-6 lg:p-8 md:max-w-[72rem]">
				{benefitsCopy.map((benefit, _index) => (
					<Card key={benefit.index} className="p-4 bg-cardBackground shadow-lg rounded-lg">
						<CardHeader className="text-primary font-bold text-lg lg:text-2xl">
							{benefit.header}
						</CardHeader>
						<CardBody className="text-primary text-sm md:text-base lg:text-lg">
							{benefit.body}
						</CardBody>
					</Card>
				))}
			</div>
        </div>
	);
};
