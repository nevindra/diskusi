"use client";
import { Card, CardBody } from "@nextui-org/card";
import { useEffect, useState } from "react";
import { title } from "../primitives";

export const Statistics = () => {
	const [count, setCount] = useState(1);

	useEffect(() => {
		const targetCount = 100;
		const duration = 200; // Animation duration in milliseconds
		const intervalDuration = 1; // Update interval in milliseconds
		const increment = Math.ceil(targetCount / (duration / intervalDuration));

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
	}, []);

	return (
		<div className="my-8 max-w-6xl mx-auto px-4">
			<div className="flex flex-col items-center m-5">
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-center mb-6">
					Active Users:
				</h1>
				<h1
					className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${title({ color: "orangeToPink" })}`}
				>
					{count}+
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
							Total Questions:
						</h1>
						<h1
							className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${title({ color: "orangeToPink" })}`}
						>
							100+
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
							100+
						</h1>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};
