import { ApiResponse, SignupData } from "@/interface/AuthTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;

export const UserLogin = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Login failed. Please try again.",
      };
    }

    if (data.user_id) {
      localStorage.setItem("user_id", data.user_id);
    }

    if (data.user_type) {
      localStorage.setItem("user_type", data.user_type);
    }

    return {
      success: true,
      message: "Login successful! Redirecting...",
      user_id: data.user_id,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};

export const UserSignup = async (
  formData: SignupData
): Promise<ApiResponse> => {
  try {
    const filteredForm = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    const response = await fetch(`${API_BASE_URL}/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredForm),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.error || "Signup failed." };
    }

    return { success: true, message: "Signup successful!" };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};
