import { getUserByUsername } from '@/handlers/userHandlers';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import { MapPin } from '@phosphor-icons/react/dist/ssr';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export const UserProfileBox = ({ username }: { username: string }) => {

	const { data: user } = useQuery({
		queryKey: ['userProfile', username],
		queryFn: () => getUserByUsername(username),
		enabled: !!username,
		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		refetchOnReconnect: false,
		retry: 3,
	});

	const avatar = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${user?.avatarUrl}`;

	return (
		<Card className="w-full p-0overflow-hidden">
			{/* Background Image */}
			<div className="relative h-32">
				<Image
					src="/bg.jpg"
					alt="Profile background"
					fill
					style={{ objectFit: 'cover' }}
					sizes="100vw"
				/>
			</div>

			<CardBody className="relative px-4 py-4">
				{/* Avatar */}
				<Avatar
					isBordered
					radius="full"
					size="lg"
					src={avatar}
					className="absolute border-1 border-primary"
				/>

				{/* User Info */}
				<div className="mt-12">
					<h2 className="text-xl mt-4 font-bold">{user?.username}</h2>
					<p className="text-sm text-default-600 mt-1">
						{user?.bio}
					</p>
					<p className="text-sm text-default-500 flex items-center gap-1 mt-1">
						<MapPin /> Indonesia
					</p>
				</div>

				{/* Followers and Connections */}
				{/* <div className="flex gap-4 mt-3">
					<p className="text-sm">
						<span className="font-semibold">6,476</span> followers
					</p>
					<p className="text-sm">
						<span className="font-semibold">500+</span> connections
					</p>
				</div> */}

				{/* Buttons */}
				{/* <div className="flex gap-2 mt-4">
					<Button color="primary" variant="solid" fullWidth>
						Follow
					</Button>
					<Button color="primary" variant="bordered" fullWidth>
						More
					</Button>
				</div> */}
			</CardBody>
		</Card>
	);
};
