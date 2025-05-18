// app/(pages)/cases/[caseId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCaseById } from "@/services/CaseService";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

interface CaseData {
  id: string;
  title: string;
  description: string;
  status: string;
  created_date: string;
  media?: string[];
  files?: string[];
  layman?: {
    name: string;
    address: string;
    contact_number?: string;
    email?: string;
    profile_image?: string;
  }
}

export default function SubmittedCasePage() {
  const { caseId, user_id } = useParams();
  const router = useRouter();
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllFiles, setShowAllFiles] = useState(false);

  useEffect(() => {
    if (!caseId) return;

    const getCase = async () => {
      setLoading(true);
      const response = await fetchCaseById(caseId as string);
      if (response.success) {
        setCaseData(response.data);
      } else {
        console.error("Failed to fetch case:", response.message);
        setCaseData(null);
      }
      setLoading(false);
    };

    getCase();
  }, [caseId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading case data...</div>;
  }

  if (!caseData) {
    return <div className="p-8 text-center text-red-500">Case not found or failed to load.</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  };

  const handleCancelCase = () => {
    if (confirm("Are you sure you want to cancel this case? This action cannot be undone.")) {
      console.log("Case cancelled:", caseId);
      router.push(`/${user_id}/submitted-cases`);
    }
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (caseData.media?.length || 0) - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (caseData.media?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const filesToShow = showAllFiles ? caseData.files : caseData.files?.slice(0, 3);

  return (
    <div className="container mx-auto mt-8 mb-8 px-4 max-w-5xl">
      <Link href={`/${user_id}/submitted-cases`} className="text-gray-600 hover:underline flex items-center mb-6">
         ← Back to Submitted Cases
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden md:grid md:grid-cols-3 gap-6 p-6 min-h-[calc(100vh-150px)]">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
             <h1 className="text-2xl font-bold text-gray-800">{caseData.title}</h1>
             <Link href={`/${user_id}/submitted-cases/${caseId}/edit`} className="text-blue-600 hover:underline flex items-center text-sm">
                Edit <FaEdit className="ml-1" />
             </Link>
          </div>
          {caseData.created_date && (
            <p className="text-sm text-gray-600 mb-4">Submitted: {new Date(caseData.created_date).toLocaleDateString()}</p>
          )}

          <div className="prose max-w-none text-gray-700 mb-6">
             <p>{caseData.description}</p>
          </div>

          {caseData.media && caseData.media.length > 0 && (
            <div className="relative mb-6">
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                <Image
                  src={caseData.media[currentImageIndex]}
                  alt={`Case media ${currentImageIndex + 1}`}
                  width={600}
                  height={320}
                  objectFit="cover"
                />
              </div>
              {caseData.media.length > 1 && (
                 <>
                    <button
                       onClick={goToPreviousImage}
                       className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                    >
                       &lt;
                    </button>
                    <button
                       onClick={goToNextImage}
                       className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                    >
                       &gt;
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                       {caseData.media.map((_, index) => (
                          <button
                             key={index}
                             onClick={() => handleDotClick(index)}
                             className={`w-2 h-2 rounded-full ${
                                index === currentImageIndex ? "bg-white" : "bg-gray-400"
                             }`}
                          ></button>
                       ))}
                    </div>
                 </>
              )}
            </div>
          )}

          <div className="mt-6 text-right">
            <button
              onClick={handleCancelCase}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Cancel Case
            </button>
          </div>
        </div>

        <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Submitted By</h2>
          {caseData.layman && (
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p>{caseData.layman.name}</p>
              </div>
               {caseData.layman.address && (
                  <div>
                     <p className="text-sm font-medium text-gray-500">Address</p>
                     <p>{caseData.layman.address}</p>
                  </div>
               )}
               {caseData.layman.contact_number && (
                  <div>
                     <p className="text-sm font-medium text-gray-500">Contact Number</p>
                     <p>{caseData.layman.contact_number}</p>
                  </div>
               )}
               {caseData.layman.email && (
                  <div>
                     <p className="text-sm font-medium text-gray-500">Email Address</p>
                     <p>{caseData.layman.email}</p>
                  </div>
               )}
            </div>
          )}

          <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Media</h3>
              <div className="grid grid-cols-3 gap-2">
                 {Array(6).fill(0).map((_, index) => (
                    <div key={index} className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                    </div>
                 ))}
                 {caseData.media && caseData.media.length > 6 && (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-800 font-bold text-sm">
                       +{caseData.media.length - 6}
                    </div>
                 )}
              </div>
           </div>

          {caseData.files && caseData.files.length > 0 && (
              <div className="mt-6">
                 <h3 className="text-md font-semibold text-gray-800 mb-2">Files</h3>
                 <ul className="space-y-2 text-blue-600 underline">
                    {filesToShow?.map((file, index) => (
                       <li key={index}>
                          <a href={`/path/to/your/files/${file}`} download>{file}</a>
                       </li>
                    ))}
                 </ul>
                 {caseData.files.length > 3 && (
                    <button
                       onClick={() => setShowAllFiles(!showAllFiles)}
                       className="mt-2 text-blue-600 hover:underline text-sm"
                    >
                       {showAllFiles ? "Show less files" : "Show more files"}
                    </button>
                 )}
              </div>
           )}

        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] w-full">
            <Image
              src={selectedImage}
              alt="Selected Media"
              className="w-full h-auto rounded shadow-lg"
              width={1200}
              height={800}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
