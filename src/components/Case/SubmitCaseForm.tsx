"use client";

import { useState } from "react";
import BaseButton from "@/components/Global/BaseButton";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { SubmitCaseFormData } from "@/interface/CaseTypes";
import Textarea from "@/components/Global/BaseTextArea";
import { toast, ToastContainer } from "react-toastify";
import { submitCase } from "@/services/CaseServices";

export default function CaseSubmissionForm() {
  const [formData, setFormData] = useState<SubmitCaseFormData>({
    title: "",
    case_type: "",
    description: "",
  });

  interface OtherData {
    legalTopic: string;
    files: File[]; // ✅ array of File
  }

  const [otherData, setOtherData] = useState<OtherData>({
    legalTopic: "",
    files: [],
  });

  const caseTypeChoices = [
    { value: "", label: "Case Type" },
    { value: "family", label: "Family Law" },
    { value: "criminal", label: "Criminal Law" },
    { value: "civil", label: "Civil Law" },
    { value: "labor", label: "Labor Law" },
    { value: "commercial", label: "Commercial and Business Law" },
    { value: "other", label: "Others" },
    
  ];

  const legalTopicChoices = [
    { value: "", label: "Case Type" },
    { value: "litigation", label: "Litigation" },
    { value: "consultation", label: "Consultation" },
    { value: "document_review", label: "Document Review" },
    { value: "mediation", label: "Mediation" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setOtherData((prev) => ({
        ...prev,
        files: [...(prev.files || []), ...Array.from(files)], // Append new files to the existing list
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setOtherData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index), // Remove the file at the specified index
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    const response = await submitCase(formData, otherData.files);

    if (response.success) {
      toast.success("Case submitted successfully!");
      console.log(response.message);
    } else {
      console.error(response.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      case_type: "",
      description: "",
    });
    setOtherData({ legalTopic: "", files: [] });
  };

  return (
    <div className=" rounded-lg p-6 sm:p-8">
      <h1 className="text-md font-extrabold text-gray-900 mb-2">Submit Case</h1>
      <hr className="mb-3" />

      <form onSubmit={handleSubmit} className="space-y-2">
        <ToastContainer />

        <BaseFormInput
          label=" "

          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Case Title"
          className="px-4 py-0 -mb-3 border border-gray-500 rounded-xl text-md text-black-900 w-full h-10 leading-none"
          required
        />

        <div className="grid grid-cols-2 gap-3 overflow-hidden z-0">

          <BaseFormSelect
            label=" "
            name="case_type"
            width="w-1/2"
            value={formData.case_type}
            choices={caseTypeChoices}
            onChange={handleChange}
          />
        </div>

        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Case Details"
          className="h-60"
          required
        />

        <div className="relative border border-gray-300 rounded-lg p-4 h-30">
          <div className="absolute inset-10 w-15 h-10">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-start overflow-y-auto">
            {otherData.files && otherData.files.length > 0 ? (
              <ul className="text-md text-gray-700 text-center space-y-1 w-full mt-3 px-8 py-2">
                {otherData.files.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100"
                  >
                    <strong className="truncate">{file.name}</strong>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm ml-4 mr-2 mb-1 pointer-events-auto"
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500 text-2xl mt-7 mb-7">+</span>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton color="red" onClick={handleCancel} width="150px">
            Cancel
          </BaseButton>
          <BaseButton color="blue" type="submit" width="150px">
            Submit
          </BaseButton>
        </div>
      </form>
    </div>
  );
}
