'use client';
import { FormComponent } from "@/components/auth/form";
import { LeftSideComponent } from "@/components/auth/left-side";
import { useSession } from "@/libs/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
	const { isAuthenticated, user } = useSession();
	const router = useRouter();


	useEffect(() => {
		if (isAuthenticated && user) {
			setTimeout(() => {
				router.push(`/account/${user?.id}`);
			}, 300);
		}
	}, [isAuthenticated, router, user]);
	
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col 2xl:mx-16 xl:mx-12 lg:mx-8 md:mx-4 sm:mx-2 lg:flex-row rounded-2xl min-h-[75vh] lg:bg-gradient-to-br lg:from-[#ff8d3cb3] lg:to-[#e1b349e2]">
				{/* Left side - Product info */}
				<LeftSideComponent />
				{/* Right side - Login form */}
				<FormComponent mode="login" redirectPath="/account/1" />
			</div>
		</div>
	);
}
