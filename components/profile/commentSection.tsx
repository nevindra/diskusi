import type { UserType } from '@/types/userType';
import { Divider } from '@nextui-org/divider';
import { CommentInput } from './commentInput';
import { CommentBox } from './commentList';

export const CommentSection = ({
	questionId,
	user,
	isSingleQuestion,
}: {
	questionId: string;
	user: UserType | null | undefined;
	isSingleQuestion: boolean;
}) => {
	return (
		<>
			<Divider className="my-2" />
			<div className="w-full space-y-2">
				<CommentBox isSingleQuestion={isSingleQuestion} id={questionId} />
				<CommentInput question_id={questionId} user={user} />
			</div>
		</>
	);
};
