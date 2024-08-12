'use client';
import { LegalModal } from '@/components/auth/legalModal';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/icons';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { GoogleLogo } from '@phosphor-icons/react';
import Image from 'next/image';

import { legalContent } from '@/public/legal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@nextui-org/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
	type SignupFormData,
	SignupSchema,
	signUp,
} from '@/actions/signupAction';

export default function SignupPage() {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const schema = SignupSchema;
	const defaultValues = { username: '', email: '', password: '', terms: false };

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalContent, setModalContent] = useState({ title: '', content: '' });

	const openModal = (type: 'terms' | 'privacy') => {
		if (type === 'terms') {
			setModalContent({
				title: 'Terms of Use',
				content: legalContent.termsOfUse,
			});
		} else {
			setModalContent({
				title: 'Privacy Policy',
				content: legalContent.privacyPolicy,
			});
		}
		onOpen();
	};

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
			queryClient.invalidateQueries({ queryKey: ['user'] });
			router.push('/login');
		},
		onError: (error: Error) => {
			console.error('signup failed:', error.message);
			setError('root', { type: 'manual', message: error.message });
		},
	});

	const onSubmit = (data: SignupFormData) => {
		mutation.mutate(data);
	};

	return (
		<div className="flex justify-center items-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="flex flex-col items-center pb-0 pt-6 px-4">
					<Image src="/komunal.png" width={80} height={80} alt="Komunal App" />
					<h2 className="text-2xl font-bold mt-4">Create an Account</h2>
				</CardHeader>
				<CardBody className="overflow-visible py-2">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
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
									className="max-w-full"
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
										<Button
											onPress={() => openModal('terms')}
											className="text-blue-500 text-xs p-0 min-w-fit h-auto"
											variant="light"
										>
											Terms of Use
										</Button>{' '}
										and{' '}
										<Button
											onPress={() => openModal('privacy')}
											className="text-blue-500 text-xs p-0 min-w-fit h-auto"
											variant="light"
										>
											Privacy Policy
										</Button>
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
						<div className="flex justify-center space-x-4 px-4">
							<Popover placement="top">
								<PopoverTrigger>
									<Button
										variant="bordered"
										name="google"
										data-umami-event="Signup:Google"
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
						Already have an account?{' '}
						<a href="/login" className="text-primary">
							Login
						</a>
					</p>
					<LegalModal
						isOpen={isOpen}
						onClose={onClose}
						title={modalContent.title}
						content={modalContent.content}
					/>
				</CardBody>
			</Card>
		</div>
	);
}
