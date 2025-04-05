"use client";

import { useState } from 'react';
import Button from '@/components/Global/BaseButton';
import BaseFormSelect from '@/components/Global/BaseFormSelect';

function App() {
  const [selectedChapter, setSelectedChapter] = useState('1');

  const chapters = [
    { value: '1', label: 'Chapter 1' },
    { value: '2', label: 'Chapter 2' },
    { value: '3', label: 'Chapter 3' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-8 bg-gray-50">
        <h1 className="text-lg font-medium mb-4 text-black">Submit Summarization</h1>
        <hr className="mb-9" />

        <div className="flex flex-col md:flex-row gap-6 text-black flex-grow">
            {/* Left Side */}
            <div className="md:w-1/3 space-y-4 h-full">
            {[1, 2, 3].map((num) => (
                <div
                key={num}
                className={`bg-white rounded-lg shadow p-4 border transition-all duration-200 ${
                    selectedChapter === num.toString()
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedChapter(num.toString())}
                role="button"
                tabIndex={0}
                >
                <h3 className="font-bold mb-4">R.A. Title of Law of the Philippines</h3>
                <p className="text-sm text-gray-600 mb-2">Chapter {num}</p>
                <div className="flex flex-wrap gap-2">
                    {['Previous', 'Review', 'Submit'].map((action) => (
                    <div key={action} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs">{action}</span>
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>

            {/* Right Side - Form */}
            <div className="md:w-2/3 text-black h-full">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full flex flex-col">
                <h2 className="text-xl font-bold mb-2">R.A. Title of Law of the Philippines</h2>
                <p className="text-gray-600 mb-3">Chapter {selectedChapter}</p>

                <div className="mb-6 flex-grow">
                <textarea
                    className="w-full h-full p-4 bg-white resize-none placeholder-gray-300 text-black"
                    placeholder="Enter your summary here..."
                    style={{ textIndent: '1rem' }}
                />
                </div>
            </div>
            </div>
        </div>

        {/* Buttons aligned with the right container */}
        <div className="flex justify-end md:w-2/3 ml-auto gap-4 pt-4 border-t border-gray-100 mt-4">
            <Button color="red" onClick={() => console.log('Cancel')}>
            Cancel Submission
            </Button>
            <Button color="blue" onClick={() => console.log('Submit')}>
            Submit Summarization
            </Button>
        </div>
        </div>
  );
}

export default App;