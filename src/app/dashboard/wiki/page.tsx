"use client";
import React from "react";
import { cases } from "@/interface/CaseTypes";
import Header from "@/components/Profile/Header";

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const openCaseCount = cases.filter((c) => c.status.isOpen).length;
  return (
    <main className="flex flex-col text-black w-full max:w-100vw font-[Poppins]" role="main">
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} openCaseCount={openCaseCount} />
    </main>
  );
}

export default Page;