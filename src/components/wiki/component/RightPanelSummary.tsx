import React from "react";
import CustomTextarea from "../../Global/BaseTextArea"; // Import the CustomTextarea component

interface RightPanelProps {
  selectedChapter: string;
}

export default function RightPanel({ selectedChapter }: RightPanelProps) {
  return (
    <div className="md:w-2/3 text-black max-h-[calc(100vh-200px)] overflow-hidden relative">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full flex flex-col">
        <h2 className="text-md font-bold mb-5 mt-5 ml-6">
          R.A. Title of Law of the Philippines
        </h2>
        <p className="text-gray-800 text-sm mb-5 ml-6">
          Chapter {selectedChapter}
        </p>

        <div className="flex-grow overflow-hidden">
          <CustomTextarea
            placeholder="Enter your summary here..."
            className="h-full w-full text-xs border-none focus:border-white focus:ring-white"
            style={{ textIndent: "2rem" }}
          />
        </div>
      </div>
    </div>
  );
}
