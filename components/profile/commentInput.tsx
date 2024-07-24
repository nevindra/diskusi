import {
	commentSchema,
	postComment,
	type CommentFormData,
} from '@/service/commentService';
import type { UserType } from '@/types/userType';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const CommentInput = ({
	question_id,
	user,
}: { question_id: string; user: UserType | null }) => {
	const defaultValues = {
		content: '',
		question_id: question_id,
		poster_id: user?.id || '',
	};

	const queryClient = useQueryClient();
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		setValue,
		reset, // Add this
	} = useForm<CommentFormData>({
		resolver: zodResolver(commentSchema),
		defaultValues,
	});

	useEffect(() => {
		if (user && question_id) {
			// Check if user and questionId exists before setting values
			setValue('poster_id', user.id);
			setValue('question_id', question_id);
		}
	}, [user, question_id, setValue]);

	const mutation = useMutation({
		mutationFn: postComment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['comments', question_id] }); // Updated to use queryKey
			queryClient.invalidateQueries({ queryKey: ['questions'] });
			reset(defaultValues);
		},
		onError: (error: AxiosError) => {
			console.error('error:', error.message);
			const errorMessage = (error.response?.data as { message?: string })?.message || error.message; // Type assertion added
			setError('root', { type: 'manual', message: errorMessage }); // Ensure error is set
		},
	});

	const onSubmit = (data: CommentFormData) => {
		mutation.mutate(data);
	};
	return (
		<form
			className="flex items-center space-x-2 mt-2"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Avatar size="sm" src={'/user.png'} />
			{!user ? (
				<Textarea
					variant={'bordered'}
					label="Comment"
					labelPlacement="inside"
					placeholder="Please login/register to comment"
					disableAnimation
					disableAutosize
					isInvalid={!!errors.content}
					errorMessage={errors.content?.message}
					isDisabled
				/>
			) : (
				<Controller
					name="content"
					control={control}
					render={({ field }) => (
						<Textarea
							{...field}
							variant='bordered'
							color='secondary'
							label="Comment"
							labelPlacement="inside"
							placeholder="Write a comment..."
							disableAnimation
							disableAutosize
							isInvalid={!!errors.content}
							errorMessage={errors.content?.message}
						/>
					)}
				/>
			)}
			{errors.root && (
				<div className="text-red-500 mb-3">{errors.root.message}</div>
			)}
			{user ? (
				<Button
					type='submit'
					variant='bordered'
					color='secondary'
					size='sm'
				>
					Post
				</Button>
			) : (
				<Button
					isLoading={isSubmitting}
					type="submit"
					color="secondary"
					size="sm"
					variant="bordered"
					disabled={isSubmitting}
				>
					Post
				</Button>
			)}
		</form>
	);
};
