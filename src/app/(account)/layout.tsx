"use client";
import React from "react";

export default function AuthenticatedLayout({
  lawyer,
  layman,
}: {
  lawyer: React.ReactNode;
  layman: React.ReactNode;
}) {
  const user_type = localStorage.getItem("user_type");

  return <>{user_type === "layman" ? layman : lawyer}</>;
}
