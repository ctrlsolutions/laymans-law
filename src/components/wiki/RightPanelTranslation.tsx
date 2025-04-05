import React from 'react';
import BaseFormSelect from '../Global/BaseFormSelect';

interface RightPanelProps {
  selectedChapter: string;
}

export default function RightPanel({ selectedChapter }: RightPanelProps) {
  return (
    <div className="md:w-2/3 text-black max-h-85 overflow-y-auto relative">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 mt-5 ml-6">
            R.A. Title of Law of the Philippines
          </h2>
          <p className="text-gray-800 mt-4 ml-6">Chapter {selectedChapter}</p>
        </div>

        {/* Law Content */}
        <div className=" rounded-md p-4 mx-6 mb-6 text-justify text-sm text-gray-700">
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum...
        </div>
        <hr className="mb-9" />

        {/* Language Dropdown */}
        <div className="flex justify-end mb-6">
          <BaseFormSelect
            label=""
            name="language"
            value=""
            choices={[
              { value: '', label: 'Choose Language' },
              { value: 'tagalog', label: 'Tagalog' },
              { value: 'bisaya', label: 'Bisaya' },
              { value: 'waray', label: 'Waray' },
            ]}
            onChange={() => {}}
          />
        </div>

        {/* Translation Textarea */}
        <div className="mx-6">
        <p className="text-gray-800 mb-5">Chapter {selectedChapter}</p>
          <textarea
            className="w-full h-40 p-4 resize-none placeholder-gray-500 text-black"
            placeholder="Enter Translation"
            style={{ textIndent: '1rem' }}
          />
        </div>
      </div>
    </div>
  );
}
