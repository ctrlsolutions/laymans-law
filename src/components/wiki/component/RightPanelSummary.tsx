import React from 'react';
import CustomTextarea from '../../Global/BaseTextArea'; // Import the CustomTextarea component

interface RightPanelProps {
  selectedChapter: string;
}

export default function RightPanel({ selectedChapter }: RightPanelProps) {
  return (
    <div className="md:w-2/3 text-black max-h-85 overflow-y-auto relative">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-10 mt-5 ml-6">R.A. Title of Law of the Philippines</h2>
        <p className="text-gray-800 mb-9 ml-6">Chapter {selectedChapter}</p>

        <CustomTextarea
          placeholder="Enter your summary here..."
          className="h-96 border-none focus:border-white focus:ring-white ml-3"
          style={{ textIndent: '2rem' }}
        />
      </div>
    </div>
  );
}