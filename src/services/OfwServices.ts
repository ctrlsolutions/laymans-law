import type { CountryData } from "@/interface/CountryTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

export const fetchOFWSupport = async (): Promise<CountryData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ofw-support/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};
