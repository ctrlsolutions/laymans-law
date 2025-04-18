"use client";
import React, { useState, useEffect, useRef } from "react";
import { cases } from "@/interface/CaseTypes";
import Header from "@/components/Profile/Header";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { CountryData, countries  } from "@/interface/CountryTypes";

type SupportSectionHeaderProps = {
  onCountryChange: (countryCode: string) => void;
};

const SupportSectionHeader: React.FC<SupportSectionHeaderProps> = ({
  onCountryChange,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
    onCountryChange(value);
  };

  return (
    <>
      <nav
        className="flex relative justify-between items-center px-0 py-2.5 mx-auto my-0 w-full max-w-[1002px] max-md:px-5 max-md:py-2.5 max-sm:flex-wrap max-sm:gap-2.5 max-sm:pb-0.5 max-sm:ml-auto"
        role="navigation"
      >
        <h1 className="mt-auto mr-auto text-base text-black max-sm:my-auto">
          OFW Support Section
        </h1>

        <div className="flex text-sm supportname-center items-baseline gap-2 max-sm:pl-14 max-sm:mr-0 max-sm:ml-auto">
          <BaseFormSelect
            label=""
            name="Country"
            color="[#0D0330]"
            width="w-35"
            value={selectedOption}
            choices={[
              { label: "Country", value: "" }, 
              ...countries.map((country) => ({
                label: country.country,
                value: country.code,
              })),
            ]}
            onChange={(e) => handleSelectChange(e.target.value)}
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

const CountryCard: React.FC<{
  country: CountryData;
  onClick: () => void;
  selected: boolean;
  countryFlagUrl: string;
}> = ({ country, onClick, selected, countryFlagUrl }) => (
  <article
    className={`relative w-full rounded-2xl border border-gray cursor-pointer transition-transform transform ${
      selected ? "border border-red shadow-lg" : "bg-white shadow-sm"
    } hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between`}
    onClick={onClick}
  >
    <div
      className="absolute top-0 left-0 w-full h-1/2 rounded-t-2xl"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 60%, white 100%), url(${countryFlagUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
        opacity: 0.55
      }}
      aria-hidden="true"
    />
    <div className="relative z-10 h-[300px] flex flex-col items-center text-center py-4 px-6 gap-12 mt-auto">
      <h2 className="text-lg font-semibold text-black mt-20 text-shadow-lg">{country.country}</h2>
      <p className="text-sm text-black line-clamp-5">{country.chapter}</p>
    </div>
  </article>
);

const MainContent: React.FC<CountryData & { flagUrl: string }> = ({
  country,
  tags,
  chapter,
  supportname,
  address,
  embassyEmail,
  embassyNumber,
  flagUrl,
}) => (
  <article className="h-full flex-1 p-10 bg-white border border-gray rounded-2xl shadow-sm overflow-y-auto max-h-[calc(72vh-156px)]">
    <div className="flex w-full justify-between items-center mb-8">
      <h1 className="text-3xl font-semibold flex items-center gap-2">
        {country}{" "}
        {flagUrl ? ( // Render the image only if flagUrl is not empty
          <img
            src={flagUrl}
            alt={`${country} flag`}
            className="w-10 h-10 rounded-full border border-black"
            style={{
              objectFit: country === "Japan" ? "cover" : "fill",
              objectPosition: "center",
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full border border-black bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-500">No Flag</span>
          </div>
        )}
      </h1>
    </div>

    <div className="flex flex-col items-center justify-center mb-4">
      <p>{chapter}</p>
    </div>
    <div className="grid grid-cols-2 gap-8 overflow-hidden max-md:grid-cols-1 max-sm:gap-4">
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Support Name</h2>
          <div
            className="mx-0 my-0 mt-1.5 w-[100px] h-px bg-black bg-opacity-100 max-w-[1002px]"
            role="separator"
            aria-hidden="true"
          />
          <p className="text-base font-semibold pl-2 mt-2">{supportname || "N/A"}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Address</h2>
          <div
            className="mx-0 my-0 mt-1.5 w-[100px] h-px bg-black bg-opacity-100 max-w-[1002px]"
            role="separator"
            aria-hidden="true"
          />
          <p className="text-base font-semibold pl-2 mt-2">{address || "N/A"}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Embassy Number</h2>
          <div
            className="mx-0 my-0 mt-1.5 w-[100px] h-px bg-black bg-opacity-100 max-w-[1002px]"
            role="separator"
            aria-hidden="true"
          />
          <p className="text-base font-semibold pl-2 mt-2">{embassyNumber || "N/A"}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Embassy Email</h2>
          <div
            className="mx-0 my-0 mt-1.5 w-[100px] h-px bg-black bg-opacity-60 max-w-[1002px]"
            role="separator"
            aria-hidden="true"
          />
          <p className="text-base font-semibold pl-2 mt-2">{embassyEmail || "N/A"}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Available Service</h2>
          <div
            className="mx-0 my-0 mt-1.5 w-[100px] h-px bg-black bg-opacity-100 max-w-[1002px]"
            role="separator"
            aria-hidden="true"
          />
          <ul className="text-base font-semibold space-y-1 pl-2 mt-2">
            {tags.slice(2).map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Working Hours</h2>
          <div
            className="mx-0 my-0 mt-1.5 w-[100px] h-px bg-black bg-opacity-100 max-w-[1002px]"
            role="separator"
            aria-hidden="true"
          />
          <ul className="text-base font-semibold space-y-1 pl-2 mt-2">
            <li>7 am - 12 nn</li>
            <li>12 nn - 8 pm</li>
            <li>8 pm - 3 am</li>
          </ul>
        </div>
      </div>
    </div>
  </article>
);


const Page: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isOverflowing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const openCaseCount = cases.filter((c) => c.status === "open").length;
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [flagUrls, setFlagUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchFlagUrls = async () => {
      const countryFlags: { [key: string]: string } = {};
      for (const country of countries) {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${country.code}`);
          const data = await response.json();
          countryFlags[country.code] = data[0]?.flags?.png || "";
        } catch (error) {
          console.error("Error fetching flag for", country.country, error);
        }
      }
      setFlagUrls(countryFlags);
    };

    fetchFlagUrls();
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
        onCountryChange={(selected) => {
          const selectedCountry = countries.find((country) => country.code === selected);
          if (selectedCountry) {
            setSelectedCountry({
              ...selectedCountry,
              flagUrl: flagUrls[selectedCountry.code] || "", 
            });
          } else {
            setSelectedCountry(null);
          }
        }}
      />

      <section
        ref={sectionRef}
        className={`flex gap-10 py-10 mx-20 max-w-none max-md:flex-col max-sm:p-2.5 max-h-[calc(74vh-100px)] ${
          isOverflowing ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <aside className="flex flex-col pt-0 px-4 gap-5 w-[350px] max-md:w-full overflow-y-auto overflow-x-hidden max-h-full rounded-lg">
          {countries.map((country) => (
            <CountryCard
              key={country.code}
              country={{
                code: country.code, 
                country: country.country,
                chapter: country.chapter,
                tags: country.tags,
                supportname: country.supportname,
                address: country.address,
                embassyEmail: country.embassyEmail,
                embassyNumber: country.embassyNumber,
              }}
              onClick={() =>
                setSelectedCountry({
                  code: country.code,
                  country: country.country,
                  chapter: country.chapter,
                  tags: country.tags,
                  supportname: country.supportname,
                  address: country.address,
                  embassyEmail: country.embassyEmail,
                  embassyNumber: country.embassyNumber,
                })
              }
              selected={selectedCountry?.code === country.code}
              countryFlagUrl={flagUrls[country.code] || ""}
            />
          ))}
        </aside>

        {selectedCountry ? (
          <div className="flex-1 max-h-full rounded-lg">
            <MainContent
              {...selectedCountry}
              flagUrl={flagUrls[selectedCountry.code] || ""}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 italic">
            <div className="pb-[120px]">Select a country to preview its content.</div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;