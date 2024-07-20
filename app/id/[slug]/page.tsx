'use client';

import { useSession } from '@/libs/hooks/useSession';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Textarea } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountHome() {
	const { user, isLoading, isUnauthenticated } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (isUnauthenticated) {
			router.push('/login');
		}
	}, [isUnauthenticated, router]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center mx-20 p-4 lg:p-8">
			{/* Main Card */}
			<Card className="flex flex-col max-w-[70%]  lg:flex-row lg:space-x-8 p-4 lg:p-8">
					{/* Left Side - Account Info */}
					<Card className="w-full lg:max-w-[45%] mb-6 lg:mb-0">
						<CardHeader className="justify-between">
							<div className="flex gap-5">
								<Avatar
									isBordered
									radius="full"
									size="md"
									src="https://nextui.org/avatars/avatar-1.png"
								/>
								<div className="flex flex-col gap-1 items-start justify-center">
									<h4 className="text-small font-semibold leading-none text-default-600">
										Nevindra
									</h4>
									<h5 className="text-small tracking-tight text-default-400">
										@nezhifi
									</h5>
								</div>
							</div>
							<Button
								className={'bg-secondary text-white border-default-200'}
								color="primary"
								radius="full"
								size="sm"
								variant={'bordered'}
							>
								Follow
							</Button>
						</CardHeader>
						<CardBody className="px-3 py-0 text-sm text-primary">
							<p>
							AI Product Manager that do little bit of everything. Join me on this coding adventure! AI Product Manager that do little bit of everything. Join me on this coding adventure
							</p>
						</CardBody>
						<CardFooter className="gap-3">
							<div className="flex gap-1">
								<p className="font-semibold text-default-400 text-small">4</p>
								<p className=" text-default-400 text-small">Following</p>
							</div>
							<div className="flex gap-1">
								<p className="font-semibold text-default-400 text-small">
									97.1K
								</p>
								<p className="text-default-400 text-small">Followers</p>
							</div>
						</CardFooter>
					</Card>
					{/* Right Side - Question Box */}
					<div className="flex flex-col w-full lg:w-2/3">
						<div className="mb-3">
							<Textarea
								key={1}
								variant={'bordered'}
								label="Pertanyaan"
								labelPlacement="inside"
								placeholder="Masukan pertanyaan kamu"
								className="w-full"
							/>
						</div>
						<div className='flex justify-end'>
						<Button
							className="w-2"
							color="secondary"
							variant="bordered"
						>
							Kirim
						</Button>
						</div>
					</div>
				</Card>
		</div>
	);
}
