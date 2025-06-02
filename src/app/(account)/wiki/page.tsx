"use client";
import React, { useState, useEffect, useRef } from "react";
import { cases } from "@/interface/CaseTypes";
import { LawData } from "@/interface/WikiLawTypes";
import Header from "@/components/Profile/Header";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { fetchAllLaws } from "@/services/WikiServices";
import { wikiLaw } from "@/constants/caseConstants";
import { User } from "@/interface/AuthTypes";
import { getProfile } from "@/services/ProfileServices";

function getCategoryById(case_type: string) {
  return wikiLaw.find((cat) => cat.id === case_type);
}

const LawCard: React.FC<{
  law: LawData;
  onClick: () => void;
  selected: boolean;
}> = ({ law, onClick, selected }) => {
  const category = getCategoryById(law.case_type);

  return (
    <article
      className={`p-6 w-full rounded-2xl border border-gray cursor-pointer transition-transform transform ${
        selected ? "border-1 border-black shadow-md" : "bg-white shadow-sm"
      } hover:shadow-lg hover:-translate-y-1`}
      onClick={onClick}
    >
      <h2 className="mb-0 text-lg font-semibold">{law.title}</h2>
      <p className="mb-0 text-sm italic">{law.code}</p>
      {category && (
        <span
          className={`inline-block px-2 py-1 rounded text-white text-xs font-bold ${category.color}`}
        >
          {category.name}
        </span>
      )}
      <p className="mt-10 text-sm">
        <strong>Tags:</strong> {law.tags}
      </p>
    </article>
  );
};

const MainContent: React.FC<
  LawData & {
    selectedLanguage: string;
    setSelectedLanguage: (lang: string) => void;
  }
> = ({
  title,
  code,
  full_law,
  case_type,
  tags,
  summary,
  translation,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const ctg = getCategoryById(case_type);

  return (
    <article className="h-full flex-1 p-10 bg-white border border-gray rounded-2xl shadow-sm overflow-y-auto max-h-[100vh] shadow-sm max-sm:hidden">
      <h1 className="mb-0 text-xl font-semibold">{title}</h1>
      {ctg && (
        <span
          className={`inline-block px-2 py-1 rounded text-white text-xs font-bold ${ctg.color}`}
        >
          {ctg.name}
        </span>
      )}
      <p className="mb-4 text-sm">
        <strong>Read more: </strong>
        {full_law ? (
          <a
            href={full_law}
            target="_blank"
            rel="noopener noreferrer"
            className="italic text-blue-600 underline hover:text-teal-600"
          >
            {code}
          </a>
        ) : (
          <span className="italic text-gray-500">No link available</span>
        )}
      </p>
      <div className="mb-10 text-xs px-1.5 leading-relaxed overflow-y-auto">
        {summary ? <p>{summary.summary}</p> : <p>No summary available</p>}
      </div>
      <p className="mt-10 mb-10 text-sm">
        <strong>Tags:</strong> {tags}
      </p>
      <hr className="my-4 h-px bg-black bg-opacity-60" />
      <div className="flex justify-between items-center">
        <h2 className="text-base items-start">Translation</h2>
        <BaseFormSelect
          label=""
          name="Language"
          color="[#0D0330]"
          width="w-30"
          value={selectedLanguage}
          choices={[
            { label: "Tagalog", value: "Tagalog" },
            { label: "Cebuano", value: "Cebuano" },
            { label: "Waray", value: "Waray" },
            { label: "Chavacano", value: "Chavacano" },
          ]}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        />
      </div>
      <div className="text-xs leading-relaxed mt-4">
        {selectedLanguage === "Tagalog"
          ? translation?.language_tagalog
          : selectedLanguage === "Cebuano"
          ? translation?.language_bisaya
          : selectedLanguage === "Waray"
          ? translation?.language_waray
          : selectedLanguage === "Chavacano"
          ? translation?.language_chavacano
          : "No translation available"}
      </div>
    </article>
  );
};

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [wikiSearchQuery] = useState("");
  const [selectedLaw, setSelectedLaw] = useState<LawData | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const [selectedLanguage, setSelectedLanguage] = useState("Tagalog");

  const openCaseCount = cases.filter((c) => c.status === "open").length;

  const [laws, setLaws] = useState<LawData[]>([]);

  const [user, setUser] = useState<User | null>(null);

  const filteredLaws = laws.filter(
    (law) =>
      law.title.toLowerCase().includes(wikiSearchQuery.toLowerCase()) ||
      law.code.toLowerCase().includes(wikiSearchQuery.toLowerCase()) ||
      law.full_law.toLowerCase().includes(wikiSearchQuery.toLowerCase())
  );

  useEffect(() => {
    if (sectionRef.current) {
      setIsOverflowing(
        sectionRef.current.scrollHeight > sectionRef.current.clientHeight
      );
    }
  }, [filteredLaws, selectedLaw]);

  useEffect(() => {
    const loadLaws = async () => {
      const result = await fetchAllLaws();
      if (result) {
        setLaws(
          result.map((law: LawData) => ({
            id: law.id,
            title: law.title,
            code: law.code,
            full_law: law.full_law,
            case_type: law.case_type,
            tags: law.tags || [],
            summary: law.summary,
            translation: {
              language_tagalog:
                law.translation?.language_tagalog || "Walang Tagalog na salin.",
              language_bisaya:
                law.translation?.language_bisaya || "Walay Bisaya nga hubad.",
              language_waray:
                law.translation?.language_waray || "Waray hin Waray nga hubad.",
              language_chavacano:
                law.translation?.language_chavacano ||
                "Walang Chavacano na salin.",
            },
          }))
        );
      }
    };

    loadLaws();
  }, []);

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

  return (
    <main className="flex flex-col text-black font-[Poppins] w-full max-w-[100vw]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={openCaseCount}
        user={user ? { firstName: user.first_name } : null}
      />
      <section
        ref={sectionRef}
        className={`flex gap-10 p-10 my-8 mx-20 max-w-none max-md:flex-col max-sm:p-2.5 h-[calc(86vh-100px)] ${
          isOverflowing ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <aside className="flex flex-col px-4 gap-5 w-[400px] max-md:w-full overflow-y-auto overflow-x-hidden h-[calc(100vh0)] rounded-lg">
          {filteredLaws.map((law) => (
            <LawCard
              key={law.id}
              law={law}
              selected={selectedLaw?.id === law.id}
              onClick={() => setSelectedLaw(law)}
            />
          ))}
        </aside>

        {selectedLaw ? (
          <div className="flex-1 overflow-y-hidden max-h-full rounded-lg">
            <MainContent
              {...selectedLaw}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 italic">
            <div className="pb-[120px]">
              Select a law to preview its content.
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;
