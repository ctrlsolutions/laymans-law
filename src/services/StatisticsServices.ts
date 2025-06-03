import { ApiResponse } from "@/interface/AuthTypes";
import { LawyerStatisticsData } from "@/interface/AuthTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;

export const getLawyerStatistics = async (): Promise<
  ApiResponse<LawyerStatisticsData>
> => {
  try {
    const response = await fetch(`${API_BASE_URL}/lawyer_statistics/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return { success: false, message: "Failed to fetch lawyer statistics." };
    }

    const data = await response.json();

    return {
      success: true,
      message: "Lawyer statistics fetched successfully!",
      data: {
        cases_active: data.cases_active,
        cases_finished: data.cases_finished,
      },
    };
  } catch (error) {
    console.error("Error fetching lawyer statistics:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};
