
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
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8">
        <h1 className="text-md font-bold text-gray-900 sm:text-2xl mb-8">
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
            required
        />

        <div className="grid grid-cols-2 gap-0 border rounded-md overflow-hidden">
            <BaseFormSelect
            label=" "
            name="legalTopic"
            value={formData.legalTopic}
            choices={legalTopicChoices}
            onChange={handleChange}
            className="border-r"
            />

            <BaseFormSelect
            label=" "
            name="caseType"
            value={formData.caseType}
            choices={caseTypeChoices}
            onChange={handleChange}
            />
        </div>

        <BaseFormInput
            label=" "
            name="details"
            type="text"
            value={formData.details}
            onChange={handleChange}
            placeholder="Enter Case Details"
            required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Insert File (if necessary):</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full border-gray-300 shadow-sm rounded-md"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
            color="red"
            textColor="gray-700"
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