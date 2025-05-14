import { useState } from "react";
import Image from "next/image";
import { Comment } from "@/interface/ComponentTypes";
import CustomTextarea from "@/components/Global/BaseTextArea";

interface CommentBoxProps {
  comment: Comment;
  isReply?: boolean;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  comment,
  isReply = false,
}) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReplyClick = () => {
    setIsReplying(true); // Show the reply box
  };

  const handleCancelClick = () => {
    setIsReplying(false); // Hide the reply box
  };

  return (
    <div className={`flex ${isReply ? "ml-10 mt-2" : "mt-4"}`}>
      <div className="flex flex-col items-center mr-4">
        <Image
          src={comment.author.avatar || "/default-avatar.png"}
          alt={comment.author.name}
          width={36}
          height={36}
          className="rounded-full border"
        />
        {!isReply && <div className="w-px bg-black flex-grow mt-1"></div>}
      </div>

      <div className="bg-white border rounded-xl shadow-sm px-4 py-2 max-w-2xl">
        <div className="flex items-center justify-between">
          <div className="font-medium text-xs text-black">
            {comment.author.name}
          </div>
          <div className="text-xs text-gray-500 ml-9">{comment.createdAt}</div>
        </div>
        <p className="text-gray-700 text-xs mt-2">{comment.content}</p>

        {!isReplying && (
          <button
            onClick={handleReplyClick}
            className="text-xs text-black mt-2 hover:underline"
          >
            Reply
          </button>
        )}

        {isReplying && (
          <div className="mt-4">
            <CustomTextarea
              placeholder="Write your reply..."
              rows={3}
              className="mb-2 text-xs text-black"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-200 text-xs text-black rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue text-xs text-white rounded-md hover:bg-blue-700 text-sm">
                Add Comment
              </button>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 text-black">
            {comment.replies.map((reply, index) => (
              <CommentBox key={index} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
