import React, { useState } from "react";
import { Case, Category, colorMap } from "@/interface/CaseTypes";
import Card from "@/components/Profile/Card";
import { FaRegBookmark, FaBookmark, FaRegCommentDots } from "react-icons/fa";

const ForumCard: React.FC<{
  caseItem: Case;
  categories: Category[];
  onClick: () => void;
}> = ({ caseItem, categories, onClick }) => {
  const [bookmarked, setBookmarked] = useState(caseItem.isBookmarked || false);

  const getCategoryColor = (category: Category) => {
    return colorMap[category.color] || "bg-gray-300";
  };

  const category = categories.find((cat) => cat.id === caseItem.case_type);
  const categoryColor = category ? getCategoryColor(category) : "bg-gray-300";

  return (
    <Card className="bg-transparent shadow-none">
      <article className="mt-8 relative z-0">
        {/* Case Type Label */}
        <div className="absolute top-[-15px] right-2 flex justify-center items-center px-2 py-1 bg-white border border-gray-300 rounded-lg shadow-sm z-10">
          <span
            className={`mr-2 flex shrink-0 w-2 h-2 ${categoryColor} rounded-full`}
            aria-hidden="true"
          ></span>
          <span className="mr-2 text-[9.8px] font-bold">
            {category?.name ?? caseItem.case_type}
          </span>
        </div>

        {/* Main Card */}
        <div
          className="flex gap-5 justify-start items-center px-9 py-7 mt-5 w-full text-black bg-white rounded-3xl shadow-lg border border-black-100 border-opacity-90 cursor-pointer transition hover:shadow-xl"
          onClick={onClick}
        >
          {/* Avatar */}
          <img
            src={
              caseItem.avatar ||
              "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt="Avatar"
            className="w-[70px] rounded-full"
          />

          {/* Main Content */}
          <div className="flex justify-start items-start gap-4 w-full">
            {/* Title + Meta + Description */}
            <div className="flex flex-col text-sm flex-grow w-[77%]">
              {/* Title */}
              <h2 className="text-xl font-bold mb-2">{caseItem.title}</h2>

              {/* Latest Reply */}
              <p className="text-xs text-gray-600 mb-2">
                Latest reply from{" "}
                <strong>@{caseItem.latest_reply_user || "unknown"}</strong> ·{" "}
                {caseItem.last_updated || "30 minutes ago"}
              </p>

              {/* Description */}
              <p className="text-xs text-black">{caseItem.description}</p>
            </div>

            {/* Right Section: Bookmark + Users + Comments */}
            <div className="flex flex-col items-end justify-between h-full ml-4 gap-6">
              {/* Bookmark Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBookmarked((prev) => !prev);
                }}
                className="text-black hover:text-blue-600"
              >
                {bookmarked ? (
                  <FaBookmark size={20} />
                ) : (
                  <FaRegBookmark size={20} />
                )}
              </button>

              {/* Engaged Users */}
              <div className="flex -space-x-3">
                {caseItem.engagedUsers?.slice(0, 5).map((userImg, idx) => (
                  <img
                    key={idx}
                    src={userImg}
                    alt="user"
                    className="w-7 h-7 rounded-full border-2 border-white"
                  />
                ))}
                {caseItem.engagedUsers?.length > 5 && (
                  <div className="w-7 h-7 rounded-full bg-gray-300 text-xs flex items-center justify-center border-2 border-white">
                    +{caseItem.engagedUsers.length - 5}
                  </div>
                )}
              </div>

              {/* Comments */}
              <div className="flex items-center gap-1 text-xs text-black font-medium">
                <FaRegCommentDots size={16} />
                <span>{caseItem.commentsCount || 0} Comments</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Card>
  );
};

export default ForumCard;
