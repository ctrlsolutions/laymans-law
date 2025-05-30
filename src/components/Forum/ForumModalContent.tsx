"use client";

import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { Forum } from "@/interface/ForumTypes";
import { categories } from "@/constants/caseConstants";
import { updateForumPost, deleteForumPost } from "@/services/ForumServices";

const ForumModalContent: React.FC<{ post: Forum; onClose: () => void }> = ({
  post,
  onClose,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);

  const userId = parseInt(localStorage.getItem("user_id") || "-1");
  const userType = localStorage.getItem("user_type");

  const isAuthorLawyer =
    post?.author.user_id === userId && userType === "lawyer";

  const categoryName =
    categories.find((c) => c.id === post?.category)?.name || "Unknown";

  const formattedDate = post?.timestamp
    ? new Date(post.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  function formatUpdatedAtDisplay(post: Forum) {
    const updatedAt = new Date(post.updated_at);
    const createdAt = new Date(post.timestamp);
    const now = new Date();

    const sameDay = updatedAt.toDateString() === now.toDateString();
    const sameDayAsCreated =
      updatedAt.toDateString() === createdAt.toDateString();

    if (sameDay || sameDayAsCreated) {
      return `Edited at ${updatedAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return `Edited on ${updatedAt.toLocaleDateString()}`;
    }
  }

  const handleSaveClick = async () => {
    try {
      await updateForumPost(post.id, { title, content });
      post.title = title;
      post.content = content;
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update post.");
    }
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const success = await deleteForumPost(post.id);
      if (success) {
        alert("Post deleted successfully.");
        onClose();
      } else {
        alert("Failed to delete post.");
      }
    } catch (err) {
      alert("An error occurred while deleting the post.");
    }
  };

  return (
    <div className="p-6 max-w-2xl w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold text-gray-600 w-full border rounded-md px-2 py-1 mb-2"
              maxLength={100}
            />
          ) : (
            <h1 className="text-2xl font-bold text-gray-600 mr-4 flex-1">
              {post?.title}
            </h1>
          )}
          {/* {isAuthorLawyer && !isEditing && ( */}
          {!isEditing && (
            <div className="flex gap-2 ml-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-700 text-xs"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red text-white rounded-md hover:bg-red-700 text-xs"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-600">
        Shared by{" "}
        <strong>
          {post?.author.first_name + " " + post?.author.last_name}
        </strong>{" "}
        on {formattedDate} · {post?.updated_at && formatUpdatedAtDisplay(post)}
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
      <div className="mt-4">
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
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md text-xs"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumModalContent;
