import { ApiResponse } from "@/interface/AuthTypes";
import { Case } from "@/interface/CaseTypes";

const mockCases: Case[] = [
  {
    id: "1",
    title: "Land Dispute in Cebu",
    description:
      "A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug.",
    category: { id: "1", name: "Land Ownership", color: "#FF5733" },
    status: "open",
    case_type: "Civil",
    created_date: "2025-04-01T10:00:00Z",
    created_by: { user_id: 1, first_name: "John", last_name: "Doe", email: "john.doe@example.com" },
    created_by_id: "1",
    assigned_to: null,
    image: null,
    document: null,
    video: null,
    attachments: [],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    title: "Violation of Civil Rights",
    description: "An incident of unlawful arrest and detention.",
    category: { id: "2", name: "Civil Rights", color: "#33FF57" },
    status: "closed",
    case_type: "Criminal",
    created_date: "2025-03-15T08:30:00Z",
    created_by: { user_id: 2, first_name: "Jane", last_name: "Doe", email: "jane.doe@example.com" },
    created_by_id: "2",
    assigned_to: null,
    image: null,
    document: null,
    video: null,
    attachments: [],
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: "3",
    title: "Environmental Pollution Case",
    description: "Improper waste disposal by a manufacturing company.",
    category: { id: "3", name: "Environmental Law", color: "#3357FF" },
    status: "open",
    case_type: "Environmental",
    created_date: "2025-02-10T11:15:00Z",
    created_by: { user_id: 3, first_name: "Green", last_name: "Watch", email: "green.watch@example.com" },
    created_by_id: "3",
    assigned_to: null,
    image: null,
    document: null,
    video: null,
    attachments: [],
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

export const fetchForums = async (): Promise<ApiResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Mocked cases fetched successfully!",
    data: mockCases,
  };
};
