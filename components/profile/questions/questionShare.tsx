import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Image } from '@nextui-org/image';
import { Input } from '@nextui-org/input';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/modal';
import { Download } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

export const ShareModal = ({
	isOpen,
	onClose,
	questionId,
	questionContent,
	username,
}: {
	isOpen: boolean;
	onClose: () => void;
	questionId: string;
	questionContent: string;
	username: string | undefined;
}) => {
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

	const handleDownloadImage = async () => {
		try {
			const response = await fetch(ogImageUrl);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `question_${questionId}_preview.png`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error('Failed to download image:', error);
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
					<Divider />
					<div className="flex flex-row justify-between">
						<p className="text-xs sm:text-sm text-default-500 mt-2">Preview:</p>
						<Button
							color="primary"
							size="sm"
							onClick={handleDownloadImage}
							className="mt-2"
							variant='light'
						>
							<Download size={15} />
						</Button>
					</div>
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
