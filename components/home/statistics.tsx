"use client";
import Counter from "@/components/home/counter";
import { Card, CardBody } from "@nextui-org/card";
import { useEffect, useRef, useState } from "react";
import { title } from "../primitives";

export const Statistics = () => {
	const [count, setCount] = useState(1);
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
		<div ref={ref} className="my-8 max-w-6xl mx-auto px-4">
			<div className="flex flex-col items-center m-5">
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-center mb-6">
					Active Users:
				</h1>
				<h1
					className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${title({ color: "orangeToPink" })}`}
				>
					<Counter targetCount={100} duration={2000} delay={500} isVisible={isVisible} />
				</h1>
				<p className="text-secondary/80 font-semibold mt-4 text-base sm:text-xl md:text-2xl lg:text-3xl">
					Total User Base
				</p>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
				<Card>
					<CardBody className="text-center mx-1 my-4">
						<h1
							className={`text-base mb-3 sm:text-xl md:text-2xl lg:text-3xl ${title({ color: "whiteToPink" })}`}
						>
							Total Answers:
						</h1>
						<h1
							className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${title({ color: "orangeToPink" })}`}
						>
							<Counter targetCount={100} duration={2000} delay={500} isVisible={isVisible} />
						</h1>
					</CardBody>
				</Card>
				<Card>
					<CardBody className="text-center mx-1 my-4">
						<h1
							className={`text-base mb-3 sm:text-xl md:text-2xl lg:text-3xl ${title({ color: "whiteToPink" })}`}
                            >
							Total Questions:
						</h1>
						<h1
							className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${title({ color: "orangeToPink" })}`}
						>
							<Counter targetCount={100} duration={2000} delay={500} isVisible={isVisible} />
						</h1>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};