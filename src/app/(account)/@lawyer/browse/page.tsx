"use client";

import { usePathname } from "next/navigation";
import React from "react";
import CasePage from "@/components/Cases/BrowseCaseComponent";

export default function LawyerCasesPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  return <>{lastSegment === "browse" ? <CasePage /> : children}</>;
}
