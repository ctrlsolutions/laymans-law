"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Case } from "@/interface/CaseTypes";
import { fetchCases, acceptCase } from "@/services/CaseService";
import Header from "@/components/Profile/Header";
import BaseButton from "@/components/Global/BaseButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


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
  const [isAccepting, setIsAccepting] = useState(false);
  
  const router = useRouter();
  const params = useParams();
  const case_id = params.case_id as string;

  useEffect(() => {
    async function loadCase() {
      console.log("Effect triggered for case_id:", case_id, "(type:", typeof case_id, ")"); // Log ID from URL

      const response = await fetchCases();
      console.log("fetchCases response:", response); // Log the full response

      if (response.success && response.data) {
        console.log("Cases data received:", response.data);

        const foundCase = response.data.find((c: Case) => {
          console.log(`Comparing URL ID "${case_id}" with Case ID ${c.id} (type: ${typeof c.id})`);
          // Convert API ID to string for comparison OR URL ID to number
          return String(c.id) === case_id; // Safest: Compare as strings
          // OR return c.id === parseInt(case_id, 10); // If you know c.id is always a number
        });

        console.log("Result of .find():", foundCase); // See if it found anything

        if (foundCase) {
          console.log("!!! Inspecting foundCase before setting state:", JSON.stringify(foundCase, null, 2));
          console.log("Setting case data...");
          setCaseData({
            ...foundCase,
            media: foundCase.media ?? [], // Default to an empty array if media is undefined
            files: foundCase.files ?? [],
          });
        }
        else {
          console.error(`Case with ID ${case_id} not found in the fetched list.`);
          // Consider setting an error state here
        }
      }
      else {
        console.error("Failed to fetch cases or response.data is not an array.");
        // Consider setting an error state here
     }
      console.log("Setting loading to false.");
      setLoading(false);
    }

    loadCase();
  }, [case_id]);

  const handleAcceptCase = async () => {
    if (!case_id) {
      alert("Error: Case ID is missing.");
      return;
    }

    setIsAccepting(true); // Disable button, show loading indicator (optional)
    setError(null); // Clear previous errors

    const response = await acceptCase(case_id);

    if (response.success) {
      alert("Case accepted successfully!"); // Or use a better notification system
      // Optionally update the local caseData state if needed, e.g.:
      // setCaseData(response.data);
      router.push("/browse"); // Navigate after success
    } else {
      // Show error message from the API response
      setError(response.message || "Failed to accept the case. Please try again.");
      alert(`Error: ${response.message || "Failed to accept the case."}`); // Simple alert for now
      setIsAccepting(false); // Re-enable button
    }
    // We set isAccepting false only on error, because on success we navigate away
  };

  const handleDownload = (fileName: string) => {
    const link = document.createElement("a");
    link.href = `/mock/files/${fileName}`;
    link.download = fileName;
    link.click();
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (caseData?.media?.length ?? 0) - 1 : prev - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (caseData?.media?.length ?? 1) - 1 ? 0 : prev + 1
    );
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>; // Show specific error
  if (!caseData) return <p className="p-8">Case not found.</p>; // Specific message if no data after loading/no error


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
          <div className="bg-violet-950 text-white px-8 py-4">
            <button
              onClick={() => router.back()}
              className="text-white hover:underline"
            >
              ← Back to Submitted Cases
            </button>
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

                {/* Media */}
                {caseData.media && caseData.media.length > 0 && (
                  <div className="mb-0 flex justify-center">
                    <div className="relative mb-0 h-[26vh] w-[22vw]">
                      <img
                        src={caseData.media[currentImageIndex]}
                        alt="case visual"
                        className="rounded-md object-cover h-full w-full cursor-pointer"
                        onClick={() =>
                          setSelectedImage(caseData.media?.[currentImageIndex] || null)
                        }
                      />
                      {caseData.media.length > 1 && (
                        <>
                          <button
                            onClick={showPrevImage}
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black p-2 rounded-full shadow"
                          >
                            <FaChevronLeft />
                          </button>
                          <button
                            onClick={showNextImage}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black p-2 rounded-full shadow"
                          >
                            <FaChevronRight />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

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
                <div className="flex justify-between items-center w-full"> {/* Wrapper for buttons */}
                  <BaseButton
                      color="violet"
                      textColor="white"
                      // Call the new handler
                      onClick={handleAcceptCase}
                      // Disable button while processing
                      disabled={isAccepting}
                  >
                      {/* Show loading text */}
                      {isAccepting ? "Accepting..." : "Accept Case"}
                  </BaseButton>

                  {/* <BaseButton
                      color="red"
                      textColor="white"
                      onClick={() => {
                        // Keep decline mock or implement similarly if needed
                        alert("Case declined (mock)");
                        router.push("/dashboard/cases");
                      }}
                      disabled={isAccepting} // Also disable decline during accept
                  >
                      Decline Case
                  </BaseButton> */}
                </div>
                  {/* Display Accept/Decline Errors */}
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            </div>

            {/* Right Panel */}
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

              {/* Scrollable Section */}
              <div className="flex-grow overflow-y-auto space-y-2 pr-1">
              {/* Media */}
              <div>
                <p className="font-semibold text-sm mb-3 ml-3 text-black">Media</p>
                <div className="grid grid-cols-3 gap-2 ml-3 mr-3">
                  {(showAllMedia ? caseData.media : caseData.media?.slice(0, 3))?.map(
                    (src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`media-${i}`}
                        className="rounded-md cursor-pointer"
                        onClick={() => setSelectedImage(src)}
                      />
                    )
                  )}
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


              {/* Files */}
              <div>
                <p className="font-semibold text-black text-sm mb-2 ml-3">Files</p>
                <ul className="space-y-2">
                  {(showAllFiles ? caseData.files : caseData.files?.slice(0, 1))?.map(
                    (file, i) => (
                      <li
                        key={i}
                        onClick={() => handleDownload(file)}
                        className="bg-gray-200 text-sm text-black cursor-pointer px-4 py-2 ml-3 mr-3 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        {file}
                      </li>
                    )
                  )}
                </ul>

                {caseData.files && caseData.files.length > 3 && (
                  <button
                    className="mt-2 mb-0 text-sm ml-3 text-gray-700 hover:underline"
                    onClick={() => setShowAllFiles((prev) => !prev)}
                  >
                    {showAllFiles
                      ? "Show less"
                      : `+${caseData.files.length - 1}`}
                  </button>
                )}
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
                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-3 text-white bg-black bg-opacity-50 px-2 py-1 rounded hover:bg-opacity-75"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
