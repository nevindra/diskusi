import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Input } from '@nextui-org/input';

export default function AccountSettings() {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">Account Settings</h1>
				<Card className="p-6">
					<div className="flex flex-col space-y-6">
						{/* Photo upload section */}
						<div className="flex flex-col items-center justify-center">
							<Avatar
								src="/user.png"
								className="w-32 h-32 text-large"
							/>
							<Button className="mt-4">Upload a picture</Button>
						</div>

						{/* Data change section */}
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
							<a href="#" className="text-blue-500 hover:underline">
								Change
							</a>
							<div className="mt-6">
								<a href="#" className="text-red-500 hover:underline">
									Delete Your Account
								</a>
								<p className="text-sm text-gray-500 mt-1">
									You will receive an email to confirm your decision.
									<br />
									Please note, that all boards you have created will be
									permanently erased.
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-end mt-6 space-x-4">
						<Button color="primary" type="button" variant='bordered'>Cancel</Button>
						<Button color="secondary">Save</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}