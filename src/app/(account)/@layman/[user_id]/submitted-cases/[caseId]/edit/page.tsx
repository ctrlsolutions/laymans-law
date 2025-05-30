'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BaseButton from '@/components/Global/BaseButton';
import * as React from "react";
import { fetchCaseById, updateCase } from '@/services/CaseService';
import { Category } from '@/interface/CaseTypes';
import Header from "@/components/Profile/Header";

interface Case {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: string;
  created_at: string;
  updated_at: string;
  media?: string[];
  files?: string[];
  created_by?: {
    user_id: string;
    name: string;
    email: string;
    address?: string;
    contact_number?: string;
    profile_image?: string;
  };
}

const categories: Category[] = [
  { id: "family", name: "Family Law", color: "yellow" },
  { id: "criminal", name: "Criminal Law", color: "lime" },
  { id: "labor", name: "Labor Law", color: "teal" },
  { id: "civil", name: "Civil Law", color: "blue" },
  { id: "commercial", name: "Commercial and Business Law", color: "fuchsia" },
  { id: "other", name: "Others", color: "pink" },
];

export default function EditCasePage() {
  const { caseId, user_id } = useParams();
  const router = useRouter();

  const [caseData, setCaseData] = useState<Case | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>({ id: "civil", name: "Civil Law", color: "blue" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mediaImages, setMediaImages] = useState<string[]>([]);
  const [fileList, setFileList] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchCaseById(caseId as string);
        
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch case');
        }

        const data = response.data as Case;
        setCaseData(data);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setMediaImages(data.media ?? []);
        setFileList(data.files ?? []);
      } catch (err) {
        console.error("Error fetching case data:", err);
        setError(err instanceof Error ? err.message : "Failed to load case data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseData();
  }, [caseId]);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-950"></div>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center">
      <p className="text-red-600 mb-4">{error}</p>
      <BaseButton color="red" textColor="white" onClick={() => router.back()}>
        Go Back
      </BaseButton>
    </div>
  );

  if (!caseData) return null;

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    const updatedCase = {
      title,
      description,
      category,
      media: mediaImages,
      files: fileList,
    };

    try {
      const response = await updateCase(caseId as string, updatedCase);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to update case');
      }

      router.push(`/${user_id}/submitted-cases/${caseId}`);
    } catch (error) {
      console.error('Error updating case:', error);
      setError(error instanceof Error ? error.message : 'Failed to update case');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'media' | 'files') => {
    const files = event.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append(type === 'media' ? 'media' : 'files', file);
    });

    try {
      const authToken = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];
      const res = await fetch(`http://localhost:8000/api/cases/${caseId}/upload/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
        },
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to upload files');
      }

      const data = await res.json();
      if (type === 'media') {
        setMediaImages(prev => [...prev, ...data.media]);
      } else {
        setFileList(prev => [...prev, ...data.files]);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload files');
    }
  };

  const handleDeleteImage = (index: number) => {
    setMediaImages((prev) => prev.filter((_, i) => i !== index));
    if (selectedImage === mediaImages[index]) {
      setSelectedImage(null);
    }
  };

  const handleDeleteFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="pt-0 max-w-8xl mx-auto min-h-screen mt-0">
        <div className="pb-2 px-0 rounded-b-2xl">
          <Header 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            openCaseCount={caseData?.openCaseCount || 0} 
            user={caseData?.user || { firstName: "Unknown User", email: "unknown@example.com" }} 
          />
        </div>
        <div className="w-[70vw] h-[73vh] mx-auto rounded-2xl overflow-hidden shadow bg-white mt-10 mb-20">
          <div className="bg-red text-white px-8 py-4 sticky top-0 z-10">
            <button
              onClick={() => router.push(`/${user_id}/submitted-cases/${caseId}`)}
              className="text-white hover:underline flex items-center gap-2"
            >
              <span>←</span> Back to Case
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 px-6 pt-6 pb-0">
            {/* Left Section */}
            <div className="md:col-span-2 space-y-6 overflow-y-auto max-h-[calc(100vh-25rem)] rounded-sm">
              <div className=''>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-3xl text-black font-bold w-full outline-none border-b border-gray-300 focus:border-gray-500 pb-2"
                  placeholder="Enter case title"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Submitted: <strong>{new Date(caseData.created_at).toLocaleDateString()}</strong>
                </p>
              </div>

              <div>
                <label className="block font-bold text-black mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full border text-black border-gray-300 rounded-md p-3"
                  placeholder="Enter case description"
                />
              </div>

              <div>
                <label className="block font-bold text-black mb-2">Category</label>
                <select
                  value={category?.id || ''}
                  onChange={(e) => {
                    const selectedCategory = categories.find(c => c.id === e.target.value);
                    if (selectedCategory) {
                      setCategory(selectedCategory);
                    }
                  }}
                  className="w-full text-black border border-gray-300 rounded-md p-2"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-black mb-2">Upload Media</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="w-full text-black" 
                  multiple 
                  onChange={(e) => handleFileUpload(e, 'media')} 
                />
              </div>

              <div>
                <label className="block font-bold text-black mb-2">Upload Files</label>
                <input 
                  type="file" 
                  className="w-full text-black" 
                  multiple 
                  onChange={(e) => handleFileUpload(e, 'files')} 
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}

            </div>

            {/* Right Section */}
            <div className="md:col-span-1 space-y-6">
              {/* Media Preview */}
              {mediaImages.length > 0 && (
                <div>
                  <h3 className="font-bold text-black mb-2">Media Preview</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {mediaImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Media ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files List */}
              {fileList.length > 0 && (
                <div>
                  <h3 className="font-bold text-black mb-2">Files</h3>
                  <ul className="space-y-2">
                    {fileList.map((file, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 truncate">{file}</span>
                        <button
                          onClick={() => handleDeleteFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Bottom Row (Full Width) */}
            <div className="md:col-span-3">
              <div className="rounded">
                <div className="flex justify-end gap-4">
                  <BaseButton
                    color="gray"
                    textColor="black"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </BaseButton>
                  <BaseButton
                    color="red"
                    textColor="white"
                    onClick={handleSave}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

