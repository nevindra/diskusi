import { Card, CardBody } from "@nextui-org/card";
import { BookOpen, ShieldCheck, ThumbsUp, UsersFour } from '@phosphor-icons/react/dist/ssr';

export const Features = () => {
	return (
		<div className=" py-3">
			<h1 className="font-bold text-2xl lg:text-3xl text-center">
				Features Highlight
			</h1>
			<p className="text-sm text-center mt-3 md:text-base lg:text-lg">
				A variety of features to help you get the best answers.
			</p>
			<div className="justify-center mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 my-2 p-4 md:p-6 lg:p-8 lg:max-w-4xl">
				<Card className="p-4 bg-primary shadow-lg rounded-lg">
					<CardBody className="text-white text-center sm:text-left flex flex-col items-center sm:items-start">
						<UsersFour size={32} className="mb-2" />
						<p className="font-bold text-lg lg:text-xl">Open Community</p>
						<p className="font-light text-base lg:text-lg">
							Join a welcoming community always ready to help answer your questions.
						</p>
					</CardBody>
				</Card>

				<Card className="p-4 bg-primary shadow-lg rounded-lg">
					<CardBody className="text-white text-center sm:text-left flex flex-col items-center sm:items-start">
						<BookOpen size={32} className="mb-2" />
						<p className="font-bold text-lg lg:text-xl">Diverse Topics</p>
						<p className="font-light text-base lg:text-lg">
							From personal queries to hobbies, discuss a wide range of topics here.
						</p>
					</CardBody>
				</Card>

				<Card className="p-4 bg-primary shadow-lg rounded-lg">
					<CardBody className="text-white text-center sm:text-left flex flex-col items-center sm:items-start">
						<ShieldCheck size={32} className="mb-2" />
						<p className="font-bold text-lg lg:text-xl">Privacy Ensured</p>
						<p className="font-light text-base lg:text-lg">
							Ask questions with confidence, knowing your identity is protected.
						</p>
					</CardBody>
				</Card>

				<Card className="p-4 bg-primary shadow-lg rounded-lg">
					<CardBody className="text-white text-center sm:text-left flex flex-col items-center sm:items-start">
						<ThumbsUp size={32} className="mb-2" />
						<p className="font-bold text-lg lg:text-xl">Top Answer Ratings</p>
						<p className="font-light text-base lg:text-lg">
							Upvote the best answers to highlight quality content.
						</p>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};