export type CountryData = {
  country: string;
  code: string;
  chapter: string;
  tags: string[]; // Includes embassy number, email, and services
  supportname: string;
  address: string; // Address
  embassyEmail: string;
  embassyNumber: string;
};

export const countries: CountryData[] = [
  {
    country: "Philippines",
    code: "PH",
    chapter: `The Philippines has a democratic government with executive, legislative, and judicial branches. Government workers (civil servants) serve in public offices and are protected by civil service laws.`,
    tags: [
      "Hatid-Sundo Serbis", // Service 1
      "Suicide Hotline", // Service 2
      "Emergency Hotline", // Service 3
    ],
    supportname: "Rex Russel Escarro", // Support country
    address: "Bahay ni Kuya, Lahug, Manila City", // Address
    embassyNumber: "+09 876 543 21", // Embassy Number
    embassyEmail: "pinasembassy@gov.ph", // Embassy Email
  },
  {
    country: "United States of America",
    code: "US",
    chapter: "Federal republic with executive, legislative, and judicial branches. Government employees work in federal, state, and local agencies under civil service rules.",
    tags: [
      "usaembassy@gov.us",
      "Legal Assistance",
      "Emergency Hotline",
    ],
    supportname: "John Doe",
    address: "123 Embassy Lane, Washington, D.C.",
    embassyNumber: "+1 888 407 4747",
    embassyEmail: "acsinfomanila@state.gov",
  },
  {
    country: "Japan",
    code: "JP",
    chapter:
      "Constitutional monarchy with a parliamentary system. Public workers are called civil servants and serve in ministries and agencies.",
    tags: [
      "+81 3 1234 5678",
      "japanembassy@gov.jp", 
      "address Services", 
      "Emergency Hotline", 
    ],
    supportname: "Hiroshi Tanaka",
    address: "1-1 Chiyoda, Tokyo, Japan",
    embassyNumber: "+02 8551 5710",
    embassyEmail: "ryoji@ma.mofa.go.jp",
  },
  // Add more countries as needed
];