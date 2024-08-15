'use client';

import { updateUserProfile } from '@/actions/signupAction';
import { useSession } from '@/hooks/useSession';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Input } from '@nextui-org/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type OnboardingData = {
	prevUname: string;
	username: string;
	photo: string;
};

const OnboardingSchema = z.object({
	prevUname: z.string(),
	username: z
		.string()
		.min(4, 'Username must be at least 4 characters')
		.refine(
			(val) => !/(anjing|kontol|memek|asu|jancok)/i.test(val),
			'Username contains inappropriate words'
		),
	photo: z.string().min(1, 'Photo must be at least 1 character'),
});

export type OnboardingFormData = z.infer<typeof OnboardingSchema>;

export default function OnboardingPage() {
	const { user } = useSession();
	const router = useRouter();
	const defaultValues = {
		prevUname: user?.username || '',
		username: '',
		photo: 'avatar-1',
	};

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		setValue,
		watch,
	} = useForm<OnboardingData>({
		resolver: zodResolver(OnboardingSchema),
		defaultValues
	});
	const selectedAvatar = watch('photo');
	console.log(user)

	useEffect(() => {
		if (user?.username !== watch('prevUname')) {
			setValue('prevUname', user?.username || '');
		}
	}, [user?.username, watch, setValue]);
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: updateUserProfile,
		onSuccess: async (data: OnboardingData) => {
			await queryClient.invalidateQueries({ queryKey: ['user', user?.id] });
			router.push(`/id/${data.username}`); // Use data.username instead of defaultValues.username
		},
		onError: (error: Error) => {
			console.error('signup failed:', error.message);
			setError('root', { type: 'manual', message: error.message });
		},
	});

	const onSubmit = (data: OnboardingData) => {
		mutate(data);
	};

	return (
		<div className="flex flex-col p-4 items-center  justify-center">
			<Card className="w-full max-w-md">
				<CardHeader className="flex flex-col items-center pb-0 pt-6 px-4">
					<h1 className="text-2xl xs:text-lg font-bold">Welcome to Komunal!</h1>
					<Image src="/welcome.png" alt="Logo" width={100} height={100} />
				</CardHeader>
				<CardBody className="flex flex-col items-center justify-center gap-4 p-4 mx-auto font-semibold text-xl 2xs:text-base">
					<p>Choose your avatar and enter your username:</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col items-center justify-center w-[75%] mx-auto gap-2"
					>
						<div className="grid grid-cols-2 gap-4 2xs:gap-3 py-2">
							<Avatar
								className={`w-20 h-20 rounded-full cursor-pointer ${selectedAvatar === 'avatar-1' ? 'ring-4 ring-primary' : ''}`}
								src="/avatar-male.png"
								onClick={() => setValue('photo', 'avatar-1')}
							/>
							<Avatar
								className={`w-20 h-20 rounded-full cursor-pointer ${selectedAvatar === 'avatar-2' ? 'ring-4 ring-primary' : ''}`}
								src="/avatar-female.png"
								onClick={() => setValue('photo', 'avatar-2')}
							/>
						</div>
						<Controller
							name="username"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									label="Username"
									variant="bordered"
									placeholder={user?.username || ''}
									isInvalid={!!errors.username}
									errorMessage={errors.username?.message as string | undefined}
									className="max-w-full"
								/>
							)}
						/>
						{errors.root && (
							<p className="text-red-500 text-xs">{errors.root.message}</p>
						)}
						<Button
							className="w-full"
							color="primary"
							type="submit"
							variant="bordered"
							isLoading={isSubmitting || isPending}
						>
							Continue
						</Button>
					</form>
				</CardBody>
				<CardFooter className="flex justify-center text-xs m-2">
					<p>
						Note: Make sure to check the data you enter is{' '}
						<span className="text-primary">correct</span>.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
