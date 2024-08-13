import { getUserByUsername } from '@/handlers/userHandlers';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import { MapPin } from '@phosphor-icons/react/dist/ssr';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import dynamic from 'next/dynamic';
const ShareButton = dynamic(
	() => import('@/components/profile/shareProfileModal'),
	{ ssr: false }
);

export const UserProfileBox = ({
	username,
}: {
	username: string;
	isSingleQuestion: boolean;
}) => {
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
		<>
			<Card className="w-full p-0 overflow-hidden">
				<div className="relative shadow-lg">
					{/* Background Image */}
					<div className="h-32">
						<Image
							src="/flux.svg"
							alt="Profile background"
							fill
							style={{ objectFit: 'cover' }}
							priority={true}
							sizes="100vw"
						/>
					</div>

					{/* Avatar */}
					<Avatar
						isBordered
						radius="full"
						size="lg"
						src={avatar}
						className="absolute -bottom-8 left-4 border-4 border-background z-10"
					/>
				</div>

				<CardBody className="px-4 pt-10 pb-4">
					{/* User Info */}
					<div className="flex">
						<div className="flex-grow">
							<h2 className="text-xl font-bold">{user?.username}</h2>
							<p className="text-sm text-default-600 mt-1">
								{user?.bio || 'No bio yet, here to answer your questions!'}
							</p>
							<p className="text-sm text-default-500 flex items-center gap-1 mt-1">
								<MapPin /> Indonesia
							</p>
						</div>
						<div className="flex-shrink-0 ml-4">
							<ShareButton username={username} />
						</div>
					</div>
				</CardBody>
			</Card>
		</>
	);
};
