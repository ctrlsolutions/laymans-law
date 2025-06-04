"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import Header from "@/components/Profile/Header";
import BaseFormSelect from "@/components/Global/BaseFormSelect";

import { cases } from "@/interface/CaseTypes";
import { CountryData } from "@/interface/CountryTypes";
import { fetchOFWSupport } from "@/services/OfwServices";

/* -------------------------------------------------------------------------- */
/*                                Helper Methods                              */
/* -------------------------------------------------------------------------- */
function sanitizeUrl(url: string) {
  const trimmed = url.trim().replace(/\s+/g, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed.replace(/^https?:\/\//, "")}`;
}

const CommaSeparatedList: React.FC<{ data?: string; fallbackText?: string }> = ({
  data,
  fallbackText = "N/A",
}) => {
  if (!data?.trim()) return <li>{fallbackText}</li>;

  return (
    <>
      {data
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item, index) => (
          <li key={index}>{item}</li>
        ))}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                             Support Section Header                         */
/* -------------------------------------------------------------------------- */
type SupportSectionHeaderProps = {
  onCountryChange: (countryCode: string) => void;
  countries: CountryData[];
};

const SupportSectionHeader: React.FC<SupportSectionHeaderProps> = ({
  countries,
  onCountryChange,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
    onCountryChange(value);
  };

  return (
    <nav className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full max-w-[1002px] py-2.5 px-10 mx-auto sm:px-5">
      <h1 className="text-base text-black mr-auto max-sm:hidden">OFW Support Section</h1>

      <div className="flex text-sm items-baseline gap-2 pl-0 sm:pl-14 ml-auto">
        <BaseFormSelect
          label=""
          name="Country"
          color="[#0D0330]"
          width="w-35"
          value={selectedOption}
          choices={[
            { label: "Country", value: "" },
            ...countries.map((c) => ({ label: c.country, value: c.country })),
          ]}
          onChange={(e) => handleSelectChange(e.target.value)}
        />
      </div>
    </nav>
  );
};

/* -------------------------------------------------------------------------- */
/*                                Country Card                                */
/* -------------------------------------------------------------------------- */
const CountryCard: React.FC<{
  country: CountryData;
  onClick: () => void;
  selected: boolean;
  countryFlagUrl: string;
}> = ({ country, onClick, selected, countryFlagUrl }) => (
  <article
    onClick={onClick}
    className={`relative w-full sm:max-w-[300px] rounded-2xl border cursor-pointer transition-transform transform ${
      selected ? "border-red shadow-lg" : "bg-white shadow-sm"
    } hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between`}
  >
    <div
      className="absolute top-0 left-0 w-full h-1/2 rounded-t-2xl"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 60%, white 100%), url(${countryFlagUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.55,
      }}
      aria-hidden="true"
    />

    <div className="relative z-10 h-[300px] flex flex-col items-center text-center py-4 px-6 gap-12 mt-auto">
      <h2 className="text-lg font-semibold text-black mt-20">{country.country}</h2>
      <p className="text-sm text-black line-clamp-5">{country.description}</p>
    </div>
  </article>
);

/* -------------------------------------------------------------------------- */
/*                               Main Content Card                            */
/* -------------------------------------------------------------------------- */
const MainContent: React.FC<CountryData & { flagUrl: string }> = ({
  country,
  support_name,
  address,
  contact_number,
  email_address,
  website,
  available_services,
  working_hours,
  flagUrl,
}) => (
  <article className="h-full flex-1 p-6 sm:p-10 bg-white border border-gray rounded-2xl shadow-sm overflow-y-auto max-h-[calc(72vh-156px)]">
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-semibold flex items-center gap-2">
        {country}
        {flagUrl ? (
          <Image
            src={flagUrl}
            alt={`${country} flag`}
            width={40}
            height={40}
            className="rounded-full border border-black"
            style={{ objectFit: country === "Japan" ? "cover" : "fill", objectPosition: "center" }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full border border-black bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-500">No Flag</span>
          </div>
        )}
      </h1>
    </header>

    <div className="text-center mb-4">
      <p>{support_name}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Support Name</h2>
          <p className="text-base font-semibold pl-2 mt-2">{support_name || "N/A"}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Address</h2>
          <p className="text-base font-semibold pl-2 mt-2">{address || "N/A"}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Embassy Number</h2>
          <ul className="list-disc font-semibold text-base space-y-1 pl-6 mt-2">
            <CommaSeparatedList data={contact_number} />
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Embassy Email</h2>
          <ul className="list-disc font-semibold text-base space-y-1 pl-6 mt-2">
            <CommaSeparatedList data={email_address} />
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Website</h2>
          <p className="text-base font-semibold pl-2 mt-2">
            {website ? (
              <a
                href={sanitizeUrl(website)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {sanitizeUrl(website)}
              </a>
            ) : (
              "N/A"
            )}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Available Services</h2>
          <ul className="list-disc font-semibold text-base space-y-1 pl-6 mt-2">
            <CommaSeparatedList data={available_services} />
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Working Hours</h2>
          <p className="text-base font-semibold pl-2 mt-2">{working_hours || "N/A"}</p>
        </div>
      </div>
    </div>
  </article>
);

/* -------------------------------------------------------------------------- */
/*                                  Page Component                            */
/* -------------------------------------------------------------------------- */
const Page: React.FC = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [flagUrls, setFlagUrls] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const openCaseCount = cases.filter((c) => c.status === "open").length;

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supportData = await fetchOFWSupport();
        setCountries(supportData);

        const flags: { [key: string]: string } = {};

        for (const country of supportData) {
          try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${country.country}?fullText=true`);
            const data = await res.json();
            flags[country.country] = data[0]?.flags?.png || "";
          } catch {
            flags[country.country] = "";
          }
        }

        setFlagUrls(flags);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col text-black font-[Poppins] w-full max-w-[100vw]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={openCaseCount}
        user={null}
      />

      <SupportSectionHeader
        countries={countries}
        onCountryChange={(val) =>
          setSelectedCountry(countries.find((c) => c.country === val) || null)
        }
      />

      <section
        ref={sectionRef}
        className="flex flex-col md:flex-row gap-10 py-10 px-8 sm:px-6 md:px-20 max-h-[78vh] sm:overflow-y-auto overflow-hidden"
      >
        <aside className="flex flex-col gap-5 w-full md:w-[350px] border border-gray shadow-md overflow-y-auto rounded-lg">
          {countries.map((country) => (
            <CountryCard
              key={country.country}
              country={country}
              onClick={() => setSelectedCountry(country)}
              selected={selectedCountry?.country === country.country}
              countryFlagUrl={flagUrls[country.country] || ""}
            />
          ))}
        </aside>

        <div className="flex-1 max-h-full rounded-lg">
          {selectedCountry ? (
            <MainContent {...selectedCountry} flagUrl={flagUrls[selectedCountry.country] || ""} />
          ) : (
            <div className="flex justify-center items-center text-gray-400 italic py-16">
              Select a country to preview its content.
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
