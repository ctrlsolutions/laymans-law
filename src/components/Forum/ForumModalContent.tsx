"use client";

import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { Forum } from "@/interface/ForumTypes";
import { categories } from "@/constants/caseConstants";
import { updateForumPost, deleteForumPost } from "@/services/ForumServices";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import toast from "react-hot-toast";

const ForumModalContent: React.FC<{
  post: Forum;
  onClose: () => void;
  onUpdate: (updated: Forum) => void;
  onDelete: (deletedId: number) => void;
}> = ({ post, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const userId = parseInt(localStorage.getItem("user_id") || "");
  const userType = localStorage.getItem("user_type");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
  }, [post]);

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

  function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Edited just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
      return `Edited ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Edited ${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Edited yesterday";
    if (days < 7) return `Edited ${days} day${days > 1 ? "s" : ""} ago`;
    return `Edited on ${date.toLocaleDateString()}`;
  }

  const handleSaveClick = async () => {
    try {
      const updated = await updateForumPost(post.id, {
        title,
        content,
        category,
      });
      onUpdate(updated);
      setIsEditing(false);
      toast.success("Post updated successfully.");
    } catch (err) {
      toast.error("Failed to update post.");
    }
  };

  const handleDeleteClick = async () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    setIsConfirmOpen(false);
    try {
      const success = await deleteForumPost(post.id);
      if (success) {
        toast.success("Post deleted successfully.");
        onDelete(post.id);
      } else {
        toast.error("Failed to delete post.");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the post.");
    }
  };

  return (
    <div className="p-6 max-w-2xl w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full">
          {isEditing ? (
            <>
              <div className="relative mb-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-[570px] text-2xl font-bold text-gray-600 border rounded-md px-2 py-1 mb-2"
                  maxLength={20}
                />
                <span className="absolute bottom-0 right-2 text-xs text-gray-500 bg-white bg-opacity-80 px-1 rounded">
                  {title.length}/100
                </span>
              </div>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-gray-600 mr-4 flex-1">
              {post?.title}
            </h1>
          )}
          {isAuthorLawyer && !isEditing && (
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
        on {formattedDate} · {post?.updated_at && timeAgo(post.updated_at)}
      </p>
      <p className="text-xs text-gray-600 flex items-center gap-1">
        <FaBookmark className="text-yellow-500" />
        {post?.bookmark_count === 0 ? (
          "No users have favorited this"
        ) : (
          <>
            Favorited by <strong>{post?.bookmark_count}</strong>{" "}
            {post?.bookmark_count === 1 ? "user" : "users"}
          </>
        )}
      </p>
      <div className="mt-2 flex flex-col items-start gap-2">
        {isEditing ? (
          <BaseFormSelect
            label=""
            name="forumCategory"
            width="260px"
            textSize="text-xs"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            choices={categoryOptions}
          />
        ) : (
          <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
            {categoryName}
          </span>
        )}
        <hr className="w-full border-t border-gray-300 mt-2" />
      </div>
      <div className="mt-4">
        {isEditing ? (
          <>
            <div className="relative mb-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-xs text-gray-800 border rounded-md p-2"
                maxLength={2500}
              />
              <span className="absolute bottom-0 right-3 text-xs text-gray-500 bg-white bg-opacity-80 px-1 rounded">
                {content.length}/2500
              </span>
            </div>
          </>
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
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumModalContent;
