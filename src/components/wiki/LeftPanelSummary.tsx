import React from 'react';

interface LeftPanelProps {
  selectedChapter: string;
  setSelectedChapter: (chapter: string) => void;
}

export default function LeftPanel({ selectedChapter, setSelectedChapter }: LeftPanelProps) {
  return (
    <div className="md:w-1/3 space-y-5 max-h-[calc(100vh-250px)] overflow-y-auto relative">
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`bg-white rounded-lg shadow p-4 border transition-all duration-200 ${
            selectedChapter === num.toString()
              ? 'border-blue-500 ring-2 ring-blue-200 h-70 scale-105'
              : 'border-gray-200 hover:border-gray-300 h-60 relative'
          } h-60`}
          onClick={() => setSelectedChapter(num.toString())}
          role="button"
          tabIndex={0}
        >
          <h3 className="text-xl font-bold mb-4 ml-4 mt-4">R.A. Title of Law of the Philippines</h3>
          <p className="text-md text-gray-600 mb-4 ml-4 mt-4">Chapter {num}</p>
          <div className="flex flex-wrap gap-7 justify-space-between ml-4 mt-4">
            {['Previous', 'Review', 'Submit'].map((action) => (
              <div key={action} className="flex items-center gap-1 border border-gray-300 rounded-xl px-2 py-1 bg-gray-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs">{action}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}