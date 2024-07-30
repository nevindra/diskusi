import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import Image from 'next/image';
export const UserProfileBox = ({ username }: { username: string }) => {
	// const queryClient = useQueryClient();
	// const {
	// 	data: userProfile,
	// 	isLoading,
	// 	error,
	// } = useQuery({
	// 	queryKey: ['users', username],
	// 	queryFn: async () => {
	// 		try {
	// 			return await getUserByUsername({ username });
	// 		} catch (error) {
	// 			console.error('Error fetching user profile:', error);
	// 			throw error;
	// 		}
	// 	},
	// 	staleTime: 5 * 60 * 1000, // Data will be considered fresh for 5 minutes
	// 	gcTime: 30 * 60 * 1000, // Cache data for 30 minutes (formerly cacheTime)
	// 	refetchOnWindowFocus: true, // Enable refetch on window focus for up-to-date data
	// 	refetchOnMount: false, // Disable refetch on component mount
	// 	retry: 3, // Retry failed requests up to 3 times
	// 	initialData: () => {
	// 		// Check if we have cached data
	// 		return queryClient.getQueryData(['users', username]);
	// 	},
	// });

	return (
		<Card className="w-full p-0 overflow-hidden">
			{/* Background Image */}
			<div className="relative h-32">
				<Image
					src="/bg.jpg"
					alt="Profile background"
					layout="fill"
					objectFit="cover"
				/>
			</div>

			<CardBody className="relative px-4 py-4">
				{/* Avatar */}
				<Avatar
					isBordered
					radius="full"
					size="lg"
					src="/user.png"
					className="absolute border-1 border-secondary"
				/>

				{/* User Info */}
				<div className="mt-12">
					<h2 className="text-xl mt-4 font-bold">{username}</h2>
					<p className="text-sm text-default-600 mt-1">
						Hi! Welcome to my profile. Ask me anything about my work or
						interests.
					</p>
					<p className="text-sm text-default-500 flex items-center gap-1 mt-1">
						<LocationIcon /> Indonesia
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

// LocationIcon component remains unchanged

// You'll need to create or import a LocationIcon component
const LocationIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
		<circle cx="12" cy="10" r="3"></circle>
	</svg>
);
