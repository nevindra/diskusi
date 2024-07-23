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
	isAnonymous,
}: { question_id: string; user: UserType; isAnonymous: boolean }) => {
	const defaultValues = {
		content: '',
		poster_id: '',
		question_id: '',
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
			queryClient.invalidateQueries(['comments', question_id]);
			reset(defaultValues);
		},
		onError: (error: AxiosError) => {
			console.error('error:', error.message);
			const errorMessage = error.response?.data?.message || error.message;
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
			{isAnonymous ? (
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
							variant={'bordered'}
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
			{isAnonymous ? (
				<Button
					isLoading={isSubmitting}
					type="button"
					color="secondary"
					size="sm"
					variant="ghost"
					disabled={isSubmitting}
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
