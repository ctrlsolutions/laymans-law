"use client";

import Image from "next/image";
import { useState } from "react";
import CommentBox from "@/components/Forum/CommentBox";
import { Comment } from "@/interface/ComponentTypes";
import { useRouter } from "next/navigation";
import { FaBookmark } from "react-icons/fa";

// Initial comments data
const initialComments: Comment[] = [
  {
    author: {
      name: "Alessandra",
      avatar: "/1582663e-4415-4962-9a2c-30ed1183e132.png",
    },
    createdAt: "2 days ago",
    content:
      "I don’t know about divorce, but do you sell hollow blocks? Earth is flat guys, I can explain why it is not round using the power of my eyes!",
    replies: [
      {
        author: {
          name: "Caleb Berandoy",
          avatar: "/1582663e-4415-4962-9a2c-30ed1183e132.png",
        },
        createdAt: "1 day ago",
        content: "Bro stop trolling :-(",
        replies: [],
      },
    ],
  },
  {
    author: {
      name: "Nico Bello",
      avatar: "/1582663e-4415-4962-9a2c-30ed1183e132.png",
    },
    createdAt: "2 days ago",
    content: "Who tf is that troll??",
    replies: [],
  },
];

// Helper to count all comments and replies recursively
function countAllComments(comments: Comment[]): number {
  return comments.reduce(
    (total, comment) =>
      total + 1 + (comment.replies ? countAllComments(comment.replies) : 0),
    0
  );
}

// Helper to add a reply at a given path
function addReplyAtPath(
  comments: Comment[],
  path: number[],
  reply: Comment
): Comment[] {
  if (path.length === 0) return comments;
  const [idx, ...rest] = path;
  return comments.map((comment, i) => {
    if (i !== idx) return comment;
    if (rest.length === 0) {
      return {
        ...comment,
        replies: [...(comment.replies || []), reply],
      };
    }
    return {
      ...comment,
      replies: addReplyAtPath(comment.replies || [], rest, reply),
    };
  });
}

const Page: React.FC = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(`Lorem ipsum `.repeat(100));
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  // Add new top-level comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        author: {
          name: "You",
          avatar: "/profile.png",
        },
        createdAt: "just now",
        content: newComment,
        replies: [],
      },
    ]);
    setNewComment("");
  };

  // Add reply to a comment at a given path
  const handleAddReply = (path: number[], reply: Comment) => {
    setComments((prev) => addReplyAtPath(prev, path, reply));
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);
  const handleCancelClick = () => setIsEditing(false);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.4fr 1.6fr",
        gap: "1%",
        gridTemplateAreas: `"left-side right-side"`,
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
      className="p-6"
    >
      <div
        style={{ gridArea: "left-side" }}
        className="flex flex-col items-center"
      >
        <Image
          src="/profile.png"
          alt="Profile"
          width={120}
          height={120}
          className="rounded-full border"
          style={{ width: "80px", height: "80px", margin: "0.5rem" }}
        />
        <button
          onClick={() => router.back()}
          className="mt-auto px-4 py-2 bg-white text-black border border-black-300 rounded-md hover:bg-blue-700 text-sm block"
        >
          ← Back
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto auto auto",
          gridTemplateAreas: `
            "header"
            "content"
            "comment-section"
          `,
          gridArea: "right-side",
          overflowY: "auto",
        }}
        className="space-y-6"
      >
        <div
          style={{ gridArea: "header" }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-600">
              Petition for Dissolution of Marriage
            </h1>
            <p className="text-xs text-gray-600">
              Shared by <strong>Cheska Paul Tucson</strong> on Aug 2, 2023 ·
              Edited on Nov 19, 2023
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <FaBookmark className="text-yellow-500" />
              Favorited by <strong>152</strong> users
            </p>
            <div className="mt-2 flex flex-col items-start gap-2">
              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                Divorce Case
              </span>
              <hr className="w-full border-t border-gray-300 mt-2" />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-700 text-xs"
            >
              Edit
            </button>
            <button className="px-4 py-2 bg-red text-white rounded-md hover:bg-red-700 text-xs">
              Delete
            </button>
          </div>
        </div>

        <div style={{ gridArea: "content" }}>
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs text-gray-800 border rounded-md p-2"
              rows={10}
            />
          ) : (
            <p className="text-xs text-gray-800 whitespace-pre-line">
              {content}
            </p>
          )}
          {isEditing && (
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-blue text-white rounded-md text-xs"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-400 text-white rounded-md text-xs"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div
          style={{ gridArea: "comment-section" }}
          className="bg-gray-10 p-2 rounded-lg"
        >
          <h2 className="text-sm text-gray-600 font-semibold mb-2">
            {countAllComments(comments)} Comments
          </h2>
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <CommentBox
                key={index}
                comment={comment}
                commentPath={[index]}
                onAddReply={handleAddReply}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2">
            <textarea
              placeholder="Reply"
              className="flex-grow text-black border rounded-md p-3 text-sm resize-none"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-700 text-sm"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
