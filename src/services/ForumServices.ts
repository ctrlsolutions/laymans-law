import { ForumPost } from "@/interface/ForumTypes"; // Adjust the import path to your actual ForumPost interface

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/forum`;

export const fetchAllForumPosts = async (): Promise<ForumPost[] | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Use this if authentication is required and you need the cookies
    });

    if (!response.ok) {
      console.error("Failed to fetch forum posts:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    return null;
  }
};

export const fetchForumPostById = async (
  id: number
): Promise<ForumPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch forum post by ID:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching forum post by ID:", error);
    return null;
  }
};

export const createForumPost = async (
  postData: Omit<ForumPost, "id" | "timestamp">
): Promise<ForumPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      console.error("Failed to create forum post:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating forum post:", error);
    return null;
  }
};

export const updateForumPost = async (
  postId: number,
  postData: Omit<ForumPost, "id" | "timestamp">
): Promise<ForumPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${postId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      console.error("Failed to update forum post:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating forum post:", error);
    return null;
  }
};

export const deleteForumPost = async (postId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${postId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to delete forum post:", response.statusText);
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error deleting forum post:", error);
    throw error;
  }
};
