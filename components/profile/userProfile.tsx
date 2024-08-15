import { useProfileStore } from '@/state/profileState';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import { MapPin } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

import dynamic from 'next/dynamic';
const ShareButton = dynamic(
	() => import('@/components/profile/shareProfileModal'),
	{ ssr: false }
);

export const UserProfileBox = () => {
	const { profileUser } = useProfileStore();

	const avatar = profileUser.avatarUrl ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${profileUser.avatarUrl}` : '/unknown.png';

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
							<h2 className="text-xl font-bold">{profileUser.username}</h2>
							<p className="text-sm text-default-600 mt-1">
								{profileUser.bio || 'No bio yet, here to answer your questions!'}
							</p>
							<p className="text-sm text-default-500 flex items-center gap-1 mt-1">
								<MapPin /> Indonesia
							</p>
						</div>
						<div className="flex-shrink-0 ml-4">
							<ShareButton username={profileUser.username} />
						</div>
					</div>
				</CardBody>
			</Card>
		</>
	);
};
