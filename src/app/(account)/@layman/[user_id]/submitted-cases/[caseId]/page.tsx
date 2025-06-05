"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Case, Comment } from "@/interface/CaseTypes";
import { fetchCaseById } from "@/services/CaseService";
import { fetchComments, addComment } from "@/services/CommentServices";
import Header from "@/components/Profile/Header";
import BaseButton from "@/components/Global/BaseButton";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { getProfile } from "@/services/ProfileServices";
import { categories } from "@/constants/caseConstants";
import { User } from "@/interface/AuthTypes";
import { toast, ToastContainer } from "react-toastify";
import { FaCirclePlay } from "react-icons/fa6";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

export default function SubmittedCasePage() {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const router = useRouter();
  const params = useParams();
  const case_id = params.caseId as string;
  const userId = params?.user_id as string;
  const API_CASES_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases`;

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return "bg-gray-300 text-black";

    const isDark =
      category.color.includes("600") ||
      category.color.includes("800") ||
      category.color.includes("blue");
    return `${category.color} ${isDark ? "text-white" : "text-black"}`;
  };

  const getCategoryName = (caseTypeId: string): string => {
    const category = categories.find((c) => c.id === caseTypeId);
    return category ? category.name : caseTypeId;
  };

  useEffect(() => {
    if (caseData?.attachments?.length) {
      caseData.attachments.forEach((attachment, index) => {
        const fileType = getFileType(attachment.file);

        if (fileType === "image") {
          const img = document.createElement("img");
          img.onload = () =>
            console.log(`Image ${index} loaded: ${attachment.file}`);
          img.onerror = () =>
            console.error(`Failed to load image ${index}: ${attachment.file}`);
          img.src = attachment.file;
        } else if (fileType === "video") {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.onloadedmetadata = () =>
            console.log(`Video ${index} metadata loaded: ${attachment.file}`);
          video.onerror = () =>
            console.error(`Failed to load video ${index}: ${attachment.file}`);
          video.src = attachment.file;

          video.style.display = "none";
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

        if (fileType === "image") {
          const img = document.createElement("img");
          img.onload = () =>
            console.log(`Image attachment ${index} loaded successfully`);
          img.onerror = () =>
            console.error(`Failed to load image attachment ${index}`);
          img.src = attachment.file;
        } else if (fileType === "video") {
          const video = document.createElement("video");
          video.oncanplay = () =>
            console.log(`Video attachment ${index} loaded successfully`);
          video.onerror = () =>
            console.error(`Failed to load video attachment ${index}`);
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
          setUser(response.data as User);
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
      const response = await fetchCaseById(case_id);
      console.log("API response for single case:", response);
      console.log("Case ID from params:", case_id);

      if (response.success && response.data) {
        setCaseData({
          ...(response.data as Case),
        });
        console.log("Case data loaded:", response.data);
      } else {
        console.error(
          `Case with ID ${case_id} not found or failed to fetch:`,
          response.message
        );
      }

      setLoading(false);
    }

    loadCase();
  }, [case_id]);

  useEffect(() => {
    async function loadComments() {
      if (case_id) {
        const response = (await fetchComments(case_id)) as {
          success: boolean;
          data: Comment[];
          message?: string;
        };
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

    if (imageExtensions.test(filename)) return "image";
    if (videoExtensions.test(filename)) return "video";
    return "other";
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
        toast.success("Case deleted");
        setTimeout(() => {
          router.push(`/${userId}/submitted-cases/`);
        }, 3000);
      } else {
        toast.error(
          "Failed to delete case: " + (data.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error deleting case:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handlePrev = () => {
    if (!caseData || !caseData.attachments?.length) return;

    if (getFileType(caseData.attachments[currentMediaIndex].file) === "video") {
      const video = videoRefs.current[currentMediaIndex];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }

    const newIndex =
      currentMediaIndex === 0
        ? caseData.attachments.length - 1
        : currentMediaIndex - 1;
    setCurrentMediaIndex(newIndex);
  };

  const handleNext = () => {
    if (!caseData || !caseData.attachments?.length) return;

    if (getFileType(caseData.attachments[currentMediaIndex].file) === "video") {
      const video = videoRefs.current[currentMediaIndex];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }

    const newIndex = (currentMediaIndex + 1) % caseData.attachments.length;
    setCurrentMediaIndex(newIndex);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await addComment(case_id, newComment);
      if (response.success) {
        setComments([...comments, response.data as Comment]);
        setNewComment("");
        toast.success(response.message || "Comment added successfully");
      } else {
        toast.error(
          response.error || response.message || "Failed to add comment"
        );
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("An unexpected error occurred while adding the comment");
    }
  };

  if (loading || !caseData) return <p className="p-8">Loading...</p>;
  console.log("caseData:", caseData);

  return (
    <>
      <ToastContainer />
      <div className="pt-0 max-w-8xl mx-auto min-h-screen mt-0">
        <div className="pb-2 px-0 rounded-b-2xl text-black">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            openCaseCount={0}
            user={user ? { firstName: user.first_name } : null}
          />
        </div>

        <div className="w-[70vw] h-[73vh] mx-auto rounded-2xl overflow-hidden shadow bg-white mt-5 mb-10">
          <div className="bg-red text-white px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => router.push(`/${userId}/submitted-cases`)}
              className="text-white hover:underline"
            >
              ← Back
            </button>
            <Link
              href={`/${userId}/submitted-cases/${case_id}/edit`}
              className="text-blue-600 hover:underline flex items-center text-sm"
            >
              Edit <FaEdit className="ml-1" />
            </Link>
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
                  <span className="font-medium">Submitted:</span>{" "}
                  <strong>
                    {new Date(caseData.created_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </strong>
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
                <div className="mb-0 flex justify-center items-center">
                  {/* Previous button */}
                  {caseData.attachments?.length > 1 && (
                    <button
                      onClick={handlePrev}
                      className="p-2 mr-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <IoIosArrowBack color="black" />
                    </button>
                  )}

                  <div className="relative mb-0 h-[26vh] w-[22vw]">
                    {caseData.attachments?.length > 0 &&
                      caseData.attachments.map((attachment, index) => {
                        const fileType = getFileType(attachment.file);

                        return (
                          <div
                            key={attachment.id}
                            className={`absolute inset-0 transition-opacity duration-300 ${
                              currentMediaIndex === index
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                            }`}
                          >
                            {fileType === "image" ? (
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
                            ) : fileType === "video" ? (
                              <div className="relative h-full w-full">
                                <video
                                  ref={(el) => {
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
                                    if (
                                      currentMediaIndex !== index &&
                                      videoRefs.current[index]
                                    ) {
                                      videoRefs.current[index]!.currentTime = 0;
                                    }
                                  }}
                                >
                                  <source
                                    src={attachment.file}
                                    type={`video/${attachment.file
                                      .split(".")
                                      .pop()}`}
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
                      <IoIosArrowForward color="black" />
                    </button>
                  )}
                </div>

                {/* Thumbnail Carousel */}
                <div className="flex justify-center gap-4 mt-3">
                  {caseData.attachments?.map((attachment, index) => (
                    <button
                      key={attachment.id}
                      onClick={() => {
                        setCurrentMediaIndex(index);
                      }}
                      className={`h-12 w-12 rounded-md overflow-hidden ${
                        currentMediaIndex === index
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      {getFileType(attachment.file) === "image" ? (
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
                          <FaCirclePlay className="text-4xl text-gray-400" />
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
              {/* Comments Section */}
              <div className="flex flex-col flex-grow overflow-y-auto mb-4">
                <div className="flex items-center mb-4">
                  <h4 className="text-lg font-semibold text-black">Comments</h4>
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-red text-white rounded-full">
                    {comments.length}
                  </span>
                </div>
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center">
                    No comments yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-white p-3 rounded-md shadow-sm"
                      >
                        <p className="text-sm text-gray-800 break-words">
                          {comment.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          By {comment.author?.first_name || "Unknown"} on{" "}
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Comment Input Area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter a comment..."
                  className="rounded-md w-full px-2 py-1 text-sm text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                />
                <button
                  className="flex-shrink-0 w-10 h-10 bg-red rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  onClick={handleAddComment}
                >
                  <IoSend color="white" size={20} />
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
                  const newIndex =
                    (currentMediaIndex - 1 + caseData.attachments.length) %
                    caseData.attachments.length;
                  setCurrentMediaIndex(newIndex);
                  setSelectedImage(caseData.attachments[newIndex].file);
                }}
                className="p-4 mr-4 text-white text-2xl"
              >
                <IoIosArrowBack />
              </button>

              {/* Media display */}
              <div className="relative flex-1 flex items-center justify-center">
                {getFileType(selectedImage) === "image" ? (
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
                      type={`video/${selectedImage.split(".").pop()}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Next button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex =
                    (currentMediaIndex + 1) % caseData.attachments.length;
                  setCurrentMediaIndex(newIndex);
                  setSelectedImage(caseData.attachments[newIndex].file);
                }}
                className="p-4 ml-4 text-white text-2xl"
              >
                <IoIosArrowForward />
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
