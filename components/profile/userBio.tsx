import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';

export const UserBio = () => {
	return (
        <Card className="w-full lg:w-2/4 mb-3 lg:mb-0 p-2">
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
							Ikuti
						</Button>
					</CardHeader>
					{/* User Bio */}
                    {/* TODO:
                        1. Add validation for length
                    */}
					<CardBody className="px-3 py-0 text-sm text-primary h-18 overflow-hidden">
						<p className="line-clamp-4">
							AI Product Manager that do little bit of everything. Join me on
							this coding adventure!
						</p>
					</CardBody>
					<CardFooter className="gap-3">
						<div className="flex gap-1">
							<p className="font-semibold text-default-400 text-small">4</p>
							<p className=" text-default-400 text-small">Following</p>
						</div>
						<div className="flex gap-1">
							<p className="font-semibold text-default-400 text-small">97.1K</p>
							<p className="text-default-400 text-small">Followers</p>
						</div>
					</CardFooter>
				</Card>
    );
};