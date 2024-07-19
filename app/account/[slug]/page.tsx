"use client";

import { useSession } from "@/libs/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountHome() {
	const { user, isAuthenticated, isLoading, isUnauthenticated } = useSession();
	const router = useRouter();
	
	useEffect(() => {
		if (isUnauthenticated) {
			router.push("/login");
		}
	}, [isUnauthenticated, router]);

	if (isLoading ) {	
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Account Information
				</h1>
				{ isAuthenticated && (	
					<div className="space-y-4">
						<p>
							<span className="font-semibold">Name:</span>{" "}
							{user?.user_metadata.display_name}
						</p>
						<p>
							<span className="font-semibold">Email:</span> {user?.email}
						</p>
						<p>
							<span className="font-semibold">ID:</span> {user?.id}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}