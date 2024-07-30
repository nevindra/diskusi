// 1. QuestionHeader: For the user avatar and post metadata
import { Avatar } from '@nextui-org/avatar';
import { CardHeader } from '@nextui-org/card';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const QuestionHeader = ({posterId, posterUsername, createdAt, }: {posterId: string | null; posterUsername: string; createdAt: string}) => {
	return (
		<CardHeader className="flex items-center space-x-2 sm:space-x-4 pb-2">
		<Avatar
			isBordered
			radius="full"
			size="sm"
			src="/user.png"
			className="border-2 border-secondary"
		/>
		<div>
			<p className="font-semibold text-secondary text-sm sm:text-base">
				{posterId === null
					? 'Anonymous'
					: posterUsername}
			</p>
			<p className="text-xs sm:text-sm text-default-500">
				{formatDistanceToNow(parseISO(createdAt), {
					addSuffix: true,
				})}
			</p>
		</div>
	</CardHeader>
	)
}
	