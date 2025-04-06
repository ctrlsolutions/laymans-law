"use client";

import { useState } from 'react';
import BaseButton from '@/components/Global/BaseButton';
import BaseFormInput from '@/components/Global/BaseFormInput';
import BaseFormSelect from '@/components/Global/BaseFormSelect';
import { SubmitCaseFormData } from '@/interface/ComponentTypes';
import Textarea from '@/components/Global/BaseTextArea';

export default function CaseSubmissionForm() {
  const [formData, setFormData] = useState<SubmitCaseFormData>({
    title: '',
    legalTopic: '',
    caseType: '',
    details: '',
    file: null,
  });

  const legalTopicChoices = [
    { value: '', label: 'Select Legal Topic' },
    { value: 'civil', label: 'Civil Law' },
    { value: 'criminal', label: 'Criminal Law' },
    { value: 'corporate', label: 'Corporate Law' },
    { value: 'family', label: 'Family Law' },
    { value: 'immigration', label: 'Immigration Law' },
  ];

  const caseTypeChoices = [
    { value: '', label: 'Select Case Type' },
    { value: 'litigation', label: 'Litigation' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'document_review', label: 'Document Review' },
    { value: 'mediation', label: 'Mediation' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        files: [...(prev.files || []), ...Array.from(files)], // Append new files to the existing list
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index), // Remove the file at the specified index
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      legalTopic: '',
      caseType: '',
      details: '',
      file: null,
    });
  };

  return (
    <div className=" rounded-lg p-6 sm:p-8">
        <h1 className="text-md font-extrabold text-gray-900 sm:text-2xl mb-4">
        Submit Case
        </h1>
        <hr className="mb-9" />
        
        <form onSubmit={handleSubmit} className="space-y-6">
        <BaseFormInput
            label=" "
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Case Title"
            className="px-4 py-0 border border-gray-500 rounded-xl text-xl text-black-900 w-full h-20 leading-none"
            required
        />

        <div className="grid grid-cols-2 gap-3 overflow-hidden z-0">
            <BaseFormSelect
            label=" "
            name="legalTopic"
            value={formData.legalTopic}
            choices={legalTopicChoices}
            onChange={handleChange}
            />

            <BaseFormSelect
            label=" "
            name="caseType"
            value={formData.caseType}
            choices={caseTypeChoices}
            onChange={handleChange}
            />
        </div>

        <Textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Enter Case Details"
            className="h-80"
            required
        />

        <div className="relative border border-gray-300 rounded-lg p-4 h-60">
            <div className="absolute inset-20 w-22 h-25">
                <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
            <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-start overflow-y-auto">
                {formData.files && formData.files.length > 0 ? (
                <ul className="text-md text-gray-700 text-center space-y-1 w-full mt-3 px-8 py-2">
                    {formData.files.map((file, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-100">
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
                <span className="text-gray-500 text-4xl mt-20">+</span>
                )}
            </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
            color="red"
            onClick={handleCancel}
            width="150px"
            >
            Cancel
            </BaseButton>
            <BaseButton
            color="blue"
            type="submit"
            width="150px"
            >
            Submit
            </BaseButton>
        </div>
        </form>
    </div>
  );
}