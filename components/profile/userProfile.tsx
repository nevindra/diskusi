import { getUserByUsername } from '@/handlers/userHandlers';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/modal';
import { Copy, Export, MapPin } from '@phosphor-icons/react/dist/ssr';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useCallback } from 'react';

export const UserProfileBox = ({
	username,
	onToggleQuestionBox,
	isSingleQuestion,
}: { username: string; onToggleQuestionBox: () => void, isSingleQuestion: boolean }) => {
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
	const { isOpen, onOpenChange } = useDisclosure();
	const shareLink = `${window.location.origin}/profile/${username}`;

	const copyToClipboard = useCallback(() => {
		navigator.clipboard.writeText(shareLink);
	}, [shareLink]);

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
					<div>
						<h2 className="text-xl font-bold">{user?.username}</h2>
						<p className="text-sm text-default-600 mt-1">{user?.bio}</p>
						<p className="text-sm text-default-500 flex items-center gap-1 mt-1">
							<MapPin /> Indonesia
						</p>
					</div>

					{/* Buttons */}
					{!isSingleQuestion ? (
						<div className="flex gap-2 mt-4">
						<Button
							color="primary"
							variant="solid"
							fullWidth
							onClick={onToggleQuestionBox}
							className="text-sm w-3/4"
						>
							Ask Question
						</Button>
						<Button
							color="secondary"
							onPress={onOpenChange}
							variant="light"
							className="text-sm w-1/4"
						>
							<Export size={15} className="text-primary" />
						</Button>
					</div>
					) : ''}
				</CardBody>
			</Card>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size="lg"
				className="max-w-[90vw] sm:max-w-xl"
				placement="center"
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1 text-lg sm:text-xl">
						Quick Share
					</ModalHeader>
					<ModalBody>
						<Input
							label="Share link"
							readOnly
							size="sm"
							value={shareLink}
							endContent={
								<Button
									variant="bordered"
									color="primary"
									size="sm"
									onClick={copyToClipboard}
								>
									<Copy size={15} />
								</Button>
							}
						/>
						<Divider />
					</ModalBody>
					<ModalFooter>
						<Button
							color="danger"
							variant="light"
							onPress={onOpenChange}
							size="sm"
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
