'use client';
import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import type { LoginFormData } from '@/service/login';
import { LoginSchema, login } from '@/service/login';
import type { SignupFormData } from '@/service/signupService';
import { SignupSchema, signUp } from '@/service/signupService';

type FormComponentProps = {
	mode: 'signup' | 'login';
	redirectPath: string;
};

export const FormComponent: React.FC<FormComponentProps> = ({
	mode,
	redirectPath,
}) => {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const schema = mode === 'signup' ? SignupSchema : LoginSchema;
	const defaultValues =
		mode === 'signup'
			? { username: '', email: '', password: '', terms: false }
			: { email: '', password: '' };

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<SignupFormData | LoginFormData>({
		resolver: zodResolver(schema),
		defaultValues,
	});
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: mode === 'signup' ? signUp : login,
		onSuccess: () => {
			queryClient.invalidateQueries(['user']);
			router.push(redirectPath);
		},
		onError: (error: Error) => {
			console.error(`${mode} failed:`, error.message);
			setError('root', { type: 'manual', message: error.message });
		},
	});

	const onSubmit = (data: SignupFormData | LoginFormData) => {
		mutation.mutate(data);
	};

	return (
		<div className="w-full lg:w-1/2 flex items-center justify-center mr-5">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">
					{mode === 'signup' ? 'Buat Akun Baru' : 'Login ke Akun Anda'}
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{mode === 'signup' && (
						<Controller
							name="username"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									label="Username"
									placeholder="Masukkan nama pengguna Anda"
									variant="bordered"
									isInvalid={!!errors.username}
									errorMessage={errors.username?.message as string | undefined}
								/>
							)}
						/>
					)}
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
					{mode === 'signup' && (
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
										Dengan membuat akun Anda, Anda menyetujui{' '}
										<a href="#" className="text-blue-500">
											Syarat Penggunaan
										</a>{' '}
										and{' '}
										<a href="#" className="text-blue-500">
											Kebijakan Privasi
										</a>
										.
									</p>
								</Checkbox>
							)}
						/>
					)}
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
						{mode === 'signup' ? 'Daftar' : 'Masuk'}
					</Button>
				</form>
				<div className="mt-6">
					<p className="text-center text-sm text-gray-600 mb-4">
						{mode === 'signup' ? 'atau daftar dengan' : 'atau masuk dengan'}
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
				{mode === 'signup' ? (
					<p className="text-center mt-6 text-sm text-primary">
						Sudah punya akun?{' '}
						<a href="/login" className="text-secondary">
							Masuk dengan akun
						</a>
					</p>
				) : (
					<p className="text-center mt-6 text-sm text-primary">
						Belum punya akun?{' '}
						<a href="/signup" className="text-secondary">
							Daftar Baru
						</a>
					</p>
				)}
			</div>
		</div>
	);
};
