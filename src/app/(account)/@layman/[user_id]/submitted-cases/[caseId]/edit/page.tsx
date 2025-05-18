'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BaseButton from '@/components/Global/BaseButton';
import Header from "@/components/Profile/Header";
import * as React from "react";

interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  media?: string[];
  files?: string[];
}

export default function EditCasePage() {
  const { caseId } = useParams();
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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/cases/${caseId}/`);
        if (!res.ok) throw new Error("Failed to fetch case");
        const data: Case = await res.json();

        setCaseData(data);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setMediaImages(data.media ?? []);
        setFileList(data.files ?? []);
      } catch (err) {
        console.error("Error fetching case data:", err);
      }
    };

    fetchCaseData();
  }, [caseId]);

  if (!caseData) return <p className="p-8">Loading...</p>;

  const handleDownload = (fileName: string) => {
    const link = document.createElement('a');
    link.href = `/mock/files/${fileName}`;
    link.download = fileName;
    link.click();
  };

  const handleSave = async () => {
    setIsSaving(true);
    const updatedCase = {
      title,
      description,
      category,
      media: mediaImages,
      files: fileList,
    };

    try {
      const res = await fetch(`http://localhost:8000/api/cases/${caseId}/edit/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCase),
      });

      if (!res.ok) {
        throw new Error('Failed to update case');
      }

      const data = await res.json();
      console.log('Updated case:', data);
      alert('Case updated successfully');
      router.push(`/dashboard/submitted-cases/${caseId}`);
    } catch (error) {
      console.error('Error updating case:', error);
      alert('Failed to update case. Check console for details.');
    } finally {
      setIsSaving(false);
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
    <>
      <div className="pt-0 max-w-8xl mx-auto min-h-screen mt-0">
        <div className="pb-2 px-0 rounded-b-2xl">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div className="w-[70vw] h-[73vh] mx-auto rounded-2xl overflow-hidden shadow bg-white mt-10 mb-20">
          <div className="bg-violet-950 text-white px-8 py-4">
            <button
              onClick={() => router.push(`/dashboard/submitted-cases/${caseId}`)}
              className="text-white hover:underline"
            >
              ← Back to Case
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-1 pr-0 pl-8">
            {/* Left Section */}
            <div className="md:col-span-2 h-[65vh] flex flex-col rounded-xl pr-15 pt-15 overflow-hidden">
              <div className="space-y-3 ">
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-3xl text-black font-bold mt-11 ml-8 mb-2 w-[40vw] outline-none border-b border-gray-300 focus:border-gray-500"
                  />
                  <p className="text-sm ml-8 text-black">
                    Submitted: <strong>{new Date(caseData.createdAt).toLocaleDateString()}</strong>
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-black mb-1 ml-8 ">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="w-[40vw] border text-black border-gray-300 rounded-md ml-8 mr-8 p-2 "
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-1 ml-8 mr-8">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-[40vw] text-black border border-gray-300 ml-8 mr-8 rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-1 ml-8 mr-8">Upload Media</label>
                  <input type="file" accept="image/*" className="ml-8 mr-8 text-black" multiple onChange={() => alert('Media uploaded (mock)')} />
                </div>

                <div>
                  <label className="block font-bold text-black ml-8 mr-8 mb-1">Upload Files</label>
                  <input type="file" className="ml-8 mr-8 text-black" multiple onChange={() => alert('Files uploaded (mock)')} />
                </div>
              </div>

              <div className="pt-2 flex gap-4 justify-end w-[42vw]">
                <BaseButton color="violet" textColor="white" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </BaseButton>
                <BaseButton color="red" textColor="white" onClick={() => router.back()}>
                  Discard Changes
                </BaseButton>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:col-span-1 bg-gray-100 p-6 mt-0 border-l border-gray-200 h-[68vh] rounded-l flex flex-col">
              <div className="text-center mb-4 shrink-0">
                <img
                  src="/defaultphoto.jpg"
                  alt="avatar"
                  className="rounded-full w-20 h-20 mx-auto mb-2"
                />
                <h3 className="text-lg text-black font-semibold">
                  Chraine Paul Tuazon
                </h3>
                <p className="text-sm text-gray-500 mb-4">Pro Sabongero</p>
                <div className="text-sm text-gray-700 text-left ml-3">
                  <p className="font-semibold">Address</p>
                  <p className="mb-2">Camputhaw, Cebu City</p>
                  <p className="font-semibold">Contact Number</p>
                  <p className="mb-2">+09 876 543 21</p>
                  <p className="font-semibold">Email Address</p>
                  <p className="mb-2 text-blue-600">chrepau@gmail.com</p>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto space-y-2 pr-1">
                <div>
                  <p className="font-semibold text-sm mb-3 ml-3 text-black">Media</p>
                  <div className="grid grid-cols-3 gap-2 ml-3 mr-3">
                    {(showAllMedia ? mediaImages : mediaImages.slice(0, 3)).map((src, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={src}
                          alt={`media-${i}`}
                          className="rounded-md cursor-pointer"
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
                  {caseData.media && caseData.media.length > 3 && (
                    <button
                      className="text-sm mb-0 text-gray-700 hover:underline mt-2 ml-3"
                      onClick={() => setShowAllMedia((prev) => !prev)}
                    >
                      {showAllMedia ? "Show less" : `+${caseData.media.length - 3}`}
                    </button>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-black text-sm mb-2 ml-3">Files</p>
                  <ul className="text-sm space-y-2 ml-3 mr-3">
                    {(showAllFiles ? fileList : fileList.slice(0, 1)).map((file, i) => (
                      <li key={i} className="relative group">
                        <div
                          className="bg-gray-200 text-black cursor-pointer px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
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
                  {!showAllFiles && fileList.length > 1 && (
                    <button onClick={() => setShowAllFiles(true)} className="mt-2 mb-0 text-sm ml-3 text-gray-700 hover:underline">
                      +{fileList.length - 1}
                    </button>
                  )}
                  {showAllFiles && fileList.length > 1 && (
                    <button onClick={() => setShowAllFiles(false)} className="text-xs text-gray-500 hover:underline mt-2 ml-3">
                      Show less
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative flex flex-col items-center">
              <button onClick={() => setSelectedImage(null)} className="absolute top-3 right-3 text-white text-xl">✕</button>
              <img
                src={mediaImages[currentImageIndex]}
                alt="Selected"
                className="max-w-[80vw] max-h-[80vh] object-contain rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
