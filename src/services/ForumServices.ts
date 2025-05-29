import { ApiResponse } from "@/interface/AuthTypes";
import { Forum } from "@/interface/ForumTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/forum`;

export const fetchAllForums = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    console.log("API Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return {
        success: false,
        message: errorData.detail || "Failed to fetch cases.",
        data: null,
      };
    }

    const data = await response.json();
    console.log("API Data:", data);
    return {
      success: true,
      message: "Cases fetched successfully!",
      data,
    };
  } catch (error) {
    console.error("Network Error:", error);
    return {
      success: false,
      message: "Network error. Please check connection.",
      data: null,
    };
  }
};

export const createForum = async (
  postData: Omit<Forum, "id" | "timestamp">
): Promise<Forum | null> => {
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

export const toggleBookmark = async (
  postId: number
): Promise<{ bookmarked: boolean } | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${postId}/bookmark/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to toggle bookmark:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return null;
  }
};

export const checkIfBookmarked = async (
  postId: number
): Promise<{ bookmarked: boolean } | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${postId}/is-bookmarked/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to check bookmark status:", response.statusText);
      return null;
    }

    return await response.json(); // { bookmarked: true/false }
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    return null;
  }
};

export const fetchBookmarkedForumPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarked/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch bookmarked posts:", response.statusText);
      return [];
    }

    return await response.json(); // returns an array of bookmarked ForumPost objects
  } catch (error) {
    console.error("Error fetching bookmarked posts:", error);
    return [];
  }
};

export const fetchForumById = async (postId: number): Promise<Forum | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${postId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch forum post:", response.statusText);
      return null;
    }

    // return await response.json();
    const data = await response.json();
    console.log("Fetched forum post data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching forum post:", error);
    return null;
  }
};

export async function updateForumPost(
  postId: number,
  updatedPost: { content: string }
) {
  const res = await fetch(`${API_BASE_URL}/${postId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedPost),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Update error details:", err);
    throw new Error("Failed to update post");
  }

  return res.json();
}

export const deleteForumPost = async (postId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${postId}/`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to delete forum post:", response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting forum post:", error);
    return false;
  }
};
