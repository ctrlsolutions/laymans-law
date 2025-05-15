// app/(pages)/cases/[caseId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCaseById } from "@/services/CaseService";
import Image from "next/image";
import { X } from "lucide-react";

export default function SubmittedCasePage() {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) return;

    const getCase = async () => {
      setLoading(true);
      const response = await fetchCaseById(caseId as string);
      if (response.success) {
        setCaseData(response.data);
      }
      setLoading(false);
    };

    getCase();
  }, [caseId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading case data...</div>;
  }

  if (!caseData) {
    return <div className="p-8 text-center text-red-500">Case not found.</div>;
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-6 px-4 md:px-10 py-6">
      {/* Left: Case Content */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">{caseData.title}</h1>
          <span
            className={`text-white text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
              caseData.status
            )}`}
          >
            {caseData.status}
          </span>
        </div>

        <div className="prose max-w-none">{caseData.description}</div>

        {caseData.media?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Media</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {caseData.media.map((mediaUrl: string, index: number) => (
                <div key={index} className="relative w-full aspect-square">
                  <Image
                    src={mediaUrl}
                    alt={`Media ${index + 1}`}
                    fill
                    className="object-cover rounded cursor-pointer"
                    onClick={() => setSelectedImage(mediaUrl)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: User Info */}
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-lg font-semibold">Submitted By</h2>
        <div>
          <label className="text-gray-500 text-sm">Name</label>
          <p className="text-base font-medium">Juan Dela Cruz</p>
        </div>
        <div>
          <label className="text-gray-500 text-sm">Address</label>
          <p className="text-base font-medium">1234 Sample St., Quezon City</p>
        </div>
        <div>
          <label className="text-gray-500 text-sm">Email</label>
          <p className="text-base font-medium">juandelacruz@example.com</p>
        </div>
      </div>

      {/* Lightbox Modal */}
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
