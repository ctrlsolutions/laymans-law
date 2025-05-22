import { ApiResponse } from "@/interface/AuthTypes";

const API_CASES_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases`;

export const fetchCases = async (): Promise<ApiResponse> => {
    try {
        const response = await fetch(API_CASES_URL, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
            },
            credentials: "include", // Important: send cookies automatically
        });

        console.log('API Response Status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            return { 
                success: false, 
                message: errorData.detail || "Failed to fetch cases.",
                data: null
            };
        }

        const data = await response.json();
        console.log('API Data:', data); // Log the received data
        return { 
            success: true, 
            message: "Cases fetched successfully!", 
            data 
        };
    } catch (error) {
        console.error("Network Error:", error);
        return { 
            success: false, 
            message: "Network error. Please check connection.",
            data: null
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
}

export const fetchCaseById = async (caseId: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_CASES_URL}/${caseId}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            return { 
                success: false, 
                message: errorData.detail || "Failed to fetch case.",
                data: null
            };
        }

        const data = await response.json();
        return { 
            success: true, 
            message: "Case fetched successfully!", 
            data 
        };
    } catch (error) {
        console.error("Network Error:", error);
        return { 
            success: false, 
            message: "Network error. Please check connection.",
            data: null
        };
    }
};

interface UpdateCaseData {
    title: string;
    description: string;
    category: {
        id: string;
        name: string;
        color: string;
    };
    media?: string[];
    files?: string[];
}

export const updateCase = async (caseId: string, caseData: UpdateCaseData): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_CASES_URL}/${caseId}/`, {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(caseData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            return { 
                success: false, 
                message: errorData.detail || "Failed to update case.",
                data: null
            };
        }

        const data = await response.json();
        return { 
            success: true, 
            message: "Case updated successfully!", 
            data 
        };
    } catch (error) {
        console.error("Network Error:", error);
        return { 
            success: false, 
            message: "Network error. Please check connection.",
            data: null
        };
    }
};