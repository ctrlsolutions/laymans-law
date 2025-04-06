"use client";
import React from "react";
import { cases } from "@/interface/CaseTypes";
import Header from "@/components/Profile/Header";
import BaseFormInput from "@/components/Global/BaseFormInput";

const countries = [
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Mexico",
  "Philippines",
];

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const openCaseCount = cases.filter((c) => c.status.isOpen).length;

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex flex-col text-black w-full max:w-100vw font-[Poppins]" role="main">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={openCaseCount}
        user={{ firstName: "rexhermoso" }}
      />
      <div className="flex self-center mt-2 px-0 py-2.5 mx-auto my-0 w-full max-w-[1002px] max-md:px-5 max-md:py-2.5 max-sm:flex-wrap max-sm:gap-2.5 max-sm:pb-0.5 max-sm:ml-auto">
        <h1 className="mt-auto mr-auto text-base text-black max-sm:my-auto">
          OFW Support Section
        </h1>
        <BaseFormInput
          label=""
          name="countrySearch"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search country"
          className="w-[12rem] border border-black rounded-[10px] px-5 py-2.5 h-8 max-w-2lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"  
        />
      </div>

      <div
        className="mx-auto my-0 mt-1.5 w-full h-px bg-black bg-opacity-60 max-w-[1002px]"
        role="separator"
        aria-hidden="true"
      />
    </main>
  );
}

export default Page;
