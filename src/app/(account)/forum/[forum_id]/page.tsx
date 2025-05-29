"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { FaBookmark } from "react-icons/fa";
import {
  fetchForumById,
  updateForumPost,
  deleteForumPost,
} from "@/services/ForumServices";
import { Forum } from "@/interface/ForumTypes";
import { categories } from "@/constants/caseConstants";

const Page: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
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

  const handleDeleteClick = async () => {
    if (!post) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const success = await deleteForumPost(post.id);
      if (success) {
        alert("Post deleted successfully.");
        router.push("/forum"); // or wherever your list page is
      } else {
        alert("Failed to delete post.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting the post.");
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

  useEffect(() => {
    if (post?.content) {
      setContent(post.content);
    }
  }, [post]);

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
            src="/blank-profile.svg"
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
                  onClick={handleDeleteClick}
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
        </div>
      </div>
    );
  }
};

export default Page;
