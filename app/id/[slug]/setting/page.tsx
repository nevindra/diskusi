'use client';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Input, Textarea } from '@nextui-org/input';
import { FloppyDisk } from '@phosphor-icons/react/dist/ssr';
export default function AccountSettings() {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">Account Settings</h1>
				<Card className="p-6">
					<Accordion defaultExpandedKeys={['1']}>
						<AccordionItem
							key="1"
							aria-label="Accordion 1"
							title="Personal Information"
						>
							<div className="flex flex-col">
								<div className="flex flex-col items-center justify-center">
									<Avatar src="/user.png" className="w-32 h-32 text-large" />
									<Button className="mt-4 text-sm">Upload a picture</Button>
								</div>
								<div className="mt-2">
									<h1 className='mb-2'>Your Bio</h1>
									<Textarea
										placeholder="Anthony Webb"
										className="mb-4"
										variant='bordered'
										/>
								</div>
								<div className='flex justify-end m-2 space-x-4'>
								<Button className='text-sm' color="danger" type="button" variant="light" startContent={<FloppyDisk />}>
										Reset
									</Button>
								<Button className='text-sm' color="primary" type="button" variant="solid" startContent={<FloppyDisk />}>
										Save
									</Button>
								</div>
							</div>
						</AccordionItem>
						<AccordionItem
							key="2"
							aria-label="Accordion 2"
							title="Account Settings"
						>
							<div>
								<Input
									label="Your Name"
									placeholder="Anthony Webb"
									className="mb-4"
								/>
								<Input
									label="Password"
									type="password"
									placeholder="••••••••"
									className="mb-4"
								/>
								<Input
									label="Email Address"
									placeholder="myemail@address.com"
									className="mb-4"
								/>
								<div className="flex justify-end mt-6 space-x-4">
									<Button color="primary" type="button" variant="bordered">
										Cancel
									</Button>
									<Button color="primary">Save</Button>
								</div>
							</div>
						</AccordionItem>
					</Accordion>
				</Card>
			</div>
		</div>
	);
}
