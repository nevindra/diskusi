import { Avatar } from '@nextui-org/avatar';
export const CommentBox: React.FC = ({id: commentId}) => {
    // Query the comment data from the backend
    
    return (
        <div className="flex items-start space-x-2">
            <Avatar
                size="sm"
                src={
                    
                    'https://nextui.org/avatars/avatar-3.png'
                }
            />
            <div className="bg-default-100 rounded-lg p-2">
                <p className="font-semibold text-small">Commenter</p>
                <p className="text-small">This is a comment.</p>
            </div>
        </div>
    )
}