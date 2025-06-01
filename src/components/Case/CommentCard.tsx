import React from "react";
import { UserType, Comment } from "@/interface/CaseTypes";

interface CommentCardProps {
  comment: Comment;
  currentUserId?: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, currentUserId }) => {
    const isCurrentUser = comment.author.user_id.toString() === currentUserId;
    const isAnonymous = !comment.is_lawyer && !isCurrentUser;
    console.log("Raw comment data:", comment);
    console.log("Timestamp value:", comment.created_at); 

    const formatDate = (isoString: string) => {
        try {
            const date = new Date(isoString);
            return date.toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            console.error("Date parsing error:", e);
            return "Just now";
        }
    };

    return (
    <div className="flex w-full bg-white rounded-md px-3 py-2 text-xs text-gray-800 shadow-sm">
        <div className="mr-2">
            <img 
                src={"/blank-profile.svg"} 
                alt={isAnonymous ? "Anonymous" : `${comment.author.first_name} ${comment.author.last_name}`}
                className="w-6 h-6 rounded-full object-cover"
            />
        </div>
        <div className="flex-1">
            <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-700 text-xxs">
                    {isAnonymous ? "Anonymous" : `${comment.author.first_name} ${comment.author.last_name}`}
                    {comment.is_lawyer && (
                        <span className="ml-2 px-1.5 py-0.5 bg-blue text-white text-xxxs rounded-full">
                            Lawyer
                        </span>
                    )}
                </p>
                <span className="text-gray-400 text-xxxs">
                    {formatDate(comment.created_at)}
                </span>
            </div>
            <p className="mt-1">
                {comment.content}
            </p>
        </div>
    </div>
    );
};

export default CommentCard;