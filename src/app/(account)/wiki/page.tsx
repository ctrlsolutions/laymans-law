"use client";
import React, { useState, useEffect, useRef } from "react";
import { cases, LawData } from "@/interface/CaseTypes";
import Header from "@/components/Profile/Header";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import BaseFormInput from "@/components/Global/BaseFormInput";
import { fetchAllLaws } from "@/services/WikiServices";
import { getProfile } from "@/services/ProfileServices";
import BaseButton from "@/components/Global/BaseButton";
import { useRouter } from "next/navigation";

type WikiHeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  userType: 'lawyer' | 'layman';
};


const WikiHeader: React.FC<WikiHeaderProps> = ({ searchQuery, setSearchQuery, userType }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Summary"); 

  const handleSelectChange = (value: string) => {
    setSelectedOption(value); 
    console.log("Selected option:", value);
  };

  const handleButtonClick = () => {
    router.push("/wiki/vote-summary"); 
  }

  return (
    <>
      <nav
        className="flex relative justify-between items-center px-0 py-2.5 mx-auto my-0 w-full max-w-[1002px] max-md:px-5 max-md:py-2.5 max-sm:flex-wrap max-sm:gap-2.5 max-sm:pb-0.5 max-sm:ml-auto"
        role="navigation"
      >
        <h1 className="mt-auto mr-auto text-base text-black max-sm:my-auto">
          Wiki
        </h1>

        {userType === 'lawyer' ? (
          // Render this div if userType is 'lawyer'
          <div className="flex text-sm content-center items-baseline gap-2 max-sm:pl-14 max-sm:mr-0 max-sm:ml-auto">
            <BaseFormSelect
              label=""
              name="Submit"
              color="[#0D0330]"
              width="w-35" // Consider using w-[8.75rem] for more standard Tailwind if w-35 isn't custom
              value={selectedOption}
              choices={[
                { label: "Submit", value: "Submit" },
                { label: "Summary", value: "Summary" },
                { label: "Translation", value: "Translation" },
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
        ) : (
          // Render this div if userType is 'layman' (or anything else)
          <div className="flex text-sm content-center items-end gap-2 max-sm:pl-14 max-sm:mr-0 max-sm:ml-auto">
            <BaseButton
              textColor="white"
              width="125px"
              // height="40px"
              // textSize="text-sm"
              onClick={handleButtonClick}
              // You might want to add a background color prop or class here
              // e.g., className="bg-blue-600 hover:bg-blue-700 ..."
            >
              Vote Summary
            </BaseButton>
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
        )}
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

const MainContent: React.FC<LawData & {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}> = ({ title, chapter, content, translation, selectedLanguage, setSelectedLanguage }) => (
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
        value={selectedLanguage}
        choices={[
          { label: "Tagalog", value: "Tagalog" },
          { label: "Cebuano", value: "Cebuano" },
          { label: "Waray", value: "Waray" },
        ]}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      />
    </div>
    <div className="text-xs leading-relaxed mt-4">
      {selectedLanguage === "Tagalog"
        ? translation.language_tagalog
        : selectedLanguage === "Cebuano"
        ? translation.language_bisaya
        : selectedLanguage === "Waray"
        ? translation.language_waray
        : "No translation available"}
    </div>
  </article>
);


const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [wikiSearchQuery, setWikiSearchQuery] = useState(""); 
  const [selectedLaw, setSelectedLaw] = useState<LawData | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null); 

  const [selectedLanguage, setSelectedLanguage] = useState("Tagalog"); 
  const [userType, setUserType] = useState<"layman" | "lawyer">("layman");
  const [profile, setProfile] = useState<any>(null); 
  
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile();
      if (response.success) {
        setProfile(response.data); // Set the profile data
      } else {
        console.error("Error fetching profile:", response.message);
      }
    };

    fetchProfile(); // Fetch the profile when the component mounts
  }, []);
  

  useEffect(() => {
    const storedUserType = localStorage.getItem("user_type");
    if (storedUserType === "layman" || storedUserType === "lawyer") {
      setUserType(storedUserType);
    }
  }, []);

  const openCaseCount = cases.filter((c) => c.status.isOpen).length;

  const [laws, setLaws] = useState<LawData[]>([]);

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

  useEffect(() => {
    const loadLaws = async () => {
      const result = await fetchAllLaws();
      if (result) {
        setLaws(
          result.map((law) => ({
            id: law.id,
            title: law.title,
            chapter: law.code,
            tags: law.tags || [],
            content: law.full_law || law.summary?.summary || "",
            translation: {
              language_tagalog: law.translation?.language_tagalog || "Walang Tagalog na salin.",
              language_bisaya: law.translation?.language_bisaya || "Walay Bisaya nga hubad.",
              language_waray: law.translation?.language_waray || "Waray hin Waray nga hubad.",
            },
          }))
        );
      }
    };
  
    loadLaws();
  }, []);
  

  return (
    <main className="flex flex-col text-black font-[Poppins] w-full max-w-[100vw]">
      <Header
        firstName={profile ? profile.first_name : ''} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={openCaseCount}
      />

      <WikiHeader
        searchQuery={wikiSearchQuery}
        setSearchQuery={setWikiSearchQuery}
        userType={userType} // Change this to 'lawyer' or 'layman' based on your logic
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
            <MainContent
              {...selectedLaw}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
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
