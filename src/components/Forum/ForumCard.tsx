import React, { useState } from "react";
import { Category, colorMap } from "@/interface/CaseTypes";
import { ForumPost } from "@/interface/ForumTypes";
import Card from "@/components/Profile/Card";
import { FaRegBookmark, FaBookmark, FaRegCommentDots } from "react-icons/fa";

const ForumCard: React.FC<{
  forumItem: ForumPost;
  categories: Category[];
  onClick: () => void;
  onBookmarkToggle: (id: number) => void;
  bookmarked: boolean;
}> = ({ forumItem, categories, onClick }) => {
  const [bookmarked, setBookmarked] = useState(forumItem.bookmark || false);

  return (
    <Card className="bg-transparent shadow-none">
      <article className="mt-8 relative z-0">
        <div
          className="flex gap-5 justify-start items-center px-9 py-7 mt-5 w-full text-black bg-white rounded-3xl shadow-lg border border-black-100 border-opacity-90 cursor-pointer transition hover:shadow-xl"
          onClick={onClick}
        >
          {/* Avatar */}
          <img
            src={"https://www.w3schools.com/howto/img_avatar.png"}
            alt="Avatar"
            className="w-[70px] rounded-full"
          />

          {/* Main Content */}
          <div className="flex justify-start items-start gap-4 w-full">
            {/* Title + Meta + Description */}
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

            {/* Bookmark + Comments */}
            <div className="flex flex-col items-end justify-between h-full ml-4 gap-6">
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

// import React from "react";
// import { FaRegBookmark, FaBookmark, FaRegCommentDots } from "react-icons/fa";
// import Card from "@/components/Profile/Card";

// const ForumCard: React.FC<{
//   forumItem: ForumPost;
//   onClick: () => void;
//   onBookmarkToggle: (id: number) => void;
//   bookmarked: boolean;
// }> = ({ forumItem, onClick, onBookmarkToggle, bookmarked }) => {
//   return (
//     <Card className="bg-transparent shadow-none">
//       <article className="mt-8 relative z-0">
//         <div
//           className="flex gap-5 justify-start items-center px-9 py-7 mt-5 w-full text-black bg-white rounded-3xl shadow-lg border border-black-100 border-opacity-90 cursor-pointer transition hover:shadow-xl"
//           onClick={onClick}
//         >
//           {/* Avatar */}
//           <img
//             src={"https://www.w3schools.com/howto/img_avatar.png"}
//             alt="Avatar"
//             className="w-[70px] rounded-full"
//           />

//           {/* Main Content */}
//           <div className="flex justify-start items-start gap-4 w-full">
//             {/* Title + Meta + Description */}
//             <div className="flex flex-col text-sm flex-grow w-[77%]">
//               <h2 className="text-xl font-bold mb-2">{forumItem.title}</h2>
//               <p className="text-xs text-gray-600 mb-2">
//                 Posted by{" "}
//                 <strong>
//                   {forumItem.author?.first_name} {forumItem.author?.last_name}
//                 </strong>
//               </p>
//               <p className="text-xs text-gray-600 mb-2">
//                 <strong>
//                   {new Date(forumItem.timestamp).toLocaleDateString("en-US", {
//                     weekday: "short",
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}{" "}
//                   {new Date(forumItem.timestamp).toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     hour12: true,
//                   })}
//                 </strong>
//               </p>

//               <p className="text-xs text-black">{forumItem.content}</p>
//             </div>

//             {/* Bookmark + Comments */}
//             <div className="flex flex-col items-end justify-between h-full ml-4 gap-6">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onBookmarkToggle(forumItem.id); // Update global state
//                 }}
//                 className="text-black hover:text-blue-600"
//               >
//                 {bookmarked ? (
//                   <FaBookmark size={20} />
//                 ) : (
//                   <FaRegBookmark size={20} />
//                 )}
//               </button>

//               <div className="flex items-end gap-1 text-xs text-black font-medium">
//                 <FaRegCommentDots size={16} />
//                 <span>{0} Comments</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </article>
//     </Card>
//   );
// };

// export default ForumCard;
