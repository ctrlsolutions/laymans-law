import { ApiResponse } from "@/interface/AuthTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases`;

export const submitCase = async (caseData: any): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit_case/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(caseData),
    });

    if (!response.ok) {
      return { success: false, message: "Failed to submit case." };
    }

    const data = await response.json();
    return { success: true, message: "Case submitted successfully!", data };
  } catch (error) {
    console.error("Error submitting case:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};
