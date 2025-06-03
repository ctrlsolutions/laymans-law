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
    files: File[];
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
        files: [...(prev.files || []), ...Array.from(files)],
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setOtherData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await submitCase(formData, otherData.files);

    if (response.success) {
      toast.success("Case submitted successfully!");
    } else {
      toast.error(response.message);
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
    <div className="rounded-lg p-6 sm:p-8">
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

        {/* File Upload Box */}
        <div className="relative border border-gray-300 rounded-lg p-4 h-28">
          <div
            className="w-full border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-start"
            style={{ maxHeight: "5rem", minHeight: "5rem" }}
          >
            {otherData.files.length === 0 ? (
              <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer w-full h-full ">
                <span className="text-gray-500 text-4xl">+</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <ul
                className="text-md text-gray-700 text-center space-y-1 w-full mt-3 px-8 py-2 overflow-y-auto"
                style={{ maxHeight: "5.5rem" }}
              >
                {otherData.files.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100"
                  >
                    <strong className="truncate">{file.name}</strong>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-900 hover:text-red-700 text-sm ml-4 mr-2 mb-1 pointer-events-auto"
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 justify-end">
          <BaseButton
            color="gray-200"
            textColor="gray-500"
            onClick={handleCancel}
            width="100%"
          >
            Cancel
          </BaseButton>
          <BaseButton color="red" type="submit" width="100%">
            Submit
          </BaseButton>
        </div>
      </form>
    </div>
  );
}
