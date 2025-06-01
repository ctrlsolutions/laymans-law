import { ApiResponse } from "@/interface/AuthTypes";
import { SubmitCaseFormData } from "@/interface/CaseTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases`;

export const submitCase = async (caseData: SubmitCaseFormData, files: File[] = []): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    formData.append('title', caseData.title);
    formData.append('case_type', caseData.case_type);
    formData.append('description', caseData.description);

    files.forEach(file => {
      formData.append('files', file);
    });

    console.log("Sending to server:", caseData); 
    
    const response = await fetch(`${API_BASE_URL}/submit_case/`, {
      method: "POST",
      headers: {  },
      credentials: "include",
      body: formData,
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
