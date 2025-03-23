import { ApiResponse } from "@/interface/AuthTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;

export const getProfile = async (): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return { success: false, message: "Failed to fetch profile data." };
      }
  
      const data = await response.json();
      return { success: true, message: "Profile fetched successfully!", data };
    } catch (error) {
      console.error("Error fetching profile:", error);
      return { success: false, message: "An error occurred. Please try again." };
    }
};

