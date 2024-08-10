import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import Link from 'next/link';

export const UsersCard = ({
	username,
	avatarUrl,
	bio,
}: { username: string; avatarUrl: string; bio: string }) => {
	const avatar = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${avatarUrl}`;
	return (
		<>
			<Card key={username}>
				<CardBody>
					{/* <Image/> */}
					<div className="flex justify-center r">
						<Avatar
							src={avatarUrl ? avatar : null}
							className="w-12 h-12 items-center justify-center rounded-full"
							size="sm"
							alt="Profile"
						/>{' '}
					</div>
					<p className="text-base text-primary text-center font-semibold">
						<Link href={`/id/${username}`}>{username}</Link>
					</p>
					<p className="text-sm text-secondary text-center">
						{bio ? bio : 'No bio provided'}
					</p>
				</CardBody>
			</Card>
		</>
	);
};
