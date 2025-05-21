import React from "react";
import { Case } from "@/interface/CaseTypes";

interface CaseModalProps {
  caseData: Case;
  onClose: () => void;
}

const CaseModal: React.FC<CaseModalProps> = ({ caseData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[728px] h-[728px] flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-2/3 p-6 overflow-y-auto">
          <button onClick={onClose} className="text-gray-500 hover:text-black mb-4">
            ← Back
          </button>
          <h2 className="text-3xl font-bold mb-2">{caseData.title}</h2>
          <span className="inline-block bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full mb-2">
            {caseData.category.name} Case
          </span>
          <p className="text-sm text-gray-500 mb-4">
            Submitted: <strong>{new Date(caseData.created_date).toLocaleDateString()}</strong>
          </p>
          <p className="text-gray-700 mb-4">
            {caseData.description || "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"}
          </p>
          <img
            src="https://via.placeholder.com/400x200"
            alt="case visual"
            className="rounded-lg mb-4"
          />
        </div>

        {/* Right Panel */}
        <div className="w-1/3 bg-gray-100 p-6 border-l border-gray-200 flex flex-col items-center">
          <img
            src="https://via.placeholder.com/80"
            alt="avatar"
            className="rounded-full w-20 h-20 mb-2"
          />
          <h3 className="text-lg font-semibold">
            { caseData.created_by 
            ? `${caseData.created_by.first_name} ${caseData.created_by.last_name}` 
            : "Unknown User" }
          </h3>
          <p className="text-sm text-gray-500 mb-4">Layman</p>

          <div className="w-full text-sm text-gray-700 mb-4">
            <p className="font-semibold">Contact Number</p>
            <p className="mb-2">+09 876 543 21</p>
            <p className="font-semibold">Email Address</p>
            <p className="mb-2 text-blue-600">{caseData.created_by?.email || "Not Provided"}</p>
          </div>

          <hr className="w-full border-gray-300 mb-4" />

          <div className="w-full">
            <p className="font-semibold text-sm mb-2">Media</p>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <img
                  key={i}
                  src="https://via.placeholder.com/60"
                  alt={`media-${i}`}
                  className="rounded-md w-full h-auto"
                />
              ))}
              <div className="flex items-center justify-center bg-gray-300 text-gray-700 rounded-md text-xs">
                +8
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseModal;
