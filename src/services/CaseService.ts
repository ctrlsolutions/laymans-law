import { ApiResponse } from "@/interface/AuthTypes";
import { Case } from "@/interface/CaseTypes";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export const fetchCases = async (userId: string): Promise<ApiResponse> => {
    try {
        const authToken = getCookie('auth_token');
        console.log("Auth Token:", authToken);
        console.log("User ID:", userId);

        const response = await fetch(`${API_BASE}/cases/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
            },
            credentials: "include",
        });

        console.log("Response Status:", response.status);
        console.log("Response Headers:", Object.fromEntries(response.headers.entries()));

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
        console.log("Raw API Response:", data);
        
        // Filter cases for the specific user if needed
        const userCases = data.filter((caseItem: Case) => {
            console.log("Case Item:", caseItem);
            console.log("Case created_by:", caseItem.created_by);
            console.log("Comparing with userId:", userId);
            // Convert both to strings for comparison
            return String(caseItem.created_by) === String(userId);
        });
        
        console.log("Filtered User Cases:", userCases);
        
        return {
            success: true,
            message: "Cases fetched successfully!",
            data: userCases,
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

export const fetchCaseById = async (caseId: string): Promise<ApiResponse> => {
    try {
        const authToken = getCookie('auth_token');
        const response = await fetch(`${API_BASE}/cases/${caseId}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.detail || "Failed to fetch case.",
                data: null,
            };
        }

        const data = await response.json();
        return {
            success: true,
            message: "Case fetched successfully.",
            data,
        };
    } catch (error) {
        console.error("Network Error:", error);
        return {
            success: false,
            message: "Network error",
            data: null,
        };
    }
};

export const createCase = async (caseData: Partial<Case>): Promise<ApiResponse> => {
    try {
        const authToken = getCookie('auth_token');
        const response = await fetch(`${API_BASE}/cases/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
            },
            credentials: "include",
            body: JSON.stringify(caseData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.detail || "Failed to create case.",
                data: null,
            };
        }

        const data = await response.json();
        return {
            success: true,
            message: "Case created successfully.",
            data,
        };
    } catch (error) {
        console.error("Network Error:", error);
        return {
            success: false,
            message: "Network error",
            data: null,
        };
    }
};

export const updateCase = async (caseId: string, caseData: Partial<Case>): Promise<ApiResponse> => {
    try {
        const authToken = getCookie('auth_token');
        const response = await fetch(`${API_BASE}/cases/${caseId}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
            },
            credentials: "include",
            body: JSON.stringify(caseData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.detail || "Failed to update case.",
                data: null,
            };
        }

        const data = await response.json();
        return {
            success: true,
            message: "Case updated successfully.",
            data,
        };
    } catch (error) {
        console.error("Network Error:", error);
        return {
            success: false,
            message: "Network error",
            data: null,
        };
    }
};

export const acceptCase = async (caseId: string): Promise<ApiResponse> => {

  const url = `${API_CASES_URL}/${caseId}/accept/`; 

  try {
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });

    console.log('Accept Case API Response Status:', response.status);

    if (!response.ok) {
      let message = "Failed to accept case.";
      try {
        const errorData = await response.json();
        console.error('API Error accepting case:', errorData);
        message = errorData.detail || message; 
      } catch (e) {
         console.error('Could not parse error response:', e);
         message = `Failed to accept case. Status: ${response.status} ${response.statusText}`;
      }
      return {
        success: false,
        message: message,
        data: null
      };
    }

    const updatedCaseData = await response.json();
    console.log('Case accepted successfully via API:', updatedCaseData);
    return {
      success: true,
      message: "Case accepted successfully!",
      data: updatedCaseData 
    };

  } catch (error) {
    console.error("Network Error accepting case:", error);
    return {
      success: false,
      message: "Network error. Please check connection.",
      data: null
    };
  }

export const deleteCase = async (caseId: string): Promise<ApiResponse> => {
    try {
        const authToken = getCookie('auth_token');
        const response = await fetch(`${API_BASE}/cases/${caseId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                message: errorData.detail || "Failed to delete case.",
                data: null,
            };
        }

        return {
            success: true,
            message: "Case deleted successfully.",
            data: null,
        };
    } catch (error) {
        console.error("Network Error:", error);
        return {
            success: false,
            message: "Network error",
            data: null,
        };
    }
};