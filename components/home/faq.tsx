'use client';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Divider } from '@nextui-org/divider';
import Link from 'next/link';

export default function FAQ() {
	return (
		<div className="my-8 px-4 lg:max-w-3xl mx-auto">
			<Divider />
			<h1 className="font-bold mt-[2rem] text-xl md:text-2xl lg:text-3xl text-center mb-8">
				Frequently Asked Question
			</h1>
			<Accordion variant="shadow">
				<AccordionItem
					key="1"
					aria-label="Accordion 1"
					className="font-semibold"
					title="What is the purpose of this platform?"
				>
					<p className="font-light">
						The platform allows users to ask questions, share knowledge, and
						engage in discussions on a wide range of topics. It aims to create a
						community-driven space for learning and sharing insights.
					</p>
				</AccordionItem>
				<AccordionItem
					key="2"
					aria-label="Accordion 2"
					className="font-semibold"
					title="How do I ask a question?"
				>
					<p className="font-thin">
						To ask a question, search for the user profile, enter your question
						in the provided text box hit "Send". And don't worry you don't need
						to login to ask a question.
					</p>
				</AccordionItem>
				<AccordionItem
					key="3"
					aria-label="Accordion 3"
					className="font-semibold"
					title="How can I answer a question?"
				>
					<p className="font-thin">
						You should login to your account and click "Comments" in each
						question box.
					</p>
				</AccordionItem>
				<AccordionItem
					key="4"
					aria-label="Accordion 4"
					className="font-semibold"
					title="Is this application free?"
				>
					<p className="font-thin">
						Yes, Komunal is free to use. We may offer in-app purchases for
						additional features or premium services in the future.
					</p>
				</AccordionItem>
				<AccordionItem
					key="5"
					aria-label="Accordion 5"
					className="font-semibold"
					title="Is this the final version of the application?"
				>
					<p className="font-thin">
						No, this application will continue to evolve and improve based on
						user feedback. We're actively working on adding new features and
						enhancing the user experience.
					</p>
				</AccordionItem>
				<AccordionItem
					key="6"
					aria-label="Accordion 6"
					className="font-semibold"
					title="How can I provide feedback on the app?"
				>
					<p className="font-thin">
						We value your feedback! You can share your thoughts and suggestions
						by check this <Link className='text-primary-400 font-medium' href='https://komunal.featurebase.app/'>here</Link> and fill your ideation.
					</p>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
