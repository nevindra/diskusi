'use client';
import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import { GithubLogo, GoogleLogo } from '@phosphor-icons/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
	type SignupFormData,
	SignupSchema,
	signUp,
} from '@/actions/signupAction';

type FormComponentProps = {
	redirectPath: string;
};

export const FormComponent: React.FC<FormComponentProps> = ({
	redirectPath,
}) => {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const schema = SignupSchema;
	const defaultValues = { username: '', email: '', password: '', terms: false };

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<SignupFormData>({
		resolver: zodResolver(schema),
		defaultValues,
	});
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: signUp,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] }); // Updated to use queryKey
			router.push(redirectPath);
		},
		onError: (error: Error) => {
			console.error('signup failed:', error.message);
			setError('root', { type: 'manual', message: error.message });
		},
	});

	const onSubmit = (data: SignupFormData) => {
		// Specify the type for data
		mutation.mutate(data);
	};

	return (
		<div className="w-full lg:w-1/2 flex items-center justify-center mr-5">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Create an Account
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Controller
						name="username"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								label="Username"
								placeholder="Enter your username"
								variant="bordered"
								isInvalid={!!errors.username}
								errorMessage={errors.username?.message as string | undefined}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								label="E-mail address"
								placeholder="Enter your email address"
								type="email"
								variant="bordered"
								isInvalid={!!errors.email}
								errorMessage={errors.email?.message}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								label="Password"
								placeholder="Masukkan kata sandi Anda"
								type={isVisible ? 'text' : 'password'}
								variant="bordered"
								endContent={
									<button
										className="focus:outline-none"
										type="button"
										onClick={toggleVisibility}
									>
										{isVisible ? (
											<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
										) : (
											<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
										)}
									</button>
								}
								isInvalid={!!errors.password}
								errorMessage={errors.password?.message}
							/>
						)}
					/>
					<Controller
						name="terms"
						control={control}
						render={({ field }) => (
							<Checkbox
								isSelected={field.value}
								onValueChange={field.onChange}
								isInvalid={!!errors.terms}
							>
								<p className="text-xs text-gray-500">
									By creating your account, you agree to the{' '}
									<a href="#" className="text-blue-500">
										Terms of Use
									</a>{' '}
									and{' '}
									<a href="#" className="text-blue-500">
										Privacy Policy
									</a>
									.
								</p>
							</Checkbox>
						)}
					/>
					{errors.root && (
						<p className="text-red-500 text-xs">{errors.root.message}</p>
					)}
					<Button
						type="submit"
						color="primary"
						variant="shadow"
						className="w-full"
						isLoading={isSubmitting}
					>
						Sign up
					</Button>
				</form>
				<div className="mt-6">
					<p className="text-center text-sm text-gray-600 mb-4">
						or sign up with
					</p>
					<div className="flex justify-center space-x-4">
						<Button variant="bordered" className="w-1/2 bg-black text-white">
							<GithubLogo className="mr-2" />
							Github
						</Button>
						<Button
							variant="bordered"
							className="w-1/2 bg-[#0F9D58] text-white"
						>
							<GoogleLogo className="mr-2" />
							Google
						</Button>
					</div>
				</div>
				<p className="text-center mt-6 text-sm text-secondary">
					Already have an account?{' '}
					<a href="/login" className="text-primary">
						Login
					</a>
				</p>
			</div>
		</div>
	);
};
