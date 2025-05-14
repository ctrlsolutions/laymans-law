import React from "react";
import BaseFormSelect from "../../Global/BaseFormSelect";
import CustomTextarea from "../../Global/BaseTextArea";

interface RightPanelProps {
  selectedChapter: string;
}

export default function RightPanel({ selectedChapter }: RightPanelProps) {
  return (
    <div className="md:w-2/3 h-full text-black flex flex-col overflow-y-auto relative">
      <div className="bg-white rounded-lg p-6 border border-gray-100 flex flex-col">
        <div className="mb-6">
          <h2 className="text-md font-bold mb-4 mt-5 ml-6">
            R.A. Title of Law of the Philippines
          </h2>
          <p className="text-gray-800 text-xs mt-4 ml-6">
            Chapter {selectedChapter}
          </p>
        </div>

        <div className="text-xs rounded-md p-4 mx-6 mb-6 text-justify text-gray-700 flex-grow">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minimLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minimLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minimLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim
        </div>

        <hr className="mb-3" />

        <div className="flex justify-end mb-3">
          <BaseFormSelect
            label=""
            name="language"
            value=""
            choices={[
              { value: "", label: "Choose Language" },
              { value: "tagalog", label: "Tagalog" },
              { value: "bisaya", label: "Bisaya" },
              { value: "waray", label: "Waray" },
            ]}
            onChange={() => {}}
          />
        </div>

        <div className="mx-6 flex-grow">
          <p className="text-gray-800 text-xs mb-5">
            Chapter {selectedChapter}
          </p>
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
