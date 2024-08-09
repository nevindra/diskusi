'use client';

import { type LoginFormData, LoginSchema, login } from '@/actions/loginAction';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/icons';
import { useSession } from '@/hooks/useSession';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { GoogleLogo } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function Login() {
	const { isAuthenticated, user, isLoading } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated && user && !isLoading) {
			router.push(`/id/${user.username}`);
		}
	}, [isAuthenticated, user, isLoading, router]);

	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const schema = LoginSchema;
	const defaultValues = { email: '', password: '' };

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<LoginFormData>({
		resolver: zodResolver(schema),
		defaultValues,
	});
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: login,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['session'] });

			queryClient.refetchQueries({ queryKey: ['user'] });
		},
		onError: (error: Error) => {
			console.error('login failed:', error.message);
			setError('root', { type: 'manual', message: error.message });
		},
	});

	useEffect(() => {
		if (user?.username && !isLoading) {
			router.push(`/id/${user.username}`);
		}
	}, [user, isLoading, router]);

	const onSubmit = (data: LoginFormData) => {
		// Specify the type for data
		mutation.mutate(data);
	};

	return (
		<div className="flex justify-center items-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="flex flex-col items-center pb-0 pt-6 px-4">
					<Image src="/komunal.png" width={80} height={80} alt="Komunal App" />
					<h2 className="text-2xl font-bold mt-4">Login to Your Account</h2>
				</CardHeader>
				<CardBody className="overflow-visible py-2">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
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
									className="max-w-full"
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
									placeholder="Enter your password"
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
									className="max-w-full"
								/>
							)}
						/>
						{errors.root && (
							<p className="text-red-500 text-xs">{errors.root.message}</p>
						)}
						<Button
							name="login"
							type="submit"
							color="primary"
							variant="shadow"
							className="w-full"
							isLoading={isSubmitting}
						>
							Login
						</Button>
					</form>
					<div className="mt-6">
						<p className="text-center text-sm text-gray-600 mb-4">
							or login with
						</p>
						<div className="flex justify-center space-x-4 px-4">
							{/* <Button variant="bordered" name='github' className="w-1/2 bg-black text-white">
							<GithubLogo className="mr-2" />
							Github
						</Button> */}
							<Popover placement="top">
								<PopoverTrigger>
									<Button
										variant="bordered"
										name="google"
										data-umami-event="Login:Google"
										className="w-full bg-[#0F9D58] text-white"
									>
										<GoogleLogo className="mr-2" />
										Google
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<div className="px-1 py-2">
										<div className="text-xs text-primary font-bold">
											Coming soon!
										</div>
										<div className="text-xs">We are working on it</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<p className="text-center mt-6 text-sm text-secondary">
						Don't have an account?{' '}
						<a href="/signup" className="text-primary">
							Sign up
						</a>
					</p>
				</CardBody>
			</Card>
		</div>
	);
}
