import { ApiResponse } from "@/interface/AuthTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;

interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  birth_date: string;
  address: string;
  occupation: string;
  gender: string;
  roll_number: string;
  roll_sign_date: string;
  avatar: string;
  role: string;
  email: string;
  user_type: string;
}

export const getProfile = async (): Promise<ApiResponse<ProfileData>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_profile/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      return { success: false, message: "Failed to fetch profile data." };
    }

    const data = await response.json();
    return {
      success: true,
      message: "Profile fetched successfully!",
      data: {
        id: data.id || "",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        contact_number: data.contact_number || "",
        birth_date: data.birth_date || "",
        address: data.address || "",
        occupation: data.occupation || "",
        gender: data.gender || "",
        roll_number: data.roll_number || "",
        roll_sign_date: data.roll_sign_date || "",
        avatar: data.avatar || "",
        role: data.role || "",
        email: data.email || "",
        user_type: data.user_type || "",
      },
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};

export const updateProfile = async (
  profileData: Record<string, unknown>
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/update_profile/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      return { success: false, message: "Failed to update profile data." };
    }

    const data = await response.json();
    return { success: true, message: "Profile updated successfully!", data };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};
