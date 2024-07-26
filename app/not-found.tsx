'use client';
import { useEffect } from 'react';

export default function NotFound() {
	useEffect(() => {
		console.log("NotFound");
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
			<p className="mb-4">The page you are looking for does not exist.</p>
		</div>
	);
}