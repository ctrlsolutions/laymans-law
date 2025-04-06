"use client";

import React, { useState } from 'react';
import LeftPanel from '@/components/wiki/component/LeftPanelSummary';
import RightPanel from '@/components/wiki/component/RightPanelSummary';
import Button from '@/components/Global/BaseButton';
import BaseFormSelect from '@/components/Global/BaseFormSelect';

function App() {
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [submissionType, setSubmissionType] = useState('Summary');

  const handleSubmissionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubmissionType(e.target.value);
  };

  const submissionTypeChoices = [
    { value: 'Summary', label: 'Summary' },
    { value: 'Translation', label: 'Translation' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium text-black -mb-9">Submit Summarization</h1>
        <BaseFormSelect
          label=" "
          name="submissionType"
          value={submissionType}
          choices={submissionTypeChoices}
          onChange={handleSubmissionTypeChange}
          color="blue"
          width="w-60"
          > Summary </BaseFormSelect>
      </div>
      <hr className="mb-9" />

      <div className="flex flex-col md:flex-row gap-6 text-black flex-grow">
        <LeftPanel 
          selectedChapter={selectedChapter} 
          setSelectedChapter={setSelectedChapter} 
        />
        <RightPanel selectedChapter={selectedChapter} />
      </div>

      <div className="flex justify-center md:w-2/3 ml-auto gap-40 pt-4 mt-2">
        <Button color="red" width="18rem" onClick={() => console.log('Cancel')}>
          Cancel Submission
        </Button>
        <Button color="blue" width="18rem" onClick={() => console.log('Submit')}>
          Submit Summarization
        </Button>
      </div>
    </div>
  );
}

export default App;