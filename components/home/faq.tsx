'use client';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Divider } from '@nextui-org/divider';

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
						in the provided text box hit "Send".
					</p>
				</AccordionItem>
				<AccordionItem key="3" aria-label="Accordion 3" className='font-semibold' title="How can I answer a question?">
					<p className='font-thin'>
                    You should login to your account and click "Comments" in each question box.
                    </p>
				</AccordionItem>
                <AccordionItem key="4" aria-label="Accordion 4" className='font-semibold' title="Is this the final version of the application?">
					<p className='font-thin'>
                    No, this application is still in BETA stage. We will update the platform regularly.
                    </p>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
