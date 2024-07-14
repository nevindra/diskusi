export const LeftSideComponent = () => {
	return (
		<div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-white">
			<h1 className="text-5xl font-bold mb-6">
				Ask. Learn.
				<br />
				Grow Together.
			</h1>
			<div className="space-y-6">
				<div className="flex items-start space-x-4">
					<div className="text-3xl">🧠</div>
					<div>
						<h3 className="text-xl font-semibold">Cultivate Curiosity</h3>
						<p className="text-sm opacity-80 text-justify">
							Join a community that values thoughtful questions. Explore topics
							deeply and spark meaningful discussions that lead to real
							insights.
						</p>
					</div>
				</div>
				<div className="flex items-start space-x-4">
					<div className="text-3xl">🌱</div>
					<div>
						<h3 className="text-xl font-semibold">Nurture Knowledge</h3>
						<p className="text-sm opacity-80 text-justify">
							Share your expertise and learn from others. Our platform
							encourages high-quality answers that foster personal and
							collective growth.
						</p>
					</div>
				</div>
				<div className="flex items-start space-x-4">
					<div className="text-3xl">🤝</div>
					<div>
						<h3 className="text-xl font-semibold">Build Connections</h3>
						<p className="text-sm opacity-80 text-justify">
							Connect with like-minded individuals passionate about learning.
							Create lasting relationships based on shared interests and
							collaborative problem-solving.
						</p>
					</div>
				</div>
			</div>
			<div className="mt-12">
				<h2 className="text-3xl font-bold">Tanyakan.io</h2>
			</div>
		</div>
	);
};
