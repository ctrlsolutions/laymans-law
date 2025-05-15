const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCases = async (userId: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_BASE}/cases/user/${userId}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
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

export const fetchCaseById = async (caseId: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cases/${caseId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return {
          success: false,
          message: data.detail || "Failed to fetch case.",
          data: null,
        };
      }
  
      return {
        success: true,
        message: "Case fetched successfully.",
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Network error",
        data: null,
      };
    }
  };