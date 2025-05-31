"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Case } from "@/interface/CaseTypes";
import { fetchCases, acceptCase } from "@/services/CaseService";
import Header from "@/components/Profile/Header";
import BaseButton from "@/components/Global/BaseButton";
import { categories } from "@/constants/caseConstants";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "divorce cases":
      return "bg-green-800 text-white";
    case "land ownership":
      return "bg-cyan-400 border border-blue-400 text-black";
      case "civil rights":
        return "bg-blue text-white";
    case "environmental law":
      return "bg-fuchsia-600 text-white";
    case "human rights":
      return "bg-rose-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

export default function AcceptCasePage() {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllMedia, setShowAllMedia] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [isAccepting, setIsAccepting] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  
  const router = useRouter();
  const params = useParams();
  const case_id = params.case_id as string;

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
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      const isOverflowing = element.scrollHeight > element.clientHeight;
      setHasOverflow(isOverflowing);
    }
  }, [caseData?.description]);

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

  const handleAcceptCase = async () => {
    if (!case_id) {
      alert("Error: Case ID is missing.");
      return;
    }

    setIsAccepting(true);
    setError(null); 

    const response = await acceptCase(case_id);

    if (response.success) {
      toast.success("Case accepted");
      setTimeout(() => {
        router.push("/browse");
      }, 3000);
    } else {
      setError(response.message || "Failed to accept the case. Please try again.");
      toast.error(`Error: ${response.message || "Failed to accept the case."}`);
      setIsAccepting(false); 
    }
  };


  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>; // Show specific error
  if (!caseData) return <p className="p-8">Case not found.</p>; // Specific message if no data after loading/no error


  return (
    <>
      <ToastContainer />
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
          <div className="bg-violet-950 text-white px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => router.push(`/browse`)}
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
                  <p>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        caseData.status === "open"
                          ? "bg-green-500"
                          : caseData.status === "ongoing"
                          ? "bg-yellow-500"
                          : "bg-red"
                      }`}
                    >
                      {caseData.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Scrollable Middle Panel */}
              <div className="flex-grow overflow-y-auto pr-10 pt-0 pl-3">
                <div className="mb-4">
                  <p
                    ref={descriptionRef}
                    className={`text-black leading-relaxed whitespace-pre-line transition-all ${
                      isExpanded ? "" : "max-h-20 overflow-hidden"
                    }`}
                  >
                    {caseData.description}
                  </p>
                  {hasOverflow && (
                    <button
                      className="mt-0 text-xs text-gray-500 hover:text-gray-700 font-medium"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>

                {/* Media Display */}
                <div className="mb-0 flex justify-center items-center">

                  {/* Previous button */}
                  {caseData.attachments?.length > 1 && (
                    <button 
                      onClick={handlePrev}
                      className="p-2 mr-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <IoIosArrowBack color="black"/>
                    </button>
                  )}

                  <div className="relative mb-0 h-[26vh] w-[22vw]">
                    {caseData.attachments?.length > 0 && (
                      caseData.attachments.map((attachment, index) => {
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
                      })
                    )}
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
              </div>

              {/* Bottom Panel - Action Buttons */}
              <div className="shrink-0 mt-0 mb-5 ml-3 flex justify-between items-center pr-10">

                <BaseButton
                  color="blue"
                  textColor="white"
                  onClick={handleAcceptCase}
                >
                  Accept Case
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
                  <p>Anonymous</p>
                </h3>
                <p className="text-sm text-gray-500 mb-4">Layman</p>
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