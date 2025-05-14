import { ApiResponse } from "@/interface/AuthTypes";
import { Case } from "@/interface/CaseTypes";

const mockCases: Case[] = [
  {
    id: "1",
    title: "Land Dispute in Cebu",
    description:
      "A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug. A family feud over land ownership in Barangay Lahug.",
    category: "Land Ownership",
    status: "open",
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-04-03T15:20:00Z",
    engagedUsers: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/45.jpg",
      "https://randomuser.me/api/portraits/men/12.jpg",
    ],
    commentsCount: 2,
    isBookmarked: true,
    latest_reply_user: "johndoe",
    last_updated: "30 minutes ago",
  },
  {
    id: "2",
    title: "Violation of Civil Rights",
    description: "An incident of unlawful arrest and detention.",
    category: "Civil Rights",
    status: "closed",
    createdAt: "2025-03-15T08:30:00Z",
    updatedAt: "2025-03-20T14:00:00Z",
    engagedUsers: ["https://randomuser.me/api/portraits/women/22.jpg"],
    commentsCount: 0,
    isBookmarked: false,
    latest_reply_user: "janedoe",
    last_updated: "30 minutes ago",
  },
  {
    id: "3",
    title: "Environmental Pollution Case",
    description: "Improper waste disposal by a manufacturing company.",
    category: "Environmental Law",
    status: "open",
    createdAt: "2025-02-10T11:15:00Z",
    updatedAt: "2025-02-12T09:45:00Z",
    engagedUsers: ["https://randomuser.me/api/portraits/men/12.jpg"],
    commentsCount: 1,
    isBookmarked: false,
    latest_reply_user: "greenwatch",
    last_updated: "10 minutes ago",
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
