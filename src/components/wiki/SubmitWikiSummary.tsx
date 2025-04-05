"use client";

import React, { useState } from 'react';
import LeftPanel from '@/components/wiki/LeftPanelSummary';
import RightPanel from '@/components/wiki/RightPanelSummary';
import Button from '@/components/Global/BaseButton';

function App() {
  const [selectedChapter, setSelectedChapter] = useState('1');

  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-6">
      <h1 className="text-lg font-medium mb-4 text-black">Submit Summarization</h1>
      <hr className="mb-9" />

      <div className="flex flex-col md:flex-row gap-6 text-black flex-grow">
        <LeftPanel 
          selectedChapter={selectedChapter} 
          setSelectedChapter={setSelectedChapter} 
        />
        <RightPanel selectedChapter={selectedChapter} />
      </div>

      {/* Buttons aligned with the right container */}
      <div className="flex justify-center md:w-2/3 ml-auto gap-40 pt-4 border-t border-gray-100 mt-2">
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