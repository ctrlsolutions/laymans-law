import React from "react";
import { Category } from "@/interface/CategoryTypes";
import { Forum } from "@/interface/ForumTypes";
import Card from "@/components/Profile/Card";
import { FaRegBookmark, FaBookmark, FaRegCommentDots } from "react-icons/fa";
import { toggleBookmark } from "@/services/ForumServices";

const ForumCard: React.FC<{
  forumItem: Forum;
  categories: Category[];
  onClick: () => void;
  onBookmarkToggle: (id: number) => void;
  bookmarked: boolean;
}> = ({ forumItem, categories, onClick, onBookmarkToggle, bookmarked }) => {
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.color : "bg-gray-300";
  };

  const getCategoryName = (caseTypeId: string): string => {
    const category = categories.find((c) => c.id === caseTypeId);
    return category ? category.name : caseTypeId;
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await toggleBookmark(forumItem.id);
    if (result) {
      onBookmarkToggle(forumItem.id);
    }
  };

  return (
    <Card className="bg-transparent shadow-none">
      <article className="mt-8 relative z-0">
        <div className="absolute top-[-15px] right-2 flex justify-center items-center px-2 py-1 bg-white border border-gray-300 rounded-lg shadow-sm z-10">
          <span
            className={`mr-2 flex shrink-0 w-2 h-2 ${getCategoryColor(
              forumItem.category
            )} rounded-full`}
            aria-hidden="true"
          />
          <span className="mr-2 text-[9.8px] font-bold">
            {getCategoryName(forumItem.category)}
          </span>
        </div>

        <div
          className="flex gap-5 justify-start items-center px-9 py-7 mt-5 w-full text-black bg-white rounded-3xl shadow-lg border border-black-100 border-opacity-90 cursor-pointer transition hover:shadow-xl"
          onClick={onClick}
        >
          <img
            src={"https://www.w3schools.com/howto/img_avatar.png"}
            alt="Avatar"
            className="w-[70px] rounded-full"
          />

          <div className="flex justify-start items-start gap-4 w-full">
            <div className="flex flex-col text-sm flex-grow w-[77%]">
              <h2 className="text-xl font-bold mb-2">{forumItem.title}</h2>
              <p className="text-xs text-gray-600 mb-2">
                Posted by{" "}
                <strong>
                  {forumItem.author?.first_name} {forumItem.author?.last_name}
                </strong>
              </p>
              <p className="text-xs text-black">{forumItem.content}</p>
            </div>

            <div className="flex flex-col items-end justify-between h-full ml-4 gap-6">
              <button
                onClick={handleBookmarkClick}
                className="text-black hover:text-blue-600"
              >
                {bookmarked ? (
                  <FaBookmark size={20} />
                ) : (
                  <FaRegBookmark size={20} />
                )}
              </button>

              <div className="flex items-center gap-1 text-xs text-black font-medium">
                <FaRegCommentDots size={16} />
                <span>{0} Comments</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Card>
  );
};

export default ForumCard;
