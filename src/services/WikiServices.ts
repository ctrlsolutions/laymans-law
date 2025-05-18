import { LawData } from "@/interface/CaseTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/laws`;

export const fetchAllLaws = async (): Promise<LawData[] | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch laws:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching laws:", error);
    return null;
  }
};

export const fetchLawById = async (id: number): Promise<LawData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch law by ID:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching law by ID:", error);
    return null;
  }
};
