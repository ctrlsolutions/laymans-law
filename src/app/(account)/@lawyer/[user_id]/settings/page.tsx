"use client"; // Ensure this runs only on the client

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsHome() {
  const router = useRouter();
  const [storedUserId, setStoredUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setStoredUserId(userId);
      router.push(`/${userId}/settings/profile`);
    }
  }, [router]);

  return <div>Loading...</div>; // Show a loading state while redirecting
}
