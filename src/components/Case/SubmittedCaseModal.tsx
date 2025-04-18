import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";
import BaseButton from "@/components/Global/BaseButton";
import EditCaseModal from "@/components/Case/EditCaseModal";



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

interface CaseModalProps {
  caseData: Case;
  onClose: () => void;
}

const CaseModal: React.FC<CaseModalProps> = ({ caseData, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllMedia, setShowAllMedia] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  

  const mediaImages = caseData.media ?? [
    "/defaultphoto.jpg",
    "/defaultphoto.jpg",
    "/defaultphoto.jpg",
    "/defaultphoto.jpg",
    "/defaultphoto.jpg",
    "/defaultphoto.jpg",
    "/defaultphoto.jpg",
    "/defaultphoto.jpg",
  ];

  const fileList = caseData.files ?? [
    "witness_report.pdf",
    "cctv_footage.mp4",
    "suspect_profile.docx",
    "court_documents.pdf",
    "photos.zip",
  ];

  // Commented-out real API calls for now
  /*
  const handleAccept = async () => {
    try {
      const response = await fetch(`/api/cases/${caseData.id}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        alert("Case accepted successfully");
        onClose();
      } else {
        console.error("Failed to accept case:", result.message);
      }
    } catch (error) {
      console.error("Error during accept:", error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await fetch(`/api/cases/${caseData.id}/decline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        alert("Case declined successfully");
        onClose();
      } else {
        console.error("Failed to decline case:", result.message);
      }
    } catch (error) {
      console.error("Error during decline:", error);
    }
  };
  */

  const handleAccept = () => {
    alert("Case accepted (mock)");
    onClose();
  };

  const handleDecline = () => {
    alert("Case declined (mock)");
    onClose();
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? mediaImages.length - 1 : prev - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === mediaImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleDownload = (fileName: string) => {
    const link = document.createElement("a");
    link.href = `/mock/files/${fileName}`;
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-[728px] h-[728px] flex overflow-hidden">
          {/* Left Panel */}
          <div className="w-2/3 p-6 flex flex-col h-full">
            {/* Top Panel */}
            <div className="mb-4">
              <button onClick={onClose} className="text-gray-500 hover:text-black mb-4">
                ← Back to Submitted Cases
              </button>
              <h2 className="text-3xl font-bold mb-2">{caseData.title}</h2>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm text-gray-500">
                  Submitted: <strong>{new Date(caseData.createdAt).toLocaleDateString()}</strong>
                </p>
                <button
                  onClick={() => 
                    setIsEditModalOpen(true)}
                    // Commented-out logic for real fetch
                    /*
                    fetch(`/api/cases/${caseData.id}`)
                      .then(res => res.json())
                      .then(data => {
                        navigate(`/edit-case/${caseData.id}`, { state: { case: data } });
                      })
                      .catch(err => console.error("Failed to fetch case before editing", err));
                    */

                    // Temporary mock navigation
    
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-black hover:underline transition-colors"
                >
                  <span>Edit</span>
                  <FaPen className="w-3 h-3" />
                </button>
                
              </div>
            </div>

            {/* Middle Scrollable Panel */}
            <div className="flex-grow overflow-y-auto pr-2 mb-4">
              <div className="mb-4">
                <p
                  className={`text-gray leading-relaxed whitespace-pre-line transition-all duration-300 ease-in-out ${
                    isExpanded ? "" : "max-h-24 overflow-hidden"
                  }`}
                >
                  {caseData.description}
                </p>
                <button
                  className="mt-2 text-sm text-gray-500 hover:text-gray-700 font-medium"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              </div>

            {/* Media Viewer */}
            {mediaImages.length > 0 && (
              <div className="mb-4">
                <img
                  src={mediaImages[currentImageIndex]}
                  alt="case visual"
                  className="rounded-lg mb-2 cursor-pointer"
                  onClick={() => setSelectedImage(mediaImages[currentImageIndex])}
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <button onClick={showPrevImage} className="hover:underline">Prev</button>
                  <span>{currentImageIndex + 1}/{mediaImages.length}</span>
                  <button onClick={showNextImage} className="hover:underline">Next</button>
                </div>
              </div>
            )}

            </div>
            {/* Bottom Buttons */}
            <div className="pt-4 border-t">
              <div className="flex justify-end">
                <BaseButton
                  color="red"
                  textColor="white"
                  onClick={() => {
                    alert("Case cancelled (mock)");
                    onClose();
                  }}
                >
                  Cancel Case
                </BaseButton>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/3 bg-gray-100 p-6 border-l border-gray-200 flex flex-col">
            {/*  Profile Info */}
            <div className="flex-shrink-0 mb-4 text-center">
              <img
                src="/defaultphoto.jpg"
                alt="avatar"
                className="rounded-full w-20 h-20 mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold">Chraine Paul Tuazon</h3>
              <p className="text-sm text-gray-500 mb-4">Pro Sabongero</p>
              <div className="w-full text-sm text-gray-700 mb-4 text-left">
                <p className="font-semibold">Address</p>
                <p className="mb-2">Camputhaw, Cebu City</p>
                <p className="font-semibold">Contact Number</p>
                <p className="mb-2">+09 876 543 21</p>
                <p className="font-semibold">Email Address</p>
                <p className="mb-2 text-blue-600">chrepau@gmail.com</p>
              </div>
            </div>

            <hr className="w-full border-gray-300 mb-2" />

            {/* Media + Files */}
            <div className="overflow-y-auto space-y-4 flex-grow">
              {/* Media Section */}
              <div>
                <p className="font-semibold text-sm mb-2">Media</p>
                <div className="grid grid-cols-3 gap-2 transition-all duration-300 ease-in-out">
                  {(showAllMedia ? mediaImages : mediaImages.slice(0, 6)).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`media-${i}`}
                      className="rounded-md w-full h-auto cursor-pointer"
                      onClick={() => setSelectedImage(src)}
                    />
                  ))}
                  {!showAllMedia && mediaImages.length > 6 && (
                    <button
                      className="flex items-center justify-center text-gray-700 rounded-md text-sm h-full hover:underline"
                      onClick={() => setShowAllMedia(true)}
                    >
                      +{mediaImages.length - 6}
                    </button>
                  )}
                  {showAllMedia && mediaImages.length > 6 && (
                    <button
                      className="text-gray-500 text-xs mt-1 hover:underline col-span-3"
                      onClick={() => setShowAllMedia(false)}
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>

              {/* Files Section */}
              <div>
                <p className="font-semibold text-sm mb-2">Files</p>
                <ul className="space-y-1 text-sm text-blue-700">
                  {(showAllFiles ? fileList : fileList.slice(0, 3)).map((file, i) => (
                    <li
                      key={i}
                      className="truncate hover:underline cursor-pointer"
                      onClick={() => handleDownload(file)}
                    >
                      {file}
                    </li>
                  ))}
                  {!showAllFiles && fileList.length > 3 && (
                    <button
                      className="text-gray-700 text-sm hover:underline"
                      onClick={() => setShowAllFiles(true)}
                    >
                      +{fileList.length - 3}
                    </button>
                  )}
                  {showAllFiles && fileList.length > 3 && (
                    <button
                      className="text-gray-500 text-xs mt-1 hover:underline"
                      onClick={() => setShowAllFiles(false)}
                    >
                      Show less
                    </button>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-full">
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

      {isEditModalOpen && (
        <EditCaseModal
          caseData={caseData}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
    
  );


  

};

export default CaseModal;
