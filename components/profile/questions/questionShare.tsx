import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Input } from '@nextui-org/input';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/modal';
import { useEffect, useState } from 'react';

export const ShareModal = ({
	isOpen,
	onClose,
	questionId,
	questionContent,
	username,
}: {isOpen: boolean, onClose: () => void, questionId: string, questionContent: string, username: string | undefined}) => {
	console.log('username', username);
	const [shareUrl, setShareUrl] = useState('');
	const [ogImageUrl, setOgImageUrl] = useState('');

	useEffect(() => {
		if (isOpen) {
			const url = `${window.location.origin}/id/${username}/question/${questionId}`;
			setShareUrl(url);
			setOgImageUrl(
				`${window.location.origin}/og?question=${encodeURIComponent(questionContent)}`
			);
		}
	}, [isOpen, username, questionId, questionContent]);

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
		} catch (error) {
			console.error('Failed to copy link:', error);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="lg"
			className="max-w-[90vw] sm:max-w-xl"
		>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1 text-lg sm:text-xl">
					Share this question
				</ModalHeader>
				<ModalBody>
					<Input
						label="Share link"
						value={shareUrl}
						readOnly
						size="sm"
						endContent={
							<Button color="primary" size="sm" onClick={handleCopyLink}>
								Copy
							</Button>
						}
					/>
					<p className="text-xs sm:text-sm text-default-500 mt-2">Preview:</p>
					<div className="mt-2 border rounded-lg overflow-hidden">
						<Image
							src={ogImageUrl}
							alt="OG Image Preview"
							width={600}
							height={315}
							className="w-full h-auto"
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" variant="light" onPress={onClose} size="sm">
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
