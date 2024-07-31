import { benefitsCopy } from "@/config/copywriting";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
export const Features = () => {
	return (
		<div className="my-3 py-3">
            <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center">
				Fitur Aplikasi
			</h1>
			<p className="text-sm text-center mt-3 md:text-base lg:text-lg">
				Berbagai fitur yang membantu Anda mendapatkan jawaban yang terbaik.
			</p>
			<div className=" justify-center mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 my-2 p-4 md:p-6 lg:p-8 md:max-w-[72rem]">
				{benefitsCopy.map((benefit, _index) => (
					<Card key={benefit.index} className="p-4 bg-secondary shadow-lg rounded-lg ">
						<CardHeader className="text-white font-bold text-lg lg:text-xl">
							{benefit.header}
						</CardHeader>
						<CardBody className="text-white text-sm md:text-base lg:text-lg">
							{benefit.body}
						</CardBody>
					</Card>
				))}
			</div>
        </div>
	);
};
