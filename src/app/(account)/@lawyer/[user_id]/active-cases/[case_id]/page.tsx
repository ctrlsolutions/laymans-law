"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Case, Comment } from "@/interface/CaseTypes";
import { fetchCases } from "@/services/CaseService";
import { fetchComments, addComment } from "@/services/CommentServices";
import Header from "@/components/Profile/Header";
import BaseButton from "@/components/Global/BaseButton";
import CommentCard from "@/components/Case/CommentCard";
import { categories } from "@/constants/caseConstants";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

export default function AcceptCasePage() {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]); 
  const [newComment, setNewComment] = useState('');

  const router = useRouter();
  const params = useParams();
  const case_id = params.case_id as string;
  const userId = params?.user_id as string;

  const API_CASES_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases`;

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
        const foundCase = (response.data as Case[]).find((c: Case) => {
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
          setSelectedImage(null);
        }
        else {
          console.error(`Case with ID ${case_id} not found in the fetched list.`);
        }
      }
  
      setLoading(false);
    }
  
    loadCase();
  }, [case_id]);

  useEffect(() => {
    async function loadComments() {
      if (case_id) {
        const response = await fetchComments(case_id) as { success: boolean; data: Comment[]; message?: string };
        if (response.success) {
          setComments(response.data);
        }
      }
    }
    
    if (caseData) {
      loadComments();
    }
  }, [case_id, caseData]);

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

  const handleCloseCase = async () => {

    try {
      const url = `${API_CASES_URL}/${case_id}/close/`;

      const res = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Case successfully closed.");
        setTimeout(() => {
          router.push(`/${userId}/active-cases/`);
        }, 3000);
      } else {
        toast.error("Failed to close case: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error closing case:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    
    const response = await addComment(case_id, newComment);
    if (response.success) {
      setComments([...comments, response.data as Comment]);
      setNewComment('');
      toast.success(response.message);
    } else {
      toast.error(response.error || "Failed to add comment");
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!caseData) return <p className="p-8">Case not found.</p>;

  const isCaseAccepted = caseData?.status === 'ongoing' && caseData?.assigned_to !== null;

  return (
    <>
      <ToastContainer />
      <div className="pt-0 max-w-8xl mx-auto min-h-screen mt-0">
        <div className="pb-2 px-0 rounded-b-2xl text-black">
          <Header 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            openCaseCount={0} 
            user={null} 
          />
        </div>

        <div className="w-[70vw] h-[73vh] mx-auto rounded-2xl overflow-hidden shadow bg-white mt-5 mb-10">
          <div className="bg-violet-950 text-white px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => router.push(`/${userId}/active-cases`)}
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                        caseData.case_type === "divorce cases"
                          ? "bg-green-800 text-white"
                          : caseData.case_type === "land ownership"
                          ? "bg-cyan-400 border border-blue-400 text-black"
                          : caseData.case_type === "civil rights"
                          ? "bg-blue text-white"
                          : caseData.case_type === "environmental law"
                          ? "bg-fuchsia-600 text-white"
                          : caseData.case_type === "human rights"
                          ? "bg-rose-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
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
                              <div className="relative h-full w-full">
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
                        <div className="relative h-full w-full">
                          <Image
                            src={attachment.file}
                            alt="Preview"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="rounded-md object-cover"
                          />
                        </div>
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
                {caseData.status === 'closed' ? (
                  <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
                    Case has been closed
                  </div>
                ) : (
                  <BaseButton
                    color="blue"
                    textColor="white"
                    onClick={handleCloseCase}
                    disabled={caseData.status === 'closed'}
                  >
                    Close Case
                  </BaseButton>
                )}
              </div>
            </div>

            {/* Right Panel */}
            
            <div className="md:col-span-1 bg-gray-100 p-6 mt-0 border-l border-gray-200 h-[68vh] rounded-l flex flex-col">
              <p className="text-xxs text-black font-semibold mb-2">Posted by:</p>
              <div className="flex justify-center items-center text-xxs mb-4 shrink-0">
                <div>
                  <Image
                    src="/blank-profile.svg"
                    alt="avatar"
                    className="rounded-full w-10 h-10 mx-auto mb-2"
                    width={40}
                    height={40}
                    priority
                  />
                </div>
                <div className="text-gray-700 text-left ml-3">
                  <h3 className="text-black">
                    <b>Name:</b> { caseData.created_by 
                    ? `${caseData.created_by.first_name} ${caseData.created_by.last_name}` 
                    : "Unknown User" }
                  </h3>
                  <p className="mb-0"><b>Contact Number:</b> {caseData.created_by?.contact_number}</p>
                  <p className="mb-2"><b>Email:</b> {caseData.created_by?.email || "Not Provided"}</p>
                </div>
              </div>
              <div className="flex flex-col h-full mb-2 bg-gray-200 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm text-gray-500 font-semibold">
                    Comments 
                  </p>
                  <div className="bg-blue rounded-full text-xxs px-1.5 py-0.5 font-semibold">
                    {comments.length}
                  </div>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[36vh]">
                  {comments.length > 0 ? (
                    (comments as Comment[]).map((comment) => (
                      <CommentCard
                        key={comment.id}
                        comment={comment}
                        currentUserId={undefined}
                        isCaseAccepted={isCaseAccepted}
                      />
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 text-center py-4">No comments yet</p>
                  )}
                </div>
              </div>
              <div className="flex mb-4 gap-2">
                <input 
                  type="text" 
                  placeholder="Enter a comment..." 
                  className="rounded-md w-full px-2 py-1 text-xs text-black"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button 
                  className="flex bg-blue rounded-full items-center p-2"
                  onClick={handleAddComment}
                >
                  <IoSend color="white"/>
                </button>
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
            <div className="relative flex" onClick={(e) => e.stopPropagation()}>
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
              <div className="relative flex-1 flex items-center justify-center">
                {getFileType(selectedImage) === 'image' ? (
                  <Image
                    src={selectedImage}
                    alt="enlarged media"
                    width={1000}
                    height={800}
                    className="rounded-md object-contain h-[80vh] w-auto"
                  />
                ) : (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="rounded-md h-[80vh] w-auto"
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
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
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