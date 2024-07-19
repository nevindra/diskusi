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

import type { LoginFormData } from "@/libs/auth/login";
import { LoginSchema, login } from "@/libs/auth/login";
import type { SignupFormData } from "@/libs/auth/signup";
import { SignupSchema, signUp } from "@/libs/auth/signup";

type FormComponentProps = {
	mode: "signup" | "login";
	redirectPath: string;
};

export const FormComponent: React.FC<FormComponentProps> = ({
	mode,
	redirectPath,
}) => {
	
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const schema = mode === "signup" ? SignupSchema : LoginSchema;
	const defaultValues =
		mode === "signup"
			? { username: "", email: "", password: "", terms: false }
			: { email: "", password: "" };

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<SignupFormData | LoginFormData>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	const mutation = useMutation({
		mutationFn: mode === "signup" ? signUp : login,
		onSuccess: () => {
			router.push(redirectPath);
		},
		onError: (error: Error) => {
			console.error(`${mode} failed:`, error.message);
			setError("root", { type: "manual", message: error.message });
		},
	});

	const onSubmit = (data: SignupFormData | LoginFormData) => {
		mutation.mutate(data);
	};

	return (
		<div className="w-full lg:w-1/2 flex items-center justify-center mr-5">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">
					{mode === "signup" ? "Create an account" : "Log in to your account"}
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{mode === "signup" && (
						<Controller
							name="username"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									label="Username"
									placeholder="Enter your username"
									variant="bordered"
									isInvalid={!!errors.name}
									errorMessage={errors.name?.message}
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
					{mode === "signup" && (
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
					)}
					{errors.root && (
						<p className="text-red-500 text-xs">{errors.root.message}</p>
					)}
					<Button
						type="submit"
						color="primary"
						className="w-full"
						isLoading={isSubmitting}
					>
						{mode === "signup" ? "Sign Up" : "Log In"}
					</Button>
				</form>
				<div className="mt-6">
					<p className="text-center text-sm text-gray-600 mb-4">
						{mode === "signup" ? "or sign up with" : "or log in with"}
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
				{mode === "signup" ? (
					<p className="text-center mt-6 text-sm text-gray-600">
						Already have an account?{" "}
						<a href="/login" className="text-blue-500">
							Sign in
						</a>
					</p>
				): (
					<p className="text-center mt-6 text-sm text-gray-600">
						Don't have an account?{" "}
						<a href="/signup" className="text-blue-500">
							Sign up
						</a>
					</p>
				)}
				
			</div>
		</div>
	);
};
