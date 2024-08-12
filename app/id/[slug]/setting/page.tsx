'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Input, Textarea } from '@nextui-org/input';
import { FloppyDisk } from '@phosphor-icons/react/dist/ssr';
import { Toaster, toast } from 'sonner';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { type UserFormData, patchUser } from '@/handlers/userHandlers';
import { useSession } from '@/hooks/useSession';

export default function AccountSettings({
	params,
}: { params: { slug: string } }) {
	const username = params.slug;
	const { user } = useSession();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);

	const queryClient = useQueryClient();

	const defaultValues = {
		bio: user?.bio || '',
		email: user?.email || '',
		username: user?.username || '',
		avatarUrl: user?.avatarUrl || '',
	};

	const avatar = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${user?.avatarUrl}`;

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const avatarUrl = URL.createObjectURL(file);
			setTempAvatarUrl(avatarUrl);
			setAvatarFile(file);
		}
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm<UserFormData>({
		defaultValues,
		// resolver: zodResolver(UserSchema),
	});

	useEffect(() => {
		reset({
			bio: user?.bio || '',
			email: user?.email || '',
			username: user?.username || '',
			avatarUrl: user?.avatarUrl || '',
		});
	}, [user, reset]);

	const { mutate, isPending } = useMutation({
		mutationFn: (variables: {
			username: string;
			data: FormData;
			file: File | null;
		}) => patchUser(variables),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['user', user?.id] });
			toast.success('Account settings updated successfully');
		},
		onError: (error: AxiosError) => {
			console.error('error:', error.message);
			const errorMessage =
				(error.response?.data as { message?: string })?.message ||
				error.message;
			setError('root', { type: 'manual', message: errorMessage });
		},
	});

	const onSubmit = async (data: UserFormData) => {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			if (value != null && value !== '') {
				formData.append(key, value);
			}
		}

		if (avatarFile) {
			formData.append('avatar', avatarFile);
		}

		mutate({ username, data: formData, file: avatarFile });
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">Account Settings</h1>
				<Toaster />
				<Card className="p-6">
					<Accordion defaultExpandedKeys={['1']}>
						<AccordionItem
							key="1"
							aria-label="Accordion 1"
							title="Personal Information"
						>
							<form
								onSubmit={handleSubmit(onSubmit, (errors) =>
									console.log(errors)
								)}
							>
								<div className="flex flex-col">
									<div className="flex flex-col items-center justify-center">
										<Avatar
											src={tempAvatarUrl || avatar || '/user.png'}
											className="w-32 h-32 text-large"
										/>
										<input
											type="file"
											accept="image/*"
											ref={fileInputRef}
											onChange={handleFileChange}
											className="hidden"
											id="avatar-upload"
										/>
										<label
											htmlFor="avatar-upload"
											className="cursor-pointer bg-primary hover:bg-primary-600 text-white font-light my-2 py-2 2xs:text-xs px-4 rounded-lg transition duration-300 ease-in-out"
										>
											Choose Avatar
										</label>
									</div>
									<p className="m-2 font-semibold 2xs:text-sm">Your Bio</p>
									<Controller
										name="bio"
										control={control}
										render={({ field }) => (
											<Textarea
												{...field}
												placeholder={user?.bio || ''}
												className="mb-4 2xs:text-xs"
												variant="bordered"
											/>
										)}
									/>
									{errors.root && (
										<div className="text-red-500 text-sm mb-3">
											{errors.root.message}
										</div>
									)}
									<div className="flex justify-end m-2 space-x-4">
										{/* <Button
											className="text-sm"
											color="danger"
											type="button"
											variant="light"
											startContent={<Trash />}
										>
											Reset
										</Button> */}
										<Button
											className="text-sm"
											color="primary"
											type="submit"
											variant="solid"
											isLoading={isPending}
											disabled={isPending}
											startContent={<FloppyDisk />}
										>
											Save
										</Button>
									</div>
								</div>
							</form>
						</AccordionItem>
						<AccordionItem
							key="2"
							aria-label="Accordion 2"
							title="Account Settings"
						>
							<div>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Controller
										name="username"
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												label="Your Username"
												placeholder={user?.username || ''}
												className="mb-4"
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
												type="password"
												placeholder="••••••••"
												className="mb-4"
											/>
										)}
									/>
									<Controller
										name="email"
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												label="Email Address"
												placeholder={user?.email || ''}
												className="mb-4"
											/>
										)}
									/>
									<div className="flex justify-end mt-6 space-x-4">
										<Button color="primary" type="submit" startContent={<FloppyDisk />}>
											Save
										</Button>
									</div>
								</form>
							</div>
						</AccordionItem>
					</Accordion>
				</Card>
			</div>
		</div>
	);
}
