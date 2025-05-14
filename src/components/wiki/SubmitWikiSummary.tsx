"use client";

import React, { useState } from "react";
import LeftPanel from "@/components/wiki/component/LeftPanelSummary";
import RightPanel from "@/components/wiki/component/RightPanelSummary";
import Button from "@/components/Global/BaseButton";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
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

      <div className="flex items-center justify-between mb-4 px-0">
        <h1 className="text-xs font-medium text-black -mb-9">
          Submit Summarization
        </h1>
        <BaseFormSelect
          label=" "
          name="submissionType"
          value={submissionType}
          choices={submissionTypeChoices}
          onChange={handleSubmissionTypeChange}
          color="blue"
          width="w-32"
          height="h-8"
          textSize="text-xs"
        >
          Summary
        </BaseFormSelect>
      </div>

      <hr className="mb-5" />

      <div className="flex flex-col md:flex-row gap-6 text-black flex-grow px-0 overflow-hidden">
        <LeftPanel
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
        />
        <RightPanel selectedChapter={selectedChapter} />
      </div>

      <div className="flex justify-center w-full gap-40 ml-40 pt-4 mt-2 px-0">
        <Button
          color="red"
          textSize="text-xs"
          width="8rem"
          onClick={() => console.log("Cancel")}
        >
          Cancel
        </Button>
        <Button
          color="blue"
          textSize="text-xs"
          width="8rem"
          onClick={() => console.log("Submit")}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default App;
