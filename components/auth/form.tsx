"use client";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const RegisterSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	terms: z
		.boolean()
		.refine((val) => val === true, "You must agree to the terms"),
});

type RegisterFormData = z.infer<typeof RegisterSchema>;

export const FormComponent = () => {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			terms: false,
		},
	});

	const signupMutation = useMutation({
		mutationFn: (data: RegisterFormData) =>
			fetch("/signup/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then((res) => {
				if (!res.ok) {
					return res.json().then((data) => {
						throw new Error(data.message);
					});
				}
				return res.json();
			}),
		onSuccess: () => {
			router.push("/account");
		},
		onError: (error: Error) => {
			console.error("Signup failed:", error.message);
			setError("terms", { type: "manual", message: error.message });
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		signupMutation.mutate(data);
	};

	return (
		<div className="w-full lg:w-1/2 flex items-center justify-center mr-5">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Create an account.
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								label="Name"
								placeholder="Enter your name"
								variant="bordered"
								isInvalid={!!errors.name}
								errorMessage={errors.name?.message}
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
								placeholder="Enter your email"
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
								placeholder="Enter your password"
								type={isVisible ? "text" : "password"}
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
									By creating an account you agree to our{" "}
									<a href="#" className="text-blue-500">
										Terms of Use
									</a>{" "}
									and{" "}
									<a href="#" className="text-blue-500">
										Privacy Policy
									</a>
									.
								</p>
							</Checkbox>
						)}
					/>
					{errors.terms && (
						<p className="text-red-500 text-xs">{errors.terms.message}</p>
					)}
					<Button
						type="submit"
						color="primary"
						className="w-full"
						isLoading={isSubmitting}
					>
						Sign Up
					</Button>
				</form>
				<div className="mt-6">
					<p className="text-center text-sm text-gray-600 mb-4">
						or sign up with
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
				<p className="text-center mt-6 text-sm text-gray-600">
					Already have an account?{" "}
					<a href="#" className="text-blue-500">
						Sign in
					</a>
				</p>
			</div>
		</div>
	);
};
