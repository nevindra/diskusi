'use client';
import { useSession } from '@/hooks/useSession';
import {
	QuestionSchema,
	postQuestion,
	type QuestionFormData
} from '@/service/questionService';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const QuestionBox = ({ onQuestionAdded }: { onQuestionAdded: () => void }) => {
	const { user } = useSession();
	const pathname = usePathname();
	const queryClient = useQueryClient();

	const defaultValues = {
		question: '',
		usernameId: pathname.split('/')[2],
		posterId: '',
	};

	const {
		control,
		handleSubmit,
		formState: { errors, isLoading },
		setError,
		setValue,
		reset, // Add this
	} = useForm<QuestionFormData>({
		resolver: zodResolver(QuestionSchema),
		defaultValues,
	});

	// Set the posterId. PosterID is to identify the user who posted the question
	// PosterID is optional, so we need to check if the user is authenticated
	// If the user is authenticated, we set the posterId to their ID else it remains empty (anonymous question)
	useEffect(() => {
		setValue('posterId', user?.id || '');
	}, [user, setValue]);

	const mutation = useMutation({
		mutationFn: postQuestion,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['questions', user?.id]}); // Updated to use queryKey
			reset(defaultValues);
			onQuestionAdded(); // Call this function after successful question addition
		},
		onError: (error: AxiosError) => {
			console.error('error:', error.message);
			const errorMessage = (error.response?.data as { message?: string })?.message || error.message; // Type assertion added
			setError('root', { type: 'manual', message: errorMessage }); // Ensure error is set
		},
	});

	const onSubmit = (data: QuestionFormData) => {
		mutation.mutate(data);
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
								label="Pertanyaan"
								labelPlacement="inside"
								placeholder="Masukan pertanyaan kamu"
								disableAnimation
								disableAutosize
								isInvalid={!!errors.question}
								errorMessage={errors.question?.message}
							/>
						)}
					/>
				</div>
				{errors.root && (
					<div className="text-red-500 mb-3">{errors.root.message}</div>
				)}

				<div className="flex justify-end mt-1">
					<Button
						isLoading={isLoading}
						type="submit"
						color="secondary"
						size="sm"
						variant="bordered"
						disabled={isLoading}
					>
						Kirim
					</Button>
				</div>
			</form>
		</div>
	);
};
