import Image from "next/image";

export const LeftSideComponent = () => {
	return (
		<div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-white">
			
			<div className="space-y-6">
				<div className="flex items-start space-x-4">
					<div className="text-3xl">🧠</div>
					<div>
						<h3 className="text-xl font-semibold">Nurture Knowledge</h3>
						<p className="text-base xl:text-lg opacity-80 text-justify">
							Join a community that values ​​quality questions. Explore topics
							deeply and create meaningful discussions that yield real insights.
						</p>
					</div>
				</div>
				<div className="flex items-start space-x-4">
					<div className="text-3xl">🌱</div>
					<div>
						<h3 className="text-xl font-semibold">Nurture Knowledge</h3>
						<p className="text-base xl:text-lg opacity-80 text-justify">
							At Komunal, knowledge flows freely. Be a source of inspiration and
							a connoisseur of the collective wisdom of our community.
						</p>
					</div>
				</div>
				<div className="flex items-start space-x-4">
					<div className="text-3xl">🤝</div>
					<div>
						<h3 className="text-xl font-semibold">Create Connections</h3>
						<p className="text-base xl:text-lg opacity-80 text-justify">
							Find like-minded discussion partners, inspiring mentors, even
							future business partners. Together, we are more than just a
							community - we are catalysts for change.
						</p>
					</div>
				</div>
			</div>
			<div className="mt-12">
				<h2 className="text-3xl font-bold"><Image src="/komunal.png" width={100} height={100} alt="Komunal App" /></h2>
			</div>
		</div>
	);
};
