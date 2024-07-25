import { Card } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';

export const SkeltonProfile = () => {
	return (
		<div className="flex flex-col items-center justify-center md:m-8 lg:m-10">
			<Card className="flex flex-col w-full xl:w-[70%] lg:flex-row m-2 lg:space-x-8 p-4 lg:p-8">
				<Skeleton className="w-1/2 h-64" /> {/* UserBio skeleton */}
				<Skeleton className="w-1/2 h-64" /> {/* QuestionBox skeleton */}
			</Card>
			<h1 className="text-primary items-start text-left text-xl font-semibold mb-3">
				Questions
			</h1>
			<div className="flex flex-col w-full xl:w-[70%] space-y-4 px-2 mt-1 lg:px-4">
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="w-full h-24" />
				))}
			</div>
		</div>
	);
};
