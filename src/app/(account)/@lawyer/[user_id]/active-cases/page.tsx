"use client";

import { usePathname } from "next/navigation";
import React from "react";
//import BrowseCasesComponent from "@/components/Lawyer/BrowseCasesComponent";

export default function LawyerCasesPage({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    return (
        <>
            {lastSegment === "active-cases" ? (
                <h1>CASES</h1>
            ) : (
                children
            )}
        </>
    );
}
