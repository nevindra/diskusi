'use client';
import {
	type QuestionFormData,
	QuestionSchema,
	postQuestion,
} from '@/handlers/questionHandlers';
import { useSession } from '@/hooks/useSession';
import { useTempQuestionStore } from '@/state/questionState';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const QuestionBox = ({
	username,
	onQuestionAdded,
}: {username: string; onQuestionAdded: () => void }) => {
	const { user } = useSession();
	
	const queryClient = useQueryClient();
	

	const { setQuestion, getQuestion } = useTempQuestionStore();

	const defaultValues = {
		question: getQuestion(username),
		usernameId: username,
		posterId: '',
	};

	const {
		control,
		handleSubmit,
		formState: { errors, isLoading },
		setError,
		setValue,
		reset, // Add this
		watch,
	} = useForm<QuestionFormData>({
		resolver: zodResolver(QuestionSchema),
		defaultValues,
	});

	// Watch for changes in the question field
	const questionValue = watch('question');

	// Update the temporary store when the question changes
	useEffect(() => {
		setQuestion(username, questionValue);
	}, [username, questionValue, setQuestion]);

	// Set the posterId. PosterID is to identify the user who posted the question
	// PosterID is optional, so we need to check if the user is authenticated
	// If the user is authenticated, we set the posterId to their ID else it remains empty (anonymous question)
	useEffect(() => {
		setValue('posterId', user?.id || '');
	}, [user, setValue]);

	const mutation = useMutation({
		mutationFn: postQuestion,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['questions', user?.id] }); // Updated to use queryKey
			reset(defaultValues);
			onQuestionAdded(); // Call this function after successful question addition
		},
		onError: (error: AxiosError) => {
			console.error('error:', error.message);
			const errorMessage =
				(error.response?.data as { message?: string })?.message ||
				error.message; // Type assertion added
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
