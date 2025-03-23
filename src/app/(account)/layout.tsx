"use client";
import React, { useState, useEffect } from "react";

export default function AccountLayout({
  lawyer,
  layman,
}: {
    lawyer: React.ReactNode;
    layman: React.ReactNode;
}) {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserType = localStorage.getItem("user_type");
      setUserType(storedUserType);
    }
  }, []);

  if (!userType) return null;

  return <>{userType === "layman" ? layman : lawyer}</>;
}
