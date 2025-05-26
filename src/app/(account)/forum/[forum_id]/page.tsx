"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import CommentBox from "@/components/Forum/CommentBox";
import { Comment } from "@/interface/ComponentTypes";
import { useRouter, useParams } from "next/navigation";
// import { useRouter } from "next/router";

import { FaBookmark } from "react-icons/fa";
import { fetchForumById, updateForumPost } from "@/services/ForumServices";
import { Forum } from "@/interface/ForumTypes";
import { categories } from "@/constants/caseConstants";

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
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const params = useParams();
  const id = params?.forum_id;

  const [post, setPost] = useState<Forum | null>(null);
  const [loading, setLoading] = useState(true);

  const forumId = Number(params.forum_id);
  const categoryName =
    categories.find((c) => c.id === post?.category)?.name || "Unknown";

  const router = useRouter();

  const formattedDate = post?.timestamp
    ? new Date(post.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const handleSaveClick = async () => {
    try {
      if (post) {
        await updateForumPost(post.id, { content });
        setPost({ ...post, content, updated_at: new Date().toISOString() });
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post.");
    }
  };

  useEffect(() => {
    if (!isNaN(forumId)) {
      const fetchPost = async () => {
        try {
          const res = await fetchForumById(forumId);
          setPost(res);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching forum post:", err);
          setLoading(false);
        }
      };
      fetchPost();
    } else {
      console.error("Invalid forum ID:", params.forum_id);
    }
  }, [forumId]);
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

  useEffect(() => {
    if (post?.content) {
      setContent(post.content);
    }
  }, [post]);

  // Add reply to a comment at a given path
  const handleAddReply = (path: number[], reply: Comment) => {
    setComments((prev) => addReplyAtPath(prev, path, reply));
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  const userId = parseInt(localStorage.getItem("user_id") || "-1");
  const userType = localStorage.getItem("user_type");

  const isAuthorLawyer =
    post?.author.user_id === userId && userType === "lawyer";

  function formatUpdatedAtDisplay(post: Forum) {
    const updatedAt = new Date(post.updated_at);
    const createdAt = new Date(post.timestamp);
    const now = new Date();

    const sameDay = updatedAt.toDateString() === now.toDateString(); // updated today
    const sameDayAsCreated =
      updatedAt.toDateString() === createdAt.toDateString(); // updated same day as created

    if (sameDay || sameDayAsCreated) {
      // Show time only with "Edited at"
      return `Edited at ${updatedAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      // Show full date with "Edited on"
      return `Edited on ${updatedAt.toLocaleDateString()}`;
    }
  }

  if (!post && loading) {
    return <div className="p-4 text-center text-gray-500">Loading post...</div>;
  } else {
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
                {post?.title}
              </h1>
              <p className="text-xs text-gray-600">
                Shared by{" "}
                <strong>
                  {post?.author.first_name + " " + post?.author.last_name}
                </strong>{" "}
                on {formattedDate} ·{" "}
                {post?.updated_at && formatUpdatedAtDisplay(post)}
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <FaBookmark className="text-yellow-500" />
                Favorited by <strong>{post?.bookmark_count}</strong> users
              </p>
              <div className="mt-2 flex flex-col items-start gap-2">
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                  {categoryName}
                </span>
                <hr className="w-full border-t border-gray-300 mt-2" />
              </div>
            </div>
            {isAuthorLawyer && (
              <div className="flex gap-2">
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-700 text-xs"
                >
                  Edit
                </button>
                <button
                  // onClick={handleDeleteClick}
                  className="px-4 py-2 bg-red text-white rounded-md hover:bg-red-700 text-xs"
                >
                  Delete
                </button>
              </div>
            )}
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
                {post?.content}
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
  }
};

export default Page;
