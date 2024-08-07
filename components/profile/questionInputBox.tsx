'use client';
import {
	type QuestionFormData,
	QuestionSchema,
	postQuestion,
} from '@/handlers/questionHandlers';
import { usePastedImages } from '@/hooks/usePasteImage';
import { useTempQuestionStore } from '@/state/questionState';
import type { UserType } from '@/types/userType';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import Image from 'next/image';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const QuestionBox = ({
	username,
	onQuestionAdded,
	user,
}: {
	username: string;
	onQuestionAdded: () => void;
	user: UserType | null | undefined;
}) => {
	const queryClient = useQueryClient();
	const { setQuestion, getQuestion, clearQ } = useTempQuestionStore();
	const { pastedImages, handlePaste, removeImage } = usePastedImages();

	const defaultValues = {
		question: getQuestion(username) || '',
		usernameId: username,
		posterId: '',
		images: [],
	};

	const {
		control,
		handleSubmit,
		formState: { errors, isLoading },
		setError,
		setValue,
		reset,
		watch,
	} = useForm<QuestionFormData>({
		resolver: zodResolver(QuestionSchema),
		defaultValues,
	});

	const questionValue = watch('question');

	useEffect(() => {
		setQuestion(username, questionValue);
	}, [username, questionValue, setQuestion]);

	useEffect(() => {
		setValue('posterId', user?.id || '');
	}, [user, setValue]);

	const mutation = useMutation({
		mutationFn: postQuestion,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['questions', user?.id] });
			clearQ(username);
			reset({
				question: '',
				usernameId: username,
				posterId: user?.id || '',
				images: [],
			});
			onQuestionAdded();
		},
		onError: (error: AxiosError) => {
			console.error('error:', error.message);
			const errorMessage =
				(error.response?.data as { message?: string })?.message ||
				error.message;
			setError('root', { type: 'manual', message: errorMessage });
		},
	});

	const onSubmit = async (data: QuestionFormData) => {
		// Convert pasted images to base64 strings
		const imagesData = await Promise.all(
			pastedImages.map(async (file) => {
				return new Promise<string>((resolve, reject) => {
					// Create a new FileReader instance
					const reader = new FileReader();

					// Set up the onloadend event handler
					reader.onloadend = () => {
						// When the file is read, resolve the promise with the result (base64 string)
						resolve(reader.result as string);
					};

					// Set up the onerror event handler
					reader.onerror = reject;

					// Start reading the file as a data URL (base64)
					reader.readAsDataURL(file);
				});
			})
		);

		mutation.mutate({ ...data, images: imagesData });
	};

	return (
		<div className="w-full py-2">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<Controller
						name="question"
						control={control}
						render={({ field }) => (
							<Textarea
								{...field}
								variant={'bordered'}
								label="Question"
								labelPlacement="inside"
								placeholder="Enter your question"
								disableAnimation
								disableAutosize
								isInvalid={!!errors.question}
								errorMessage={errors.question?.message}
								onPaste={handlePaste}
							/>
						)}
					/>
				</div>
				{errors.root && (
					<div className="text-red-500 mb-3">{errors.root.message}</div>
				)}
				{pastedImages.length > 0 && (
					<div className="mb-3 flex flex-wrap gap-2">
						{pastedImages.map((file, index) => (
							<div key={index} className="relative">
								<Image
									src={URL.createObjectURL(file)}
									alt={`Pasted image ${index + 1}`}
									width={100}
									height={100}
									objectFit="cover"
								/>
								<button
									type="button"
									onClick={() => removeImage(index)}
									className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
								>
									×
								</button>
							</div>
						))}
					</div>
				)}
				<div className="flex justify-end mt-1">
					<Button
						isLoading={isLoading}
						type="submit"
						color="primary"
						size="sm"
						variant="bordered"
						disabled={isLoading}
					>
						Send
					</Button>
				</div>
			</form>
		</div>
	);
};
