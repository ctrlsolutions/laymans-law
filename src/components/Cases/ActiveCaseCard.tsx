import React from "react";
import { Case, Category } from "@/interface/CaseTypes";
import Card from "@/components/Profile/Card";

const CaseCard: React.FC<{
  caseItem: Case;
  categories: Category[];
  onClick: () => void;
}> = ({ caseItem, categories, onClick }) => {
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.color : "bg-gray-300";
  };

  const getCategoryName = (caseTypeId: string): string => {
    const category = categories.find((c) => c.id === caseTypeId);
    return category ? category.name : caseTypeId;
  };

  return (
    <Card className="bg-transparent shadow-none">
      <article className="z-0 relative">
        {" "}
        <div className="absolute top-[-12px] right-2 flex justify-center items-center px-2 py-1 bg-white text-black border border-gray-300 rounded-md shadow-sm z-10 text-xs">
          <span
            className={`mr-1 flex shrink-0 w-2 h-2 ${getCategoryColor(
              caseItem.case_type
            )} rounded-full`}
            aria-hidden="true"
          />
          <span className="font-semibold">
            {getCategoryName(caseItem.case_type)}
          </span>
        </div>
        {/* Main Card Content */}
        <div
          className="flex gap-3 justify-between items-start px-5 py-4 mt-4 w-full text-black bg-white rounded-2xl shadow-md border border-black-100 border-opacity-90 cursor-pointer transition hover:shadow-lg"
          onClick={onClick}
        >
          <div className="flex items-start gap-4 text-sm">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{caseItem.title}</h2>

              <div className="mt-1 text-xs font-medium">
                <span className="font-semibold">Posted by: </span>
                {caseItem.created_by
                  ? `${caseItem.created_by.first_name} ${caseItem.created_by.last_name}`
                  : "Unknown User"}
              </div>

              <p className="mt-2 text-xs font-light">
                Last updated on{" "}
                <strong>
                  {new Date(caseItem.created_date).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </strong>{" "}
                at{" "}
                <strong>
                  {new Date(caseItem.created_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>
              </p>

              <p className="mt-2 text-xs line-clamp-2">
                {caseItem.description}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Card>
  );
};

export default CaseCard;
