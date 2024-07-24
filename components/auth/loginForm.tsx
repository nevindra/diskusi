'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useSession } from '@/hooks/useSession';
import type { LoginFormData } from '@/service/login';
import { LoginSchema, login } from '@/service/login';
import { useEffect } from 'react';


export const LoginFormComponent = () => {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	const { user, isLoading } = useSession(); // Destructure user and isLoading from useSession

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
			console.error("login failed:", error.message);
			setError('root', { type: 'manual', message: error.message });
		},
	});

    useEffect(() => {
        console.log('useEffect running, user:', user?.username, 'isLoading:', isLoading);
        if (user?.username && !isLoading) {
            console.log('Conditions met, redirecting to:', `/id/${user.username}`);
            router.push(`/id/${user.username}`);
        }
    }, [user, isLoading, router]);

	const onSubmit = (data: LoginFormData) => { // Specify the type for data
		mutation.mutate(data);
	};

	return (
		<div className="w-full lg:w-1/2 flex items-center justify-center mr-5">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Login ke Akun Anda
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								label="E-mail address"
								placeholder="Masukkan alamat email Anda"
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
					{errors.root && (
						<p className="text-red-500 text-xs">{errors.root.message}</p>
					)}
					<Button
						type="submit"
						color="secondary"
						variant="shadow"
						className="w-full"
						isLoading={isSubmitting}
					>
						Masuk
					</Button>
				</form>
				<div className="mt-6">
					<p className="text-center text-sm text-gray-600 mb-4">
						atau masuk dengan
					</p>
					<div className="flex justify-center space-x-4">
						<Button variant="bordered" className="w-1/2">
							<FaGithub className="mr-2" />
							Github
						</Button>
						<Button variant="bordered" className="w-1/2">
							<FcGoogle className="mr-2" />
							Google
						</Button>
					</div>
				</div>
				<p className="text-center mt-6 text-sm text-primary">
					Belum punya akun?{' '}
					<a href="/signup" className="text-secondary">
						Daftar Baru
					</a>
				</p>
			</div>
		</div>
	);
};
