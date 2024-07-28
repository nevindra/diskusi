import type { UserType } from '@/types/userType';
import { Divider } from '@nextui-org/divider';
import { CommentInput } from './commentInput';
import { CommentBox } from './commentList';

export const CommentSection = ({ 
	questionId, 
	user, 
	refetchQuestion 
}: { 
	questionId: string, 
	user: UserType | null,
	refetchQuestion: () => void
}) => {
	return (
		<>
		<Divider className="my-2" />
		<div className="w-full space-y-2">
			<CommentBox id={questionId} />
			<CommentInput 
				question_id={questionId} 
				user={user} 
				onCommentAdded={refetchQuestion}
			/>
		</div>
		</>
	);
}