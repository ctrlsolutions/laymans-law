import { useState } from "react";
import Image from "next/image";
import { Comment } from "@/interface/ComponentTypes";
import CustomTextarea from "@/components/Global/BaseTextArea";

interface CommentBoxProps {
  comment: Comment;
  isReply?: boolean;
  commentPath: number[];
  onAddReply: (path: number[], reply: Comment) => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  comment,
  isReply = false,
  commentPath,
  onAddReply,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(true);

  const handleReplyClick = () => setIsReplying(true);
  const handleCancelClick = () => {
    setIsReplying(false);
    setReplyText("");
  };

  const handleAddReply = () => {
    if (!replyText.trim()) return;
    onAddReply(commentPath, {
      author: {
        name: "You",
        avatar: "/profile.png",
      },
      createdAt: "just now",
      content: replyText,
      replies: [],
    });
    setReplyText("");
    setIsReplying(false);
    setShowReplies(true); // Show replies after adding
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
        {!isReply && <div className="w-px bg-gray-300 flex-grow mt-1"></div>}
      </div>

      <div className="bg-white border rounded-xl shadow-sm px-4 py-2 max-w-3xl w-full">
        <div className="flex items-center justify-between">
          <div className="font-medium text-xs text-black">
            {comment.author.name}
          </div>
          <div className="text-xs text-gray-500 ml-9">{comment.createdAt}</div>
        </div>
        <p className="text-gray-700 text-xs mt-2 break-words">
          {comment.content}
        </p>

        {/* Reply button */}
        {!isReplying && (
          <button
            onClick={handleReplyClick}
            className="text-xs text-gray-400 mt-2 hover:underline"
          >
            Reply
          </button>
        )}

        {/* Add reply textarea */}
        {isReplying && (
          <div className="mt-4">
            <CustomTextarea
              placeholder="Write your reply..."
              rows={3}
              className="mb-2 text-xs"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-200 text-xs text-black rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue text-xs text-white rounded-md hover:bg-blue-700 text-sm"
                onClick={handleAddReply}
              >
                Add Reply
              </button>
            </div>
          </div>
        )}

        {/* Reply count and toggle */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            <button
              className="text-xs text-gray-400 hover:underline"
              onClick={() => setShowReplies((prev) => !prev)}
            >
              {showReplies
                ? `Hide Replies (${comment.replies.length})`
                : `Show Replies (${comment.replies.length})`}
            </button>
          </div>
        )}

        {/* Replies */}
        {showReplies && comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply, idx) => (
              <CommentBox
                key={idx}
                comment={reply}
                isReply={true}
                commentPath={[...commentPath, idx]}
                onAddReply={onAddReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
