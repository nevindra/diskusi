'use client';
import { UsersCard } from '@/components/explore/usersCard';
import type { UsersExplore } from '@/types/userType';
import { Card, CardBody } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
	const {
		data,
		isLoading,
		isError,
	}: {
		data: UsersExplore[] | undefined;
		isLoading: boolean;
		isError: boolean;
	} = useQuery({
		queryKey: ['explore'],
		queryFn: async () => {
			const res = await fetch('/api/users');
			const users: UsersExplore[] = await res.json();
			return users.sort((a, b) => b.questionCount - a.questionCount);
		},
	});
	return (
		<div className="flex flex-col items-center justify-center mt-3">
			<div className="flex flex-col my-10 items-center justify-center gap-3">
				<h1 className="text-4xl font-bold text-center">Explore</h1>
				<p className="text-center text-secondary text-base">
					Check all people that create profile in Komunal and see their profile.
				</p>
			</div>
			{isError ? (
				<Card className="flex flex-col items-center justify-center py-4 px-4">
					<p className="text-secondary text-center text-lg font-semibold mb-2">
						Error loading users
					</p>
					<p className="text-secondary text-center text-sm">
						Please try again later or contact the administrator.
					</p>
				</Card>
			) : isLoading ? (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card className="w-full p-5 bg-gray-100 rounded-lg shadow-md">
						<CardBody>
							<div className="flex items-center space-x-4">
								<div className="flex-shrink-0">
									<Skeleton className="w-12 h-12" />
								</div>
								<div className="flex-1 space-y-2">
									<Skeleton className="h-4 w-3/4" />
									<Skeleton className="h-4 w-1/2" />
								</div>
							</div>
						</CardBody>
					</Card>
					<Card className="w-full p-5 bg-gray-100 rounded-lg shadow-md">
						<CardBody>
							<div className="flex items-center space-x-4">
								<div className="flex-shrink-0">
									<Skeleton className="w-12 h-12" />
								</div>
								<div className="flex-1 space-y-2">
									<Skeleton className="h-4 w-3/4" />
									<Skeleton className="h-4 w-1/2" />
								</div>
							</div>
						</CardBody>
					</Card>
					<Card className="w-full p-5 bg-gray-100 rounded-lg shadow-md">
						<CardBody>
							<div className="flex items-center space-x-4">
								<div className="flex-shrink-0">
									<Skeleton className="w-12 h-12" />
								</div>
								<div className="flex-1 space-y-2">
									<Skeleton className="h-4 w-3/4" />
									<Skeleton className="h-4 w-1/2" />
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:max-w-[60%]">
					{data?.map((item, _index) => (
						<UsersCard
							key={item.username}
							username={item.username}
							avatarUrl={item.avatarUrl}
							bio={item.bio}
						/>
					))}
				</div>
			)}
		</div>
	);
}
