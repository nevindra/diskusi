'use client';
import { LeftSideComponent } from '@/components/auth/left-side';
import { LoginFormComponent } from '@/components/auth/loginForm';
import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
	const { isAuthenticated, user, isLoading } = useSession();
	const router = useRouter();

	useEffect(() => {
		console.log(
			'Login page useEffect, isAuthenticated:',
			isAuthenticated,
			'user:',
			user,
			'isLoading:',
			isLoading
		);
		if (isAuthenticated && user && !isLoading) {
			console.log('Redirecting to:', `/id/${user.username}`);
			router.push(`/id/${user.username}`);
		}
	}, [isAuthenticated, user, isLoading, router]);

	return (
		<div className="flex items-center justify-center mt-10 ">
			<div className="flex flex-col max-w-[82rem] 2xl:mx-32 xl:mx-12 lg:mx-8 md:mx-4 sm:mx-2 lg:flex-row rounded-2xl min-h-[75vh] lg:bg-gradient-to-br lg:to-[#d8b5ff] lg:from-secondary">
				{/* Left side - Product info */}
				<LeftSideComponent />
				{/* Right side - Login form */}
				<LoginFormComponent />
			</div>
		</div>
	);
}
