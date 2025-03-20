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
    // Simulate fetching active cases from the backend (Replace this with API call later)
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
      {
        id: 4,
        caseTitle: "Employment Contract Review",
        timeAgo: "3 hours ago",
        description: "Reviewing legal aspects of a new employment contract...",
        category: "Employment Law",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/101",
      },
      {
        id: 5,
        caseTitle: "Intellectual Property Dispute",
        timeAgo: "4 hours ago",
        description: "Legal claim filed regarding trademark infringement...",
        category: "Intellectual Property",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/102",
      },
      {
        id: 6,
        caseTitle: "Medical Malpractice",
        timeAgo: "5 hours ago",
        description: "Client seeking representation for medical negligence...",
        category: "Medical Law",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/103",
      },
      {
        id: 7,
        caseTitle: "Cybercrime Investigation",
        timeAgo: "6 hours ago",
        description: "Investigating a hacking and data breach incident...",
        category: "Cyber Law",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/104",
      },
      {
        id: 8,
        caseTitle: "Family Custody Battle",
        timeAgo: "7 hours ago",
        description: "Legal dispute over child custody rights...",
        category: "Family Law",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/105",
      },
      {
        id: 9,
        caseTitle: "Tenant-Landlord Dispute",
        timeAgo: "8 hours ago",
        description: "Negotiating rental terms and lease agreements...",
        category: "Real Estate",
        profileImage: "/DefaultProfileLawyer.png",
        link: "/cases/106",
      },
    ];

    setCases(fetchedCases); // Simulate data loading
  }, []);

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg w-[515px] transition-all duration-300 ${
        isExpanded ? "h-[907px]" : "h-[527px]"
      } p-5 overflow-auto`}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/ActiveCasesLogo.png" alt="Active Cases" width={30} height={30} />
          <h2 className="text-2xl font-bold">Active Cases:</h2>
        </div>
        <span className="text-purple-700 text-4xl font-bold">{cases.length}</span>
      </div>

      <div className="mt-6 space-y-4">
        {cases.length > 0 ? (
          cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className={`relative p-4 bg-gray-100 rounded-xl shadow-md transition ${
                isExpanded ? "hover:bg-gray-200 cursor-pointer" : ""
              }`}
              onClick={() => isExpanded && router.push(caseItem.link)}
            >
              <div className="absolute -top-3 right-4 flex items-center gap-2 bg-white border border-gray-300 px-3 py-1 text-sm rounded-lg shadow-md">
                <span className="w-3 h-3 rounded-full bg-green-500 border border-white"></span>
                {caseItem.category}
              </div>

              <div className="flex items-center gap-3 mt-3">
                <Image src={caseItem.profileImage} alt={caseItem.caseTitle} width={40} height={40} className="rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold">{caseItem.caseTitle}</p>
                  <p className="text-sm text-gray-500">{caseItem.timeAgo}</p>
                  <p className="text-gray-600">{caseItem.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No active cases yet.</p>
        )}
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
