import React, { useState, useEffect } from "react";
import BaseButton from "@/components/Global/BaseButton";

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
  const [showAllMedia, setShowAllMedia] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [title, setTitle] = useState(caseData.title);
  const [description, setDescription] = useState(caseData.description);
  const [category, setCategory] = useState(caseData.category);

  useEffect(() => {
    setTitle(caseData.title);
    setDescription(caseData.description);
    setCategory(caseData.category);
  }, [caseData]);

  const mediaImages = caseData.media ?? Array(8).fill("/defaultphoto.jpg");

  const fileList = caseData.files ?? [
    "witness_report.pdf",
    "cctv_footage.mp4",
    "suspect_profile.docx",
    "court_documents.pdf",
    "photos.zip",
  ];

  const handleDownload = (fileName: string) => {
    const link = document.createElement("a");
    link.href = `/mock/files/${fileName}`;
    link.download = fileName;
    link.click();
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? mediaImages.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setCurrentImageIndex((prev) => (prev === mediaImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-[728px] h-[728px] flex overflow-hidden">
          {/* Left Panel */}
          <div className="w-2/3 p-6 flex flex-col h-full">
            <div className="mb-4">
              <button onClick={onClose} className="text-gray-500 hover:text-black mb-4">
                ← Back to Case
              </button>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-bold mb-2 w-full outline-none border-b border-gray-300 focus:border-gray-500"
              />
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm text-gray-500">
                  Submitted: <strong>{new Date(caseData.createdAt).toLocaleDateString()}</strong>
                </p>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 mb-4">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full text-gray leading-relaxed whitespace-pre-line resize-none outline-none border border-gray-300 rounded-md p-2 focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Media</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                  onChange={() => alert("Media uploaded (mock)")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Files</label>
                <input
                  type="file"
                  multiple
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                  onChange={() => alert("Files uploaded (mock)")}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between">
                <BaseButton
                  color="violet"
                  textColor="white"
                  onClick={() => {
                    const updatedCase = {
                      ...caseData,
                      title,
                      description,
                      category,
                      updatedAt: new Date().toISOString(),
                    };
                    console.log("Updated case:", updatedCase);
                    alert("Case updated (mock)");
                    onClose();
                  }}
                >
                  Save Changes
                </BaseButton>
                <BaseButton color="red" textColor="white" onClick={onClose}>
                  Discard Changes
                </BaseButton>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/3 bg-gray-100 p-6 border-l border-gray-200 flex flex-col">
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

            <div className="overflow-y-auto space-y-4 flex-grow">
              <div>
                <p className="font-semibold text-sm mb-2">Media</p>
                <div className="grid grid-cols-3 gap-2 overflow-y-auto">
                  {(showAllMedia ? mediaImages : mediaImages.slice(0, 6)).map((src, i) => (
                    <div
                      key={i}
                      className="relative group cursor-pointer"
                      onClick={() => {
                        setCurrentImageIndex(i);
                        setSelectedImage(src);
                      }}
                    >
                      <img src={src} alt={`media-${i}`} className="rounded-md w-full h-auto" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Image removed (mock)");
                        }}
                        className="absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-1 group-hover:block hidden"
                      >
                        ✕
                      </button>
                    </div>
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("File removed (mock)");
                        }}
                        className="text-red-600 ml-2"
                      >
                        ✕
                      </button>
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

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative flex flex-col items-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 text-white bg-black bg-opacity-50 px-2 py-1 rounded hover:bg-opacity-75"
              >
                ✕
              </button>

              <button
                onClick={() => {
                  alert("Image deleted (mock)");
                  setSelectedImage(null);
                }}
                className="absolute top-3 left-3 font-semibold text-white bg-red bg-opacity-90 px-2 py-1 rounded hover:bg-opacity-75"
              >
                Delete
              </button>
              <img
                src={mediaImages[currentImageIndex]}
                alt="Selected"
                className="max-w-[80vw] max-h-[80vh] object-contain rounded-md mb-4"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CaseModal;
