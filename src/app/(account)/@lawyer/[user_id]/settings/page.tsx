"use client"; // Ensure this runs only on the client

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsHome() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      router.push(`/${userId}/settings/profile`);
    }
  }, [router]);

  return <div>Loading...</div>;
}
