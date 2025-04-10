import React from "react";
import { Case, Category } from "@/interface/CaseTypes";
import Card from "@/components/Profile/Card";

const CaseCard: React.FC<{ caseItem: Case; categories: Category[] }> = ({ caseItem, categories }) => {
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
      <article className="mt-8 z-0 relative">
        {/* Case Type positioned to overlap slightly at the top of the card */}
        <div className="absolute top-[-15px] right-2 flex justify-center items-center px-2 py-1 bg-white border border-gray-300 rounded-lg shadow-sm z-10">
          <span
            className={`mr-2 flex shrink-0 w-2 h-2 ${getCategoryColor(caseItem.case_type)} rounded-full`}
            aria-hidden="true"
          ></span>
          <span className="mr-2 text-[9.8px] font-bold">{caseItem.case_type}</span>
        </div>

        <div className="flex gap-5 justify-start items-center px-9 py-7 mt-5 w-full text-black bg-white rounded-3xl shadow-lg border border-black-100 border-opacity-90">
          <img
            src={caseItem.avatar || "https://www.w3schools.com/howto/img_avatar.png"}
            alt="Avatar"
            className="w-[70px] rounded-full"
          />
          <div className="flex flex-col text-sm">
            <h2 className="text-xl font-bold">{caseItem.title}</h2>
            <div className="mt-3 font-light">
              <p className="text-xs">
                Last updated on{" "}
                <strong className="font-bold">
                  {new Date(caseItem.created_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>
                <br />
                <strong className="font-bold">
                  at{" "}
                  {new Date(caseItem.created_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>
              </p>
            </div>
            <p className="mt-4 text-sm">{caseItem.description}</p>
          </div>

          <div className="flex gap-2 px-2.5 py-2.5 text-base font-bold bg-white rounded-xl shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:bg-blue-700">
            <StatusIndicator isOpen={caseItem.status === "open"} />
            <span className="pl-1 pr-4 text-base font-extrabold">
              {caseItem.status === "open" ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </article>
    </Card>
  );
};

export default CaseCard;
