import { Button } from '@nextui-org/button';
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
import { Copy, Export } from '@phosphor-icons/react/dist/ssr';
import { useCallback } from 'react';

const ShareButton = ({ username }: { username: string }) => {
	const { isOpen, onOpenChange } = useDisclosure();
	const shareLink = `${window.location.origin}/profile/${username}`;

	const copyToClipboard = useCallback(() => {
		navigator.clipboard.writeText(shareLink);
	}, [shareLink]);

	return (
		<>
			<Button
				color="primary"
				size='sm'
				onPress={onOpenChange}
				variant="light"
				className="text-sm"
			>
				<Export size={17} className="text-primary" />
			</Button>
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

export default ShareButton;