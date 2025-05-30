"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Case } from "@/interface/CaseTypes";
import { fetchCases } from "@/services/CaseService";
import Header from "@/components/Profile/Header";
import BaseButton from "@/components/Global/BaseButton";
import AcceptCaseModal from "@/components/Case/AcceptCaseModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

const getCategoryColor = (category: string | undefined) => {
  if (!category) return "bg-gray-200 text-black"; // fallback

  switch (category.toLowerCase()) {
    case "divorce cases":
      return "bg-green-800 text-white";
    case "land ownership":
      return "bg-orange-600 text-white";
    case "business disputes":
      return "bg-yellow-600 text-black";
    default:
      return "bg-gray-200 text-black";
  }
};


export default function SubmittedCasePage() {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const [showAllMedia, setShowAllMedia] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showingImage, setShowingImage] = useState(true);

  const router = useRouter();
  const params = useParams();
  const case_id = params.caseId as string;
  const userId = params?.user_id as string;
  const API_CASES_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases`;


  useEffect(() => {
    async function loadCase() {
      const response = await fetchCases();
      console.log("API response:", response); // ✅ log data
      console.log("Case ID from params:", case_id); // ✅ log case_id
  
      if (response.success && response.data) {
        const foundCase = response.data.find((c: Case) => {
          console.log(`Comparing URL ID "${case_id}" with Case ID ${c.id} (type: ${typeof c.id})`);
          // Convert API ID to string for comparison OR URL ID to number
          return String(c.id) === case_id; // Safest: Compare as strings
          // OR return c.id === parseInt(case_id, 10); // If you know c.id is always a number
        });
        console.log("Found case:", foundCase); // ✅ log matched case
  
        if (foundCase) {
          console.log("!!! Inspecting foundCase before setting state:", JSON.stringify(foundCase, null, 2));
          console.log("Setting case data...");
          setCaseData({
            ...foundCase,
          });
        }
        else {
          console.error(`Case with ID ${case_id} not found in the fetched list.`);
          // Consider setting an error state here
        }
      }
  
      setLoading(false);
    }
  
    loadCase();
  }, [case_id]);

  const handleCancelCase = async () => {
    try {
      const url = `${API_CASES_URL}/${case_id}/delete/`;

      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include", // to send cookies if you're using session or token in cookies
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

  if (loading || !caseData) return <p className="p-8">Loading...</p>;
  console.log("caseData:", caseData);

  return (
    <>
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
          <div className="bg-red text-white px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => router.push(`/${userId}/submitted-cases`)}
              className="text-white hover:underline"
            >
              ← Back
            </button>
            <Link href={`/${userId}/submitted-cases/${case_id}/edit`} className="text-blue-600 hover:underline flex items-center text-sm">
              Edit <FaEdit className="ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-1 pr-0 pl-8">
            {/* Left Panel */}
            <div className="md:col-span-2 h-[65vh] flex flex-col rounded-xl pr-15 pt-15 overflow-hidden">
              {/* Title */}
              <div className="shrink-0 pt-6 pl-8 pb-0">
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
                      {caseData.case_type}
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
              <div className="flex-grow overflow-y-auto pr-10 pt-0 pl-8">
                <div className="mb-4">
                  <p
                    className={`text-black leading-relaxed whitespace-pre-line transition-all ${
                      isExpanded ? "" : "max-h-20 overflow-hidden"
                    }`}
                  >
                    {caseData.description}
                  </p>
                  <button
                    className="mt-0 text-sm text-gray-500 hover:text-gray-700 font-medium"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                </div>

                {/* Media Display */}
                <div className="mb-0 flex justify-center">
                  <div className="relative mb-0 h-[26vh] w-[22vw]">
                    {showingImage && caseData.image ? (
                      caseData.image.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                        <img
                          src={caseData.image}
                          alt="case visual"
                          className="rounded-md object-cover h-full w-full cursor-pointer"
                          onClick={() => setSelectedImage(caseData.image)}
                        />
                      ) : (
                        <video
                          controls
                          className="rounded-md object-cover h-full w-full"
                          onClick={(e) => e.preventDefault()}
                        >
                          <source src={caseData.image} />
                        </video>
                      )
                    ) : caseData.video ? (
                      <video
                        controls
                        className="rounded-md object-cover h-full w-full"
                        onClick={(e) => e.preventDefault()}
                      >
                        <source src={caseData.video} />
                      </video>
                    ) : null}

                    {/* Navigation - Only show if we have both image and video */}
                    {caseData.image && caseData.video && (
                      <button
                        onClick={() => setShowingImage(!showingImage)}
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black p-2 rounded-full shadow"
                      >
                        <FaExchangeAlt />
                      </button>
                    )}
                  </div>
                </div>

                {/* Thumbnail Toggle */}
                <div className="flex justify-center gap-4 mt-3">
                  {caseData.image && (
                    <button
                      onClick={() => setShowingImage(true)}
                      className={`h-12 w-12 rounded-md overflow-hidden ${
                        showingImage ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      {caseData.image.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                        <img 
                          src={caseData.image} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs">Video</span>
                        </div>
                      )}
                    </button>
                  )}
                  
                  {caseData.video && (
                    <button
                      onClick={() => setShowingImage(false)}
                      className={`h-12 w-12 rounded-md overflow-hidden ${
                        !showingImage ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs">Video</span>
                      </div>
                    </button>
                  )}
                </div>

                <div className="flex justify-center gap-2 mt-3">
                  {(caseData.media ?? []).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        currentImageIndex === index ? "bg-black" : "bg-gray-300"
                      }`}                      
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Panel - Action Buttons */}
              <div className="shrink-0 mt-0 mb-8 ml-8 flex justify-between items-center pr-10">

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
                <img
                  src="/blank-profile.svg"
                  alt="avatar"
                  className="rounded-full w-20 h-20 mx-auto mb-2"
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
            <div className="relative">
              <img
                src={selectedImage}
                alt="enlarged media"
                className="max-h-[80vh] max-w-[80vw] rounded-md"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-white text-black px-2 py-[-2] rounded-full shadow hover:bg-gray-300"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}