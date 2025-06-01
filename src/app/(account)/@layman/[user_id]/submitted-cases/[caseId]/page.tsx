"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Case } from "@/interface/CaseTypes";
import { fetchCases } from "@/services/CaseService";
import Header from "@/components/Profile/Header";
import BaseButton from "@/components/Global/BaseButton";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
import { getProfile } from "@/services/ProfileServices";
import { categories } from "@/constants/caseConstants";

export default function SubmittedCasePage() {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const router = useRouter();
  const params = useParams();
  const case_id = params.caseId as string;
  const userId = params?.user_id as string;
  const API_CASES_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases`;

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

  useEffect(() => {
    if (caseData?.attachments?.length) {
      caseData.attachments.forEach((attachment, index) => {
        const fileType = getFileType(attachment.file);
        
        if (fileType === 'image') {
          const img = document.createElement('img');
          img.onload = () => console.log(`Image ${index} loaded: ${attachment.file}`);
          img.onerror = () => console.error(`Failed to load image ${index}: ${attachment.file}`);
          img.src = attachment.file;
        } else if (fileType === 'video') {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.onloadedmetadata = () => console.log(`Video ${index} metadata loaded: ${attachment.file}`);
          video.onerror = () => console.error(`Failed to load video ${index}: ${attachment.file}`);
          video.src = attachment.file;
          
          video.style.display = 'none';
          document.body.appendChild(video);
          
          setTimeout(() => {
            document.body.removeChild(video);
          }, 1000);
        }
      });
    }
  }, [caseData]);

  useEffect(() => {
    if (caseData?.attachments?.length) {
      caseData.attachments.forEach((attachment, index) => {
        const fileType = getFileType(attachment.file);
        
        if (fileType === 'image') {
          const img = document.createElement('img');
          img.onload = () => console.log(`Image attachment ${index} loaded successfully`);
          img.onerror = () => console.error(`Failed to load image attachment ${index}`);
          img.src = attachment.file;
        } else if (fileType === 'video') {
          const video = document.createElement('video');
          video.oncanplay = () => console.log(`Video attachment ${index} loaded successfully`);
          video.onerror = () => console.error(`Failed to load video attachment ${index}`);
          video.src = attachment.file;
        }
      });
    }
  }, [caseData]);

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      const isOverflowing = element.scrollHeight > element.clientHeight;
      setHasOverflow(isOverflowing);
    }
  }, [caseData?.description]);

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

  useEffect(() => {
    async function loadCase() {
      const response = await fetchCases();
      console.log("API response:", response);
      console.log("Case ID from params:", case_id); 
  
      if (response.success && response.data) {
        const foundCase = response.data.find((c: Case) => {
          console.log(`Comparing URL ID "${case_id}" with Case ID ${c.id} (type: ${typeof c.id})`);
          return String(c.id) === case_id; 
        });
        console.log("Found case:", foundCase);
  
        if (foundCase) {
          console.log("Case attachments:", foundCase.attachments);
          console.log("First attachment URL:", foundCase.attachments?.[0]?.file);
          setCaseData({
            ...foundCase,
          });
        }
        else {
          console.error(`Case with ID ${case_id} not found in the fetched list.`);
        }
      }
  
      setLoading(false);
    }
  
    loadCase();
  }, [case_id]);

  const getFileType = (filename: string) => {
    const imageExtensions = /\.(jpeg|jpg|gif|png|webp)$/i;
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi)$/i;
    
    if (imageExtensions.test(filename)) return 'image';
    if (videoExtensions.test(filename)) return 'video';
    return 'other';
  };


  const handleCancelCase = async () => {
    try {
      const url = `${API_CASES_URL}/${case_id}/delete/`;

      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        alert("Case successfully deleted.");
        router.push(`/${userId}/submitted-cases`);
      } else {
        alert("Failed to delete case: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting case:", error);
      alert("An unexpected error occurred.");
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

  if (loading || !caseData) return <p className="p-8">Loading...</p>;
  console.log("caseData:", caseData);

  return (
    <>
      <div className="pt-0 max-w-8xl mx-auto min-h-screen mt-0">
        <div className="pb-2 px-0 rounded-b-2xl text-black">
          <Header 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            openCaseCount={0} 
            user={user}
          />
        </div>

        <div className="w-[70vw] h-[73vh] mx-auto rounded-2xl overflow-hidden shadow bg-white mt-5 mb-10">
          <div className="bg-violet-950 text-white px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => router.push(`/${userId}/submitted-cases`)}
              className="text-white hover:underline"
            >
              ← Back
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-1 pr-0 pl-8">
            {/* Left Panel */}
            <div className="md:col-span-2 h-[65vh] flex flex-col rounded-xl pr-15 pt-15 overflow-hidden">
              {/* Title */}
              <div className="shrink-0 pt-3 pl-3 pb-0">
                <h2 className="text-3xl font-bold text-black mt-5 mb-2">
                  {caseData.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-black">
                  <p>
                    <span className="font-medium">Submitted:</span>{" "}
                    <strong>
                      {new Date(caseData.created_date).toLocaleDateString()}
                    </strong>
                  </p>
                  <p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${getCategoryColor(
                        caseData.case_type
                      )}`}
                    >
                      {getCategoryName(caseData.case_type)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 overflow-y-auto px-3">
                <p
                  ref={descriptionRef}
                  className={`text-sm text-gray-700 ${
                    hasOverflow ? "line-clamp-3" : ""
                  }`}
                >
                  {caseData.description}
                </p>
                {hasOverflow && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-500 text-sm mt-1"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>

              {/* Media Gallery */}
              <div className="shrink-0 mt-4">
                <div className="flex items-center justify-center">
                  {/* Previous button */}
                  {caseData.attachments?.length > 1 && (
                    <button 
                      onClick={handlePrev}
                      className="p-2 mr-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <IoIosArrowBack color="black"/>
                    </button>
                  )}

                  {/* Media container */}
                  <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    {caseData.attachments?.map((attachment, index) => {
                      const fileType = getFileType(attachment.file);
                      
                      return (
                        <div 
                          key={attachment.id}
                          className={`absolute inset-0 transition-opacity duration-300 ${
                            currentMediaIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                        >
                          {fileType === 'image' ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={attachment.file}
                                alt="case attachment"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="rounded-md object-cover cursor-pointer"
                                onClick={() => {
                                  setSelectedImage(attachment.file);
                                  setCurrentMediaIndex(index);
                                }}
                              />
                            </div>
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
                                onPause={() => {
                                  if (currentMediaIndex !== index && videoRefs.current[index]) {
                                    videoRefs.current[index]!.currentTime = 0;
                                  }
                                }}
                              >
                                <source 
                                  src={attachment.file} 
                                  type={`video/${attachment.file.split('.').pop()}`}
                                />
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

                  {/* Next button */}
                  {caseData.attachments?.length > 1 && (
                    <button 
                      onClick={handleNext}
                      className="p-2 ml-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <IoIosArrowForward color="black"/>
                    </button>
                  )}
                </div>

                {/* Thumbnail Toggle */}
                <div className="flex justify-center gap-4 mt-3">
                  {caseData.attachments?.map((attachment, index) => (
                    <button
                      key={attachment.id}
                      onClick={() => {
                        setSelectedImage(attachment.file)
                        setCurrentMediaIndex(index);
                      }}
                      className={`h-12 w-12 rounded-md overflow-hidden ${
                        currentMediaIndex === index ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      {getFileType(attachment.file) === 'image' ? (
                        <Image 
                          src={attachment.file} 
                          alt="Preview" 
                          width={48}
                          height={48}
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
              </div>

              {/* Bottom Panel - Action Buttons */}
              <div className="shrink-0 mt-0 mb-5 ml-3 flex justify-between items-center pr-10">
                <BaseButton
                  color="red"
                  textColor="white"
                  onClick={handleCancelCase}
                >
                  Delete Case
                </BaseButton> 
              </div>
            </div>

            {/* Right Panel */}
            <div className="md:col-span-1 bg-gray-100 p-6 mt-0 border-l border-gray-200 h-[68vh] rounded-l flex flex-col">
              <div className="text-center mb-4 shrink-0">
                <Image
                  src="/blank-profile.svg"
                  alt="avatar"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-2"
                />
                <h3 className="text-lg text-black font-semibold">
                  { caseData.created_by 
                  ? `${caseData.created_by.first_name} ${caseData.created_by.last_name}` 
                  : "Unknown User" }
                </h3>
                <p className="text-sm text-gray-500 mb-4">Layman</p>
                <div className="text-sm text-gray-700 text-left ml-3">
                  <p className="font-semibold">Contact Number</p>
                  <p className="mb-2">{caseData.created_by?.contact_number}</p>
                  <p className="font-semibold">Email Address</p>
                  <p className="mb-2 text-blue-600">{caseData.created_by?.email || "Not Provided"}</p>
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
              {/* Previous button */}
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
              
              {/* Media display */}
              <div onClick={(e) => e.stopPropagation()} className="relative max-h-[60vh] max-w-[60vw]">
                {getFileType(selectedImage) === 'image' ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedImage}
                      alt="enlarged media"
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="rounded-md object-contain"
                    />
                  </div>
                ) : (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="rounded-md h-full w-full"
                    key={selectedImage}
                  >
                    <source 
                      src={selectedImage} 
                      type={`video/${selectedImage.split('.').pop()}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              {/* Next button */}
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
              
              {/* Close button */}
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
    </>
  );
}