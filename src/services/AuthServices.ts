import { ApiResponse, SignupData } from "@/interface/AuthTypes";

const API_BASE_URL = "http://127.0.0.1:8000/api/user";

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

    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    return { success: true, message: "Login successful! Redirecting..." };
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
