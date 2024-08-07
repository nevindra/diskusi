'use client';
import Counter from '@/components/home/counter';
import { useEffect, useRef, useState } from 'react';

export const Statistics = () => {
	const [_count, setCount] = useState(1);
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, []);

	useEffect(() => {
		if (!isVisible) return;

		const targetCount = 100;
		const duration = 2000; // Animation duration in milliseconds (2 seconds)
		const intervalDuration = 50; // Update interval in milliseconds (0.05 seconds)
		const increment = Math.ceil(targetCount / (duration / intervalDuration));
		const delay = 500; // Delay before starting the count in milliseconds (0.5 seconds)

		const timeout = setTimeout(() => {
			const interval = setInterval(() => {
				setCount((prevCount) => {
					if (prevCount >= targetCount) {
						clearInterval(interval);
						return targetCount;
					}
					return Math.min(prevCount + increment, targetCount);
				});
			}, intervalDuration);

			return () => clearInterval(interval);
		}, delay);

		return () => clearTimeout(timeout);
	}, [isVisible]);

	return (
		<div ref={ref} className="my-8 px-4 lg:max-w-6xl mx-auto">
			<h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-8">
				Statistik Aplikasi
			</h1>
			<h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary text-center">
				<Counter
					targetCount={100}
					duration={2000}
					delay={500}
					isVisible={isVisible}
				/>
			</h1>
			<h1 className="text-lg mt-4 sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary text-center mb-6">
				Pengguna Aktif
			</h1>
			<h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary text-center">
				<Counter
					targetCount={20}
					duration={2000}
					delay={500}
					isVisible={isVisible}
				/>
			</h1>
			<h1 className="text-lg mt-4 sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary text-center mb-6">
				Jumlah Pertanyaan
			</h1>
			<h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary text-center">
				<Counter
					targetCount={200}
					duration={2000}
					delay={500}
					isVisible={isVisible}
				/>
			</h1>
			<h1 className="text-lg mt-4 sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary text-center mb-6">
				Pertanyaan Terjawab
			</h1>
		</div>
	);
};
