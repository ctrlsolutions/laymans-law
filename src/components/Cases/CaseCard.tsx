import React from "react";
import { Case, Category } from "@/interface/CaseTypes";
import Card from "@/components/Profile/Card";

const CaseCard: React.FC<{ caseItem: Case; categories: Category[]; onClick: () => void }> = ({ caseItem, categories, onClick }) => {
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName);
    return category ? category.color : "bg-gray-300";
  };

  const StatusIndicator: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    const color = isOpen ? "bg-[#4BB328]" : "bg-[#B32828]";
    return <span className={`flex self-center shrink-0 w-2 h-2 ${color} rounded-full`} aria-hidden="true" />;
  };

  return (
    <Card className="bg-transparent shadow-none">
      <article className="mt-8 relative z-0">
        {/* Case Type badge */}
        <div className="absolute top-[-15px] right-2 flex justify-center items-center px-2 py-1 bg-white border border-gray-300 rounded-lg shadow-sm z-10">
          <span
            className={`mr-2 flex shrink-0 w-2 h-2 ${getCategoryColor(caseItem.case_type)} rounded-full`}
            aria-hidden="true"
          ></span>
          <span className="mr-2 text-[9.8px] font-bold">{caseItem.case_type}</span>
        </div>

        {/* Main Content */}
        <div className="flex gap-5 justify-start items-center px-9 py-7 mt-5 w-full text-black bg-white rounded-3xl shadow-lg border border-black-100 border-opacity-90 cursor-pointer transition hover:shadow-xl" onClick={onClick}>

          {/* Avatar */}
          <img
            src={caseItem.avatar || "https://www.w3schools.com/howto/img_avatar.png"}
            alt="Avatar"
            className="w-[70px] rounded-full"
          />
          
          {/* Content and Status */}
          <div className="flex justify-between items-start w-full">
            {/* Text Content */}
            <div className="flex flex-col text-sm max-w-[80%]">
              <h2 className="text-xl font-bold">{caseItem.title}</h2>
              <div className="mt-3 font-light">
                <p className="text-xs mb-2">{caseItem.description}</p>
                <p className="text-xs">
                  Last updated on{" "}
                  <strong className="font-bold">
                    {new Date(caseItem.created_date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </strong>
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 px-2.5 py-2.5 bg-white rounded-xl shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:bg-blue-700 text-base font-bold">
              <StatusIndicator isOpen={caseItem.status === "open"} />
              <span className="pl-1 pr-4 text-base font-extrabold">
                {caseItem.status === "open" ? "Open" : "Closed"}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Card>
  );
};

export default CaseCard;
