export const QuestionStats = ({ likeCount, commentCount } : { likeCount: number, commentCount: number }) => (
	<div className="flex items-center justify-start w-full mb-1 sm:mb-2">
		<p className="text-xs sm:text-sm text-default-500 mr-2">
			{likeCount} likes
		</p>
		<p className="text-xs sm:text-sm text-default-500">
			{commentCount} comments
		</p>
	</div>
);
