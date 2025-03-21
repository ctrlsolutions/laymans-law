"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface Case {
  id: number;
  caseTitle: string;
  timeAgo: string;
  description: string;
  category: string;
  profileImage: string;
  link: string;
}

const ActiveCasesComponent = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchedCases: Case[] = [
      {
        id: 1,
        caseTitle: "Divorce Settlement",
        timeAgo: "30 minutes ago",
        description: "New client request for divorce settlement...",
        category: "Divorce Cases",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/123",
      },
      {
        id: 2,
        caseTitle: "Fraud Investigation",
        timeAgo: "1 hour ago",
        description: "Evidence collection ongoing for fraud case...",
        category: "Criminal Law",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/456",
      },
      {
        id: 3,
        caseTitle: "Property Dispute",
        timeAgo: "2 hours ago",
        description: "Hearing scheduled for property dispute case...",
        category: "Real Estate",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/789",
      },
    ];

    setCases(fetchedCases);
  }, []);

  return (
    <div className="relative w-[48%] flex-grow p-5 mt-[3vh] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-3xl text-black flex flex-col items-center m-3 min-h-[110px]">
      <div className="flex justify-between w-full mb-3">
        <h1 className="font-extrabold text-xl">Active Cases</h1>
        <p className="font-extrabold text-red text-2xl">{cases.length}</p>
      </div>

      <div className="w-full h-full flex flex-col items-center relative">
        {/* Layered Effect */}
        <div className="absolute bg-white left-1/2 -translate-x-1/2 w-[98%] shadow-[0px_4px_20px_0px_rgba(0,1,0.2,0.2)] rounded-3xl h-[76%] z-20 p-5 overflow-auto">
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-md mb-4 hover:bg-gray-200 transition cursor-pointer"
              onClick={() => router.push(caseItem.link)}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={caseItem.profileImage}
                  alt={caseItem.caseTitle}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{caseItem.caseTitle}</p>
                  <p className="text-sm text-gray-500">{caseItem.timeAgo}</p>
                  <p className="text-gray-600">{caseItem.description}</p>
                </div>
              </div>
              <span className="text-sm text-gray-600">{caseItem.category}</span>
            </div>
          ))}
        </div>

        <div className="absolute bg-white left-1/2 -translate-x-1/2 w-[96%] shadow-[0px_4px_20px_0px_rgba(0,1,0.2,0.2)] rounded-3xl h-[84%] z-10"></div>
        <div className="absolute bg-white left-1/2 -translate-x-1/2 w-[94%] shadow-[0px_4px_20px_0px_rgba(0,1,0.2,0.2)] rounded-3xl h-[92%]"></div>
      </div>

      {isExpanded && (
        <button
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-200 hover:bg-gray-300 transition p-2 rounded-full shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
        >
          <ChevronDown size={24} className="text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default ActiveCasesComponent;
