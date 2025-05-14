"use client";
import React, { useState, useEffect, useRef } from "react";
import { cases } from "@/interface/CaseTypes";
import Header from "@/components/Profile/Header";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { CountryData } from "@/interface/CountryTypes";
import { fetchOFWSupport } from "@/services/OfwServices";

type SupportSectionHeaderProps = {
  onCountryChange: (countryCode: string) => void;
  countries: CountryData[];
};

function sanitizeUrl(url: any) {
  const trimmed = url.trim().replace(/\s+/g, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed.replace(/^https?:\/\//, "")}`;
}

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
              value: country.country,
            })),
          ]}
          onChange={(e) => handleSelectChange(e.target.value)}
        />
      </div>
    </nav>
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
        opacity: 0.55,
      }}
      aria-hidden="true"
    />
    <div className="relative z-10 h-[300px] flex flex-col items-center text-center py-4 px-6 gap-12 mt-auto">
      <h2 className="text-lg font-semibold text-black mt-20 text-shadow-lg">
        {country.country}
      </h2>
      <p className="text-sm text-black line-clamp-5">{country.description}</p>
    </div>
  </article>
);

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
  <article className="h-full flex-1 p-10 bg-white border border-gray rounded-2xl shadow-sm overflow-y-auto max-h-[calc(72vh-156px)]">
    <div className="flex w-full justify-between items-center mb-8">
      <h1 className="text-3xl font-semibold flex items-center gap-2">
        {country}{" "}
        {flagUrl ? (
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
      <p>{support_name}</p>
    </div>
    <div className="grid grid-cols-2 gap-8 overflow-hidden max-md:grid-cols-1 max-sm:gap-4">
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Support Name</h2>
          <p className="text-base font-semibold pl-2 mt-2">
            {support_name || "N/A"}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Address</h2>
          <p className="text-base font-semibold pl-2 mt-2">
            {address || "N/A"}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Embassy Number</h2>
          <ul className="list-disc text-base font-semibold space-y-1 pl-6 mt-2">
            {contact_number ? (
              contact_number
                .split(";")
                .map((number, index) => <li key={index}>{number.trim()}</li>)
            ) : (
              <li>N/A</li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500">Embassy Email</h2>
          <ul className="list-disc text-base font-semibold space-y-1 pl-6 mt-2">
            {email_address
              ?.split(";")
              .map((email, index) => <li key={index}>{email.trim()}</li>) || (
              <li>N/A</li>
            )}
          </ul>
        </div>
      </div>
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

      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500">
            Available Services
          </h2>
          <ul className="list-disc text-base font-semibold space-y-1 pl-6 mt-2">
            {available_services.split(";").map((service, index) => (
              <li key={index}>{service.trim()}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Working Hours</h2>
          <p className="text-base font-semibold pl-2 mt-2">
            {working_hours || "N/A"}
          </p>
        </div>
      </div>
    </div>
  </article>
);

const Page: React.FC = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isOverflowing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const openCaseCount = cases.filter((c) => c.status === "open").length;
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [flagUrls, setFlagUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supportData = await fetchOFWSupport();

        const countriesMapped = supportData.map((data: CountryData) => ({
          id: data.id,
          country: data.country,
          support_name: data.support_name,
          description: data.description,
          address: data.address,
          contact_number: data.contact_number,
          email_address: data.email_address,
          website: data.website,
          available_services: data.available_services,
          working_hours: data.working_hours,
        }));

        setCountries(countriesMapped);

        const countryFlags: { [key: string]: string } = {};
        for (const country of countriesMapped) {
          try {
            const response = await fetch(
              `https://restcountries.com/v3.1/name/${country.country}?fullText=true`
            );
            const data = await response.json();
            countryFlags[country.country] = data[0]?.flags?.png || "";
          } catch (error) {
            console.error("Error fetching flag for", country.country, error);
          }
        }
        setFlagUrls(countryFlags);
      } catch (error) {
        console.error("Error in fetchData:", error);
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
        onCountryChange={(selected) => {
          const selectedCountry = countries.find(
            (country) => country.country === selected
          );
          if (selectedCountry) {
            setSelectedCountry(selectedCountry);
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
              key={country.country}
              country={{
                id: country.id,
                country: country.country,
                description: country.description,
                support_name: country.support_name,
                address: country.address,
                contact_number: country.contact_number,
                email_address: country.email_address,
                website: country.website,
                available_services: country.available_services,
                working_hours: country.working_hours,
              }}
              onClick={() => setSelectedCountry(country)}
              selected={selectedCountry?.country === country.country}
              countryFlagUrl={flagUrls[country.country] || ""}
            />
          ))}
        </aside>

        {selectedCountry ? (
          <div className="flex-1 max-h-full rounded-lg">
            <MainContent
              {...selectedCountry}
              flagUrl={flagUrls[selectedCountry.country] || ""}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 italic">
            <div className="pb-[120px]">
              Select a country to preview its content.
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;
