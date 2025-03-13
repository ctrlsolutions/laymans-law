"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/home"); // Redirect on mount
  }, [router]);

  return null; // No UI needed since it's an automatic redirect
}
