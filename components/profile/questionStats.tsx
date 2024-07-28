import { Link } from '@nextui-org/link';
export const QuestionStats = ({
	likeCount,
	commentCount,
	questionId,
	username
}: { likeCount: number; commentCount: number; questionId: string, username: string }) => (
	<div className="flex items-center justify-between w-full">
		<div className="flex items-center">
			<p className="text-xs sm:text-sm text-default-500 mr-2">
				{likeCount} likes
			</p>
			<p className="text-xs sm:text-sm text-default-500">
				{commentCount} comments
			</p>
		</div>
		<div>
			<Link
				href={`${process.env.NEXT_PUBLIC_BASE_URL}/id/${username}/question/${questionId}`}
				className="text-xs sm:text-sm text-default-500"
			>
				View More <span className="ml-1">→</span>
			</Link>
		</div>
	</div>
);
