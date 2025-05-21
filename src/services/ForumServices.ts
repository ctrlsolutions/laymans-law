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
    console.log("API Data:", data); // Log the received data
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
