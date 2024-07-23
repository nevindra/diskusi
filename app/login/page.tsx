'use client';
import { FormComponent } from "@/components/auth/form";
import { LeftSideComponent } from "@/components/auth/left-side";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
	const { isAuthenticated, user } = useSession();
	const router = useRouter();


	useEffect(() => {
		if (isAuthenticated && user) {
			setTimeout(() => {
				router.push(`/id/${user?.username}`);
			}, 300);
		}
	}, [isAuthenticated, router, user]);
	
	return (
		<div className="flex items-center justify-center mt-10 ">
			<div className="flex flex-col max-w-[82rem] 2xl:mx-32 xl:mx-12 lg:mx-8 md:mx-4 sm:mx-2 lg:flex-row rounded-2xl min-h-[75vh] lg:bg-gradient-to-br lg:to-[#d8b5ff] lg:from-secondary">
				{/* Left side - Product info */}
				<LeftSideComponent />
				{/* Right side - Login form */}
				<FormComponent mode="login" redirectPath={`/id/${user?.username}`} />
			</div>
		</div>
	);
}
