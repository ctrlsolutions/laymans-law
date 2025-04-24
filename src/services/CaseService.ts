// import { ApiResponse } from "@/interface/AuthTypes";

// const API_CASES_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases`;

// export const fetchCases = async (): Promise<ApiResponse> => {
//     try {
//         const response = await fetch(API_CASES_URL, {
//             method: "GET",
//             headers: { 
//                 "Content-Type": "application/json",
//             },
//             credentials: "include", // Important: send cookies automatically
//         });

//         console.log('API Response Status:', response.status);
        
//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('API Error:', errorData);
//             return { 
//                 success: false, 
//                 message: errorData.detail || "Failed to fetch cases.",
//                 data: null
//             };
//         }

//         const data = await response.json();
//         console.log('API Data:', data); // Log the received data
//         return { 
//             success: true, 
//             message: "Cases fetched successfully!", 
//             data 
//         };
//     } catch (error) {
//         console.error("Network Error:", error);
//         return { 
//             success: false, 
//             message: "Network error. Please check connection.",
//             data: null
//         };
//     }
// };

import { ApiResponse } from "@/interface/AuthTypes";
import { Case } from "@/interface/CaseTypes";

const mockCases: Case[] = [
  {
    id: "1",
    title: "Land Dispute in Cebu",
    description: "A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug.",
    category: "Land Ownership",
    status: "open",
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-04-03T15:20:00Z"
  },
  {
    id: "2",
    title: "Violation of Civil Rights",
    description: "An incident of unlawful arrest and detention.",
    category: "Civil Rights",
    status: "closed",
    createdAt: "2025-03-15T08:30:00Z",
    updatedAt: "2025-03-20T14:00:00Z"
  },
  {
    id: "3",
    title: "Environmental Pollution Case",
    description: "Improper waste disposal by a manufacturing company.",
    category: "Environmental Law",
    status: "open",
    createdAt: "2025-02-10T11:15:00Z",
    updatedAt: "2025-02-12T09:45:00Z"
  },
];

export const fetchCases = async (): Promise<ApiResponse> => {

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Mocked cases fetched successfully!",
    data: mockCases
  };
};
