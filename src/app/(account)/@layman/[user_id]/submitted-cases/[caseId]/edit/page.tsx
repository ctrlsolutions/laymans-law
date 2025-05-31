'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BaseButton from '@/components/Global/BaseButton';
import { fetchCaseById, updateCase } from '@/services/CaseService';
import { categories } from '@/constants/caseConstants';
import Header from "@/components/Profile/Header";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { getProfile } from "@/services/ProfileServices";


interface Attachment {
  id: string;
  file: string;
}

interface Case {
  id: string;
  title: string;
  description: string;
  case_type: string;
  status: string;
  created_date: string;
  attachments: Attachment[];
  created_by?: {
    first_name: string;
    last_name: string;
    email: string;
    contact_number?: string;
  };
}

const getCategoryColor = (categoryId: string) => {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return "bg-gray-300 text-black";
  
  const isDark = category.color.includes('600') || 
                 category.color.includes('800') || 
                 category.color.includes('blue');
  return `${category.color} ${isDark ? 'text-white' : 'text-black'}`;
};

const getCategoryName = (caseTypeId: string): string => {
  const category = categories.find((c) => c.id === caseTypeId);
  return category ? category.name : caseTypeId;
};

const getFileType = (filename: string) => {
  const imageExtensions = /\.(jpeg|jpg|gif|png|webp)$/i;
  const videoExtensions = /\.(mp4|webm|ogg|mov|avi)$/i;
  
  if (imageExtensions.test(filename)) return 'image';
  if (videoExtensions.test(filename)) return 'video';
  return 'other';
};

export default function EditCasePage() {
  const { caseId, user_id } = useParams();
  const router = useRouter();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [caseData, setCaseData] = useState<Case | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('');
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [cases, setCases] = useState<Case[]>([]);
  

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCaseById(caseId as string);
        
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch case');
        }

        const data = response.data;
        setCaseData(data);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.case_type);
      } catch (err) {
        console.error("Error fetching case data:", err);
        setError(err instanceof Error ? err.message : "Failed to load case data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseData();
  }, [caseId]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      const response = await getProfile();
      if (isMounted) {
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          console.error("Error fetching user data:", response.message);
        }
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    const selectedCategory = categories.find(cat => cat.id === category);

    const updatedCase = {
      title,
      description,
      case_type: category,
      category: selectedCategory || { id: category, name: category, color: 'gray' } // fallback
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

  const handlePrev = () => {
    if (!caseData || !caseData.attachments?.length) return;
    
    if (getFileType(caseData.attachments[currentMediaIndex].file) === 'video') {
      const video = videoRefs.current[currentMediaIndex];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
    
    const newIndex = currentMediaIndex === 0 
      ? caseData.attachments.length - 1 
      : currentMediaIndex - 1;
    setCurrentMediaIndex(newIndex);
  };

  const handleNext = () => {
    if (!caseData || !caseData.attachments?.length) return;
    
    if (getFileType(caseData.attachments[currentMediaIndex].file) === 'video') {
      const video = videoRefs.current[currentMediaIndex];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
    
    const newIndex = (currentMediaIndex + 1) % caseData.attachments.length;
    setCurrentMediaIndex(newIndex);
  };

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

  return (
    <div className="pt-0 max-w-8xl mx-auto min-h-screen mt-0">
      <div className="pb-2 px-0 rounded-b-2xl text-black">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          openCaseCount={cases.length} 
          user={user}
        />
      </div>

      <div className="w-[70vw] h-[73vh] mx-auto rounded-2xl overflow-hidden shadow bg-white mt-5 mb-10">
        <div className="bg-red text-white px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push(`/${user_id}/submitted-cases/${caseId}`)}
            className="text-white hover:underline"
          >
            ← Back to Case
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-1 pr-0 pl-8">
          {/* Left Panel */}
          <div className="md:col-span-2 h-[65vh] flex flex-col rounded-xl pr-15 pt-15 overflow-hidden">
            {/* Title */}
            <div className="shrink-0 pt-3 pl-3 pb-0">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-bold text-black mt-5 mb-2 w-full bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none"
              />
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-black">
                <p>
                  <span className="font-medium">Submitted:</span>{" "}
                  <strong>
                    {new Date(caseData.created_date).toLocaleDateString()}
                  </strong>
                </p>
                <p>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${getCategoryColor(category)}`}
                  >
                    {categories.map((cat) => (
                      <option 
                        key={cat.id} 
                        value={cat.id}
                        className="bg-white text-black"
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>

            {/* Scrollable Middle Panel */}
            <div className="flex-grow overflow-y-auto pr-10 pt-0 pl-3">
              <div className="mb-4">
                <label className="block font-bold text-black mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full border text-black border-gray-300 rounded-md p-3"
                  placeholder="Enter case description"
                />
              </div>

              {/* Media Display */}
              {caseData.attachments?.length > 0 && (
                <>
                  <div className="mb-0 flex justify-center items-center">
                    {caseData.attachments.length > 1 && (
                      <button 
                        onClick={handlePrev}
                        className="p-2 mr-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                      >
                        <IoIosArrowBack color="black"/>
                      </button>
                    )}

                    <div className="relative mb-0 h-[26vh] w-[22vw]">
                      {caseData.attachments.map((attachment, index) => {
                        const fileType = getFileType(attachment.file);
                        
                        return (
                          <div 
                            key={attachment.id}
                            className={`absolute inset-0 transition-opacity duration-300 ${
                              currentMediaIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                          >
                            {fileType === 'image' ? (
                              <img
                                src={attachment.file}
                                alt="case attachment"
                                className="rounded-md object-cover h-full w-full cursor-pointer"
                                onClick={() => {
                                  setSelectedImage(attachment.file);
                                  setCurrentMediaIndex(index);
                                }}
                              />
                            ) : fileType === 'video' ? (
                              <div className="relative h-full w-full">
                                <video
                                  ref={el => {
                                    if (el) {
                                      videoRefs.current[index] = el;
                                    }
                                  }}
                                  controls
                                  className="rounded-md object-cover h-full w-full"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedImage(attachment.file);
                                    setCurrentMediaIndex(index);
                                  }}
                                  preload="metadata"
                                >
                                  <source src={attachment.file} />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ) : (
                              <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                <span>Unsupported file type</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {caseData.attachments.length > 1 && (
                      <button 
                        onClick={handleNext}
                        className="p-2 ml-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                      >
                        <IoIosArrowForward color="black"/>
                      </button>
                    )}
                  </div>

                  <div className="flex justify-center gap-4 mt-3">
                    {caseData.attachments.map((attachment, index) => (
                      <button
                        key={attachment.id}
                        onClick={() => {
                          setSelectedImage(attachment.file);
                          setCurrentMediaIndex(index);
                        }}
                        className={`h-12 w-12 rounded-md overflow-hidden ${
                          currentMediaIndex === index ? "ring-2 ring-blue-500" : ""
                        }`}
                      >
                        {getFileType(attachment.file) === 'image' ? (
                          <img 
                            src={attachment.file} 
                            alt="Preview" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <FaCirclePlay color="white"/>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Bottom Panel - Action Buttons */}
            <div className="shrink-0 mt-0 mb-5 ml-3 flex justify-between items-center pr-10">
              <BaseButton
                color="gray"
                textColor="black"
                onClick={() => router.push(`/${user_id}/submitted-cases/${caseId}`)}
              >
                Cancel
              </BaseButton>
              <BaseButton
                color="red"
                textColor="white"
                onClick={handleSave}
                // disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </BaseButton>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-1 bg-gray-100 p-6 mt-0 border-l border-gray-200 h-[68vh] rounded-l flex flex-col">
            <div className="text-center mb-4 shrink-0">
              <img
                src="/blank-profile.svg"
                alt="avatar"
                className="rounded-full w-20 h-20 mx-auto mb-2"
              />
              <h3 className="text-lg text-black font-semibold">
                {caseData.created_by 
                  ? `${caseData.created_by.first_name} ${caseData.created_by.last_name}` 
                  : "Unknown User"}
              </h3>
              <p className="text-sm text-gray-500 mb-4">Layman</p>
              <div className="text-sm text-gray-700 text-left ml-3">
                <p className="font-semibold">Contact Number</p>
                <p className="mb-2">{caseData.created_by?.contact_number || "Not provided"}</p>
                <p className="font-semibold">Email Address</p>
                <p className="mb-2 text-blue-600">{caseData.created_by?.email || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative flex">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = (currentMediaIndex - 1 + caseData.attachments.length) % caseData.attachments.length;
                setCurrentMediaIndex(newIndex);
                setSelectedImage(caseData.attachments[newIndex].file);
              }}
              className="p-4 mr-4 text-white text-2xl"
            >
              <IoIosArrowBack/>
            </button>
            
            <div onClick={(e) => e.stopPropagation()} className="max-h-[80vh] max-w-[80vw]">
              {getFileType(selectedImage) === 'image' ? (
                <img
                  src={selectedImage}
                  alt="enlarged media"
                  className="rounded-md h-full w-full object-contain"
                />
              ) : (
                <video
                  controls
                  autoPlay
                  playsInline
                  className="rounded-md h-full w-full"
                  key={selectedImage}
                >
                  <source src={selectedImage} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = (currentMediaIndex + 1) % caseData.attachments.length;
                setCurrentMediaIndex(newIndex);
                setSelectedImage(caseData.attachments[newIndex].file);
              }}
              className="p-4 ml-4 text-white text-2xl"
            >
              <IoIosArrowForward/>
            </button>
            
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-300"
            >
              <IoClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}