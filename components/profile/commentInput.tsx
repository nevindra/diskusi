import {
	type CommentFormData,
	commentSchema,
	postComment,
} from '@/handlers/commentHandlers';
import { useAnon } from '@/hooks/useAnon';
import type { UserType } from '@/types/userType';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const CommentInput = ({
	question_id,
	user,
	username,
}: {
	question_id: string;
	user: UserType | null | undefined;
	username: string;
}) => {
	const defaultValues = {
		content: '',
		question_id: undefined,
		username: undefined,
		poster_id: '',
	};
	const { isAnon } = useAnon();
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
		setValue('username', username);
		setValue('question_id', question_id);
		!isAnon ? setValue('poster_id', user?.id ?? undefined) : setValue('poster_id', '');
	}, [isAnon, user, question_id, username, setValue]);


	const {mutate, isPending} = useMutation({
		mutationFn: postComment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['questions', username] });
			queryClient.invalidateQueries({ queryKey: ['comments', question_id] });
			reset(defaultValues);
		},
		onError: (error: AxiosError) => {
			console.error('error:', error.message);
			const errorMessage =
				(error.response?.data as { message?: string })?.message ||
				error.message; // Type assertion added
			setError('root', { type: 'manual', message: errorMessage }); // Ensure error is set
		},
	});

	const onSubmit = (data: CommentFormData) => {
		mutate(data);
	};
	return (
		<form
			className="flex flex-col space-y-2 mt-2"
			onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
		>
			<Controller
				name="content"
				control={control}
				render={({ field }) => (
					<Textarea
						{...field}
						variant="bordered"
						color="primary"
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
			{errors.root && (
				<div className="text-red-500 mb-3">{errors.root.message}</div>
			)}
			<div className="flex justify-end">
				<Button
					isLoading={isSubmitting || isPending}
					type="submit"
					color="primary"
					size="sm"
					variant="bordered"
					disabled={isSubmitting}
				>
					Post
				</Button>
			</div>
		</form>
	);
};
