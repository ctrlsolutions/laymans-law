"use client";
import React, { useState } from "react";
import SignUpPage from "@/components/Auth/ChoiceComponent";

export default function SignUpLayout({
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
        <SignUpPage onChoose={setUserType} />
      ) : userType === "layman" ? (
        layman
      ) : (
        lawyer
      )}
    </>
  );
}
