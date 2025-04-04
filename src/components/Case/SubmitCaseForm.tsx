"use client";

import { useState } from 'react';
import BaseButton from '@/components/Global/BaseButton';
import BaseFormInput from '@/components/Global/BaseFormInput';
import BaseFormSelect from '@/components/Global/BaseFormSelect';

export default function CaseSubmissionForm() {
  const [formData, setFormData] = useState({
    title: '',
    legalTopic: '',
    caseType: '',
    details: '',
    file: null, // Add a field for the file
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
    const file = e.target.files?.[0] || null; // Get the selected file
    setFormData(prev => ({ ...prev, file })); // Update the file in the state
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      legalTopic: '',
      caseType: '',
      details: '',
      file: null, // Reset the file field
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8">
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
            className="px-4 py-0 border border-gray-500 rounded-xl text-xl text-black-900 w-full h-40 leading-none"
            required
        />

        <div className="grid grid-cols-2 gap-0 border rounded-md overflow-hidden">
            <BaseFormSelect
            label=" "
            name="legalTopic"
            value={formData.legalTopic}
            choices={legalTopicChoices}
            onChange={handleChange}
            className="border-r w-48" // Reduced width
            />

            <BaseFormSelect
            label=" "
            name="caseType"
            value={formData.caseType}
            choices={caseTypeChoices}
            onChange={handleChange}
            className="w-48 h-12" // Reduced width
            />
        </div>

        <BaseFormInput
            label=" "
            name="details"
            type="text"
            value={formData.details}
            onChange={handleChange}
            placeholder="Enter Case Details"
            className="px-4 py-0 border border-gray-500 rounded-xl text-xl text-black-900 w-full h-60 leading-none"
            required
        />

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-4">Insert File (if necessary):</label>
          <div className="mt-1 border border-gray-300 shadow-sm rounded-md p-4 flex items-center justify-center cursor-pointer hover:border-gray-400 h-40 mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
            <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm text-xl">+</span>
            </div>
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