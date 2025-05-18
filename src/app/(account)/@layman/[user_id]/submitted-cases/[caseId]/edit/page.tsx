'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BaseButton from '@/components/Global/BaseButton';
import * as React from "react";

interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
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

export default function EditCasePage() {
  const { caseId, user_id } = useParams();
  const router = useRouter();

  const [caseData, setCaseData] = useState<Case | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [showAllMedia, setShowAllMedia] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mediaImages, setMediaImages] = useState<string[]>([]);
  const [fileList, setFileList] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:8000/api/cases/${caseId}/`);
        if (!res.ok) {
          throw new Error(`Failed to fetch case: ${res.statusText}`);
        }
        const data: Case = await res.json();

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
      <BaseButton color="violet" textColor="white" onClick={() => router.back()}>
        Go Back
      </BaseButton>
    </div>
  );

  if (!caseData) return null;

  const handleDownload = (fileName: string) => {
    const link = document.createElement('a');
    link.href = `/mock/files/${fileName}`;
    link.download = fileName;
    link.click();
  };

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
      const res = await fetch(`http://localhost:8000/api/cases/${caseId}/edit/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCase),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to update case');
      }

      const data = await res.json();
      console.log('Updated case:', data);
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
      const res = await fetch(`http://localhost:8000/api/cases/${caseId}/upload/`, {
        method: 'POST',
        body: formData,
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-violet-950 text-white px-8 py-4 sticky top-0 z-10">
            <button
              onClick={() => router.push(`/dashboard/submitted-cases/${caseId}`)}
              className="text-white hover:underline flex items-center gap-2"
            >
              <span>←</span> Back to Case
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 p-6">
            {/* Left Section */}
            <div className="md:col-span-2 space-y-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
              <div>
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
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-black border border-gray-300 rounded-md p-2"
                  placeholder="Enter case category"
                />
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

              <div className="flex gap-4 justify-end pt-4 border-t border-gray-200 mt-6">
                <BaseButton 
                  color="violet" 
                  textColor="white" 
                  onClick={handleSave}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </BaseButton>
                <BaseButton 
                  color="red" 
                  textColor="white" 
                  onClick={() => router.back()}
                >
                  Discard Changes
                </BaseButton>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg border border-gray-200 overflow-y-auto max-h-[calc(100vh-12rem)]">
              <div className="text-center mb-6">
                <img
                  src={caseData.created_by?.profile_image || "/defaultphoto.jpg"}
                  alt="avatar"
                  className="rounded-full w-20 h-20 mx-auto mb-2"
                />
                <h3 className="text-lg text-black font-semibold">
                  {caseData.created_by?.name || "User"}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{caseData.created_by?.email}</p>
                <div className="text-sm text-gray-700 text-left">
                  {caseData.created_by?.address && (
                    <>
                      <p className="font-semibold">Address</p>
                      <p className="mb-2">{caseData.created_by.address}</p>
                    </>
                  )}
                  {caseData.created_by?.contact_number && (
                    <>
                      <p className="font-semibold">Contact Number</p>
                      <p className="mb-2">{caseData.created_by.contact_number}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-sm mb-3 text-black">Media</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(showAllMedia ? mediaImages : mediaImages.slice(0, 3)).map((src, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={src}
                          alt={`media-${i}`}
                          className="rounded-md cursor-pointer w-full h-24 object-cover"
                          onClick={() => {
                            setCurrentImageIndex(i);
                            setSelectedImage(src);
                          }}
                        />
                        <button
                          onClick={() => handleDeleteImage(i)}
                          className="absolute top-1 right-1 bg-white text-gray-500 rounded-lg px-1.5 py-.5 text-s font-bold shadow group-hover:opacity-100 opacity-0 transition"
                          title="Delete"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                  {mediaImages.length > 3 && (
                    <button
                      className="text-sm text-gray-700 hover:underline mt-2"
                      onClick={() => setShowAllMedia((prev) => !prev)}
                    >
                      {showAllMedia ? "Show less" : `+${mediaImages.length - 3}`}
                    </button>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-black text-sm mb-2">Files</p>
                  <ul className="space-y-2">
                    {(showAllFiles ? fileList : fileList.slice(0, 1)).map((file, i) => (
                      <li key={i} className="relative group">
                        <div
                          className="bg-white text-black cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                          onClick={() => handleDownload(file)}
                        >
                          {file}
                        </div>
                        <button
                          onClick={() => handleDeleteFile(i)}
                          className="absolute top-2.5 right-2 bg-white text-gray-500 rounded-lg px-1.5 py-.5 text-xs font-bold shadow group-hover:opacity-100 opacity-0 transition"
                          title="Delete"
                        >
                          x
                        </button>
                      </li>
                    ))}
                  </ul>
                  {fileList.length > 1 && (
                    <button 
                      onClick={() => setShowAllFiles(!showAllFiles)} 
                      className="text-sm text-gray-700 hover:underline mt-2"
                    >
                      {showAllFiles ? "Show less" : `+${fileList.length - 1}`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative flex flex-col items-center">
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute top-3 right-3 text-white text-xl hover:bg-black/20 rounded-full p-2"
            >
              ✕
            </button>
            <img
              src={mediaImages[currentImageIndex]}
              alt="Selected"
              className="max-w-[80vw] max-h-[80vh] object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}

