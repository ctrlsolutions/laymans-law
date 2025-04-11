"use client";
import React, { useState, useEffect, useRef } from "react";
import { cases } from "@/interface/CaseTypes";
import Header from "@/components/Profile/Header";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import BaseFormInput from "@/components/Global/BaseFormInput";

type WikiHeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const WikiHeader: React.FC<WikiHeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const [selectedOption, setSelectedOption] = useState("Summary"); 

  const handleSelectChange = (value: string) => {
    setSelectedOption(value); 
    console.log("Selected option:", value);
  };

  return (
    <>
      <nav
        className="flex relative justify-between items-center px-0 py-2.5 mx-auto my-0 w-full max-w-[1002px] max-md:px-5 max-md:py-2.5 max-sm:flex-wrap max-sm:gap-2.5 max-sm:pb-0.5 max-sm:ml-auto"
        role="navigation"
      >
        <h1 className="mt-auto mr-auto text-base text-black max-sm:my-auto">
          Wiki
        </h1>

        <div className="flex text-sm content-center items-baseline gap-2 max-sm:pl-14 max-sm:mr-0 max-sm:ml-auto">
          <BaseFormSelect
            label=""
            name="Submit"
            color="[#0D0330]"
            width="w-35"
            value={selectedOption} 
            choices={[
              { label: "Submit", value: "Submit" },
              { label: "Summary", value: "Summary" },
            ]}
            onChange={(e) => handleSelectChange(e.target.value)}
          />
          <BaseFormInput
            label=""
            name="Search"
            type="text"
            color="black"
            width="w-[260px]"
            height="h-[2.5rem]"
            value={searchQuery}
            icon="search"
            placeholder="Search in Wiki"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </nav>
      <div
        className="mx-auto my-0 mt-1.5 w-full h-px bg-black bg-opacity-60 max-w-[1002px]"
        role="separator"
        aria-hidden="true"
      />
    </>
  );
};

const TagChip: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center px-3 py-1.5 text-xs bg-white rounded-lg shadow">
    <div className="mr-2 w-2 h-2 bg-green-700 rounded-full" />
    <span>{label}</span>
  </div>
);

type LawData = {
  id: number;
  title: string;
  chapter: string;
  tags: string[];
  content: string;
  translation: string;
};

const LawCard: React.FC<{
  law: LawData;
  onClick: () => void;
  selected: boolean;
}> = ({ law, onClick, selected }) => (
  <article
    className={`p-6 w-full rounded-2xl border border-gray cursor-pointer transition-transform transform ${
      selected ? "bg-violet-100 shadow-md" : "bg-white shadow-sm"
    } hover:shadow-lg hover:-translate-y-1`}
    onClick={onClick}
  >
    <h2 className="mb-4 text-lg font-semibold">{law.title}</h2>
    <p className="mb-6 text-sm">{law.chapter}</p>
    <div className="flex flex-wrap gap-2">
      {law.tags.map((tag, index) => (
        <TagChip key={`${tag}-${index}`} label={tag} />
      ))}
    </div>
  </article>
);

const MainContent: React.FC<LawData> = ({ title, chapter, content, translation }) => (
  <article className="h-100% flex-1 p-10 bg-white border border-gray rounded-2xl overflow-y-auto shadow-sm max-sm:hidden">
      <h1 className="mb-5 text-xl font-semibold">{title}</h1>
      <p className="mb-5 text-xs">{chapter}</p>
      <div className="mb-8 text-xs px-1.5 leading-relaxed h-[calc(36vh-70px)] overflow-y-auto">{content}</div>
      <hr className="my-8 h-px bg-black bg-opacity-60" />
      <div className="flex justify-between items-center">
        <h2 className="mb-5 text-base items-start">Translation</h2>
        <BaseFormSelect
            label=""
            name="Language"
            color="[#0D0330]"
            width="w-30"
            value="Language"
            choices={[
              { label: "Language", value: "" },
              { label: "Tagalog", value: "Tagalog" },
              { label: "Cebuano", value: "Cebuano" },
              { label: "English", value: "English" }, 
              { label: "Ilocano", value: "Ilocano" },
              { label: "Waray", value: "Waray" },
            ]}
            onChange={() => {}}
          />
      </div>
      <div className="text-xs leading-relaxed">{translation}</div>
  </article>
);

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [wikiSearchQuery, setWikiSearchQuery] = useState(""); 
  const [selectedLaw, setSelectedLaw] = useState<LawData | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null); 

  const openCaseCount = cases.filter((c) => c.status === "open").length;

  // Sample laws
  const laws: LawData[] = [
    {
      id: 1,
      title: "R.A. Title of Law One",
      chapter: "Chapter 1",
      tags: ["divorce", "family"],
      content: "Law One content about divorce and legal aspects...",
      translation: "Translation for Law One goes here...",
    },
    {
      id: 2,
      title: "R.A. Title of Law Two",
      chapter: "Chapter 2",
      tags: ["property", "land"],
      content: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum     Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum..    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum...    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum...    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum...    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum...",
      translation: "Translation for Law Two goes here...",
    },
    {
      id: 3,
      title: "R.A. Title of Law Three",
      chapter: "Chapter 3",
      tags: ["labor", "wages"],
      content: "Law Three is focused on fair labor practices...",
      translation: "Translation for Law Three goes here...",
    },
  ];

  const filteredLaws = laws.filter(
    (law) =>
      law.title.toLowerCase().includes(wikiSearchQuery.toLowerCase()) ||
      law.chapter.toLowerCase().includes(wikiSearchQuery.toLowerCase()) ||
      law.tags.some((tag) => tag.toLowerCase().includes(wikiSearchQuery.toLowerCase()))
  );

  useEffect(() => {
    if (sectionRef.current) {
      setIsOverflowing(sectionRef.current.scrollHeight > sectionRef.current.clientHeight);
    }
  }, [filteredLaws, selectedLaw]);

  return (
    <main className="flex flex-col text-black font-[Poppins] w-full max-w-[100vw]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={openCaseCount}
      />

      <WikiHeader
        searchQuery={wikiSearchQuery}
        setSearchQuery={setWikiSearchQuery}
      />

      <section
        ref={sectionRef}
        className={`flex gap-20 p-10 mx-20 max-w-none max-md:flex-col max-sm:p-2.5 h-[calc(78vh-100px)] ${
          isOverflowing ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <aside className="flex flex-col px-4 gap-5 w-[350px] max-md:w-full overflow-y-auto overflow-x-hidden max-h-full rounded-lg">
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
            <MainContent {...selectedLaw} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 italic">
            <div className="pb-[120px]">Select a law to preview its content.</div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;
