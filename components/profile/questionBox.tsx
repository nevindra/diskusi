'use client';
import { useSession } from '@/hooks/useSession';
import {
	QuestionSchema,
	postQuestion,
	type QuestionFormData,
} from '@/service/questionService';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const QuestionBox: React.FC = () => {
	const { user } = useSession();
	const pathname = usePathname();
	const queryClient = useQueryClient();

	const defaultValues = {
		question: '',
		usernameId: pathname.split('/')[2],
		posterId: '',
		isAnonymous: false,
		
	};

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		setValue,
		reset, // Add this
	} = useForm<QuestionFormData>({
		resolver: zodResolver(QuestionSchema),
		defaultValues,
	});

	// console.log(errors)

	// Set the posterId. PosterID is to identify the user who posted the question
	// PosterID is optional, so we need to check if the user is authenticated
	// If the user is authenticated, we set the posterId to their ID else it remains empty (anonymous question)
	useEffect(() => {
		setValue('posterId', user?.id || '');
	}, [user, setValue]);

	const mutation = useMutation({
		mutationFn: postQuestion,
		onSuccess: () => {
			console.log('success');
			queryClient.invalidateQueries(['questions', user?.id]);
			reset(defaultValues); // Reset the form to default values

		},
		onError: (error: Error) => {
			console.error('error:', error.message);
			setError('root', { type: 'manual', message: error.message });
		},
	});

	const onSubmit = (data: QuestionFormData) => {
		mutation.mutate(data);
	};
	return (
		<div className="flex flex-col w-full lg:w-3/4">
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
						isLoading={isSubmitting}
						type="submit"
						color="secondary"
						size="sm"
						variant="bordered"
					>
						Kirim
					</Button>
				</div>
			</form>
		</div>
	);
};
