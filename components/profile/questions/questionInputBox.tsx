'use client';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Textarea } from '@nextui-org/input';

import {
	type QuestionFormData,
	QuestionSchema,
	postQuestion,
} from '@/handlers/questionHandlers';
import { useAnon } from '@/hooks/useAnon';
import { usePastedImages } from '@/hooks/usePasteImage';
import { useProfileStore } from '@/state/profileState';
import { useTempQuestionStore } from '@/state/questionState';
import type { UserType } from '@/types/userType';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image as ImageIcon } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const QuestionBox = ({
	username,
	user,
}: {
	username: string;
	user: UserType | null | undefined;
}) => {
	const queryClient = useQueryClient();
	const { setQuestion, getQuestion, clearQ } = useTempQuestionStore();
	const { profileUser } = useProfileStore();
	const { isAnon } = useAnon();
	const { pastedImages, handlePaste, removeImage, clearPastedImages } =
		usePastedImages();
	const [uploadedImages, setUploadedImages] = useState<File[]>([]);

	const defaultValues = {
		question: getQuestion(username) || '',
		usernameId: profileUser.id, // this is for the user id who being asked the question
		posterId: '',
		images: [],
		isAnon: isAnon,
	};

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
			setUploadedImages((prev) => [...prev, ...imageFiles]);
		}
	};

	const removeUploadedImage = (index: number) => {
		setUploadedImages((prev) => prev.filter((_, i) => i !== index));
	};
	const {
		control,
		handleSubmit,
		formState: { errors },
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
		if (user?.id !== watch('posterId')) {
			setValue('posterId', user?.id || '');
		}
	}, [user, setValue, watch]);

	const { mutate, isPending } = useMutation({
		mutationFn: postQuestion,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['questions', profileUser.username],
			});
			clearQ(username);
			reset({
				question: '',
				usernameId: profileUser.id,
				posterId: user?.id || '',
				images: [],
				isAnon: isAnon,
			});
			clearPastedImages();
			setUploadedImages([]);
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
		// Combine pastedImages and uploadedImages
		const allImages = [...pastedImages, ...uploadedImages];

		// Convert all images to base64 strings
		const imagesData = await Promise.all(
			allImages.map(async (file) => {
				return new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result as string);
					reader.onerror = reject;
					reader.readAsDataURL(file);
				});
			})
		);

		// Create FormData object
		const formData = new FormData();
		formData.append('question', data.question);
		formData.append('usernameId', data.usernameId || profileUser.id);
		formData.append('posterId', data.posterId || '');
		formData.append('isAnon', isAnon ? 'true' : 'false');
		imagesData.forEach((base64Image, index) => {
			formData.append(`image${index}`, base64Image);
		});

		mutate(formData);
	};

	return (
		<Card className="w-full py-2">
			<form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
				<div className="p-4">
					<Controller
						name="question"
						control={control}
						render={({ field }) => (
							<Textarea
								{...field}
								variant={'bordered'}
								labelPlacement="outside"
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
				<div className="text-sm 2xs:text-xs text-secondary/80 px-5 italic">
					<span className="font-bold">Note: </span>
					{profileUser.id === null || isAnon
						? 'Anonymous mode is enabled. Your question will not be visible to other users.'
						: 'Anonymous mode is disabled. Your question will be visible to other users.'
					}
				</div>
				{errors.root && (
					<div className="text-red-500 mb-3">{errors.root.message}</div>
				)}
				{(pastedImages.length > 0 || uploadedImages.length > 0) && (
					<div className="m-3 flex flex-wrap gap-2 ">
						{[...pastedImages, ...uploadedImages].map((file, index) => (
							<div key={index} className="relative">
								<Image
									src={URL.createObjectURL(file)}
									alt={`Image ${index + 1}`}
									width={100}
									height={100}
								/>
								<button
									type="button"
									onClick={() => {
										if (index < pastedImages.length) {
											removeImage(index);
										} else {
											removeUploadedImage(index - pastedImages.length);
										}
									}}
									className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
								>
									×
								</button>
							</div>
						))}
					</div>
				)}
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: 'none' }}
					onChange={handleFileChange}
					accept='image/*'
				/>
				<div className="flex justify-end px-4 py-1 gap-1">
					<Button
						type="button"
						variant="light"
						color="primary"
						size="sm"
						onClick={handleFileUpload}
					>
						<ImageIcon />
					</Button>
					<Button
						isLoading={isPending}
						type="submit"
						color="primary"
						size="sm"
						variant="bordered"
					>
						Send
					</Button>
				</div>
			</form>
		</Card>
	);
};
