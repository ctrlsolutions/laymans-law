"use client";
import React, { useState } from "react";
import LoginPage from "../(auth)/login/page";

export default function ProfileLayout({
    lawyer,
    layman,
}: {
    lawyer: React.ReactNode;
    layman: React.ReactNode;
}) {
  const [userType, setUserType] = useState<"lawyer" | "layman" | null>(null);

  return (
    <>
      {!userType ? (
        <LoginPage onChoose={setUserType} />
      ) : userType === "layman" ? (
        layman
      ) : (
        lawyer
      )}
    </>
  );
}
