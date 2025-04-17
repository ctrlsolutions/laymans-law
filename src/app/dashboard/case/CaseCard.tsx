import React from "react";
import { Case, Category } from "@/interface/CaseTypes";

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
      <article className="mt-8 z-0">
        <div className="relative ml-[580px] flex justify-center items-center px-1.5 py-1 bg-white border border-gray-300 rounded-lg shadow-sm w-fit z-0">
          <span className={`mr-2 flex shrink-0 w-2 h-2 ${getCategoryColor(caseItem.category.name)} rounded-full`} aria-hidden="true"></span>
          <span className="mr-2 text-[9.8px] font-bold">{caseItem.category.name}</span>
        </div>
        <div className="flex z-0 gap-5 justify-between items-start px-9 py-7 mt-[-10px] w-full text-black bg-white rounded-3xl shadow-lg border border-black-100 border-opacity-90">
          <img src={caseItem.avatar} alt="" className="w-[70px] rounded-full" />
          <div className="flex flex-col text-xs">
            <h2 className="text-xl font-bold">{caseItem.title}</h2>
            <div className="flex gap-1 mt-3 font-light">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f62326b4ac842495a4827f224d60986da492d5c8?placeholderIfAbsent=true&apiKey=b97adb845ad745fdabf283f95e3c166e"
                alt=""
                className="w-2"
                aria-hidden="true"
              />
              <p>
                Latest update from <strong className="font-bold">{caseItem.lastUpdate.user}</strong> {caseItem.lastUpdate.time}
              </p>
            </div>
            <p className="mt-4 font-[275]">{caseItem.description}</p>
          </div>
          <div className="flex gap-2 px-2.5 py-2.5 text-base font-bold bg-white rounded-xl shadow-[0px_0px_4px_rgba(0,0,0,0.25)] hover:bg-blue-700">
            <StatusIndicator isOpen={caseItem.status.isOpen} />
            <span className="pl-1 pr-4  text-base font-extrabold">{caseItem.status.isOpen ? "Open" : "Close"}</span>
          </div>
        </div>
      </article>
    );
  };
  
  export default CaseCard;  
