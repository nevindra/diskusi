import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

export const QuestionStats = ({
	likeCount,
	commentCount,
	questionId,
	username,
	isSingleQuestion,
}: { likeCount: number; commentCount: number; questionId: string, username: string, isSingleQuestion: boolean }) => (
	<div className="flex items-center justify-between w-full">
		<div className="flex items-center">
			<p className="text-xs sm:text-sm text-default-500 mr-2">
				{likeCount} likes
			</p>
			<p className="text-xs sm:text-sm text-default-500">
				{commentCount} comments
			</p>
		</div>
		{isSingleQuestion ? null : (
			<div>
			<Button as={Link} color="primary" href={`/id/${username}/question/${questionId}`} variant="light" className='text-xs font-semibold sm:text-sm'>
				See More
			</Button>
		</div>
		)}
	</div>
);
