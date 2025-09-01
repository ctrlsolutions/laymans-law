"use client";

import React, { useState } from "react";
import LeftPanel from "@/components/wiki/component/LeftPanelSummary";
import RightPanel from "@/components/wiki/component/RightPanelUpvoteSummary";
import Header from "@/components/Profile/Header";

function App() {
  const [selectedChapter, setSelectedChapter] = useState("1");
  const [submissionType, setSubmissionType] = useState("Summary");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmissionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSubmissionType(e.target.value);
  };

  const submissionTypeChoices = [
    { value: "Summary", label: "Summary" },
    { value: "Translation", label: "Translation" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white m-0 p-0">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={0}
        user={null}
      />

      <div className="flex items-center justify-between mb-4 mt-5 px-6">
        <h1 className="text-sm font-medium text-black ">Summary</h1>
      </div>

      <hr className="mb-5" />

      <div className="flex flex-col md:flex-row gap-6 text-black flex-grow px-6 overflow-hidden">
        <LeftPanel
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
        />
        <RightPanel selectedChapter={selectedChapter} />
      </div>
    </div>
  );
}

export default App;