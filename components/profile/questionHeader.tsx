import { deleteQuestion } from '@/handlers/questionHandlers';
// 1. QuestionHeader: For the user avatar and post metadata
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { CardHeader } from '@nextui-org/card';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/modal';
import { Trash } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useState } from 'react';

export const QuestionHeader = ({
	posterId,
	posterUsername,
	createdAt,
	username,
	questionId,
	user,
}: {
	posterId: string | null;
	posterUsername: string;
	createdAt: string;
	username: string;
	user: string | null | undefined;
	questionId: string;
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const isUser = user === username;
	const queryClient = useQueryClient();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const mutation = useMutation({
		mutationFn: () => deleteQuestion(questionId),
		onSuccess: () => {
			onOpenChange();
			queryClient.invalidateQueries({ queryKey: ['questions', username] });
		},
		onError: (error) => {
			setErrorMessage(error.message);
		},
	});

	const onDelete = () => {
		mutation.mutate();
	};

	return (
		<CardHeader className="grid grid-cols-2 gap-2 items-center pb-2">
			<div className="flex items-center space-x-2 xs:space-x-4">
				<Avatar radius="full" size="sm" src="/user.png" />
				<div>
					<p className="font-semibold text-primary text-sm sm:text-base">
						{posterId === null ? 'Anonymous' : posterUsername}
					</p>
					<p className="text-xs sm:text-sm text-default-500">
						{formatDistanceToNow(parseISO(createdAt), {
							addSuffix: true,
						})}
					</p>
				</div>
			</div>
			{isUser && (
				<div className="flex justify-end">
					<Button onPress={onOpen} variant="light" color="primary" size="sm">
						<Trash size={15} />
					</Button>
					<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Delete Question
									</ModalHeader>
									<ModalBody>
										<p>Are you sure you want to delete this question?</p>
										{errorMessage && (
											<p className="text-danger text-center">{errorMessage}</p>
										)}
									</ModalBody>
									<ModalFooter>
										<Button color="primary" variant="light" onPress={onClose}>
											Cancel
										</Button>
										<Button color="danger" onPress={onDelete}>
											Delete
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			)}
		</CardHeader>
	);
};
