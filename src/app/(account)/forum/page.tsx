"use client";
import * as React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineBookmarks, MdForum } from "react-icons/md";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import { Case, Category } from "@/interface/CaseTypes";
import ForumCard from "@/components/Forum/ForumCard";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "@/services/ProfileServices";
import Header from "@/components/Profile/Header";
import { fetchAllForumPosts } from "@/services/ForumServices";
import { useRouter } from "next/navigation";
import { FaCheckSquare, FaRegSquare, FaBookmark } from "react-icons/fa";
import { sortingOptions, categories } from "@/constants/caseConstants";
import { ForumPost } from "@/interface/ForumTypes";

const Sidebar: React.FC<{
  selectedCaseType: string;
  setSelectedCaseType: (type: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  router: ReturnType<typeof useRouter>;
}> = ({
  selectedCaseType,
  setSelectedCaseType,
  selectedCategory,
  setSelectedCategory,
  router,
}) => (
  <aside
    className="ml-5 w-[23%] max-md:ml-0 max-md:w-full"
    role="complementary"
  >
    <nav className="flex flex-col mt-3 w-full text-xs font-medium">
      {/* Start a Discussion Button */}
      <button
        className="bg-red text-white text-md py-4 px-4 rounded-lg font-semibold mb-4 hover:bg-red-700 transition shadow-xl"
        onClick={() => router.push("/forum/create")}
      >
        Start a Discussion
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={() => setSelectedCaseType("all")}
        className={`flex gap-1 mt-1.5 items-center hover:underline ${
          selectedCaseType === "all" ? "text-[#0838E5] font-bold" : "text-black"
        }`}
      >
        <MdForum className="text-xl" />
        <span className="font-semibold">All Discussion</span>
        {selectedCaseType === "all" && (
          <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />
        )}
      </button>
      <button
        onClick={() => setSelectedCaseType("closed")}
        className={`flex gap-1.5 mt-1.5 items-center hover:underline ${
          selectedCaseType === "closed"
            ? "text-[#0838E5] font-bold"
            : "text-black"
        }`}
      >
        <MdOutlineBookmarks className="text-xl" />
        <span className="font-semibold">Favorites</span>
        {selectedCaseType === "closed" && (
          <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />
        )}
      </button>

      <hr className="mt-3 border-black border-opacity-30" />
      <ul className="mt-5" role="list">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`flex gap-3 mt-6 ml-3.5 hover:underline cursor-pointer ${
              selectedCategory === category.name
                ? "text-[#0838E5] font-bold"
                : "text-black"
            }`}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )
            }
          >
            <span
              className={`flex self-center shrink-0 w-2 h-2 ${category.color} rounded-full`}
              aria-hidden="true"
            />
            <span>{category.name}</span>
            {selectedCategory === category.name && (
              <IoMdCheckmark className="ml-auto text-blue-600 text-xl" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

const InputDesign: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedCaseType, setSelectedCaseType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [cases, setForum] = useState<ForumPost[]>([]);
  const [forumLoading, setForumLoading] = useState(true);
  const [casesError, setCasesError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allReadChecked, setAllReadChecked] = useState(false);
  const router = useRouter();

  const handleBookmarkToggle = (id: number) => {
    setForum((prevCases) =>
      prevCases.map((forumItem) =>
        forumItem.id === id
          ? { ...forumItem, bookmark: !forumItem.bookmark } // Toggle bookmark
          : forumItem
      )
    );
  };

  const filteredCases = cases.filter((forumItem) => {
    const query = searchQuery.toLowerCase();
    const matchesCaseType =
      selectedCaseType === "all"
        ? true
        : selectedCaseType === "open"
        ? forumItem.bookmark === true
        : selectedCaseType === "closed"
        ? forumItem.bookmark === false
        : false;
    const matchesCategory =
      selectedCategory === null || forumItem.category === selectedCategory;
    const matchesSearch =
      forumItem.title.toLowerCase().includes(query) ||
      forumItem.category.toLowerCase().includes(query);
    return matchesCaseType && matchesCategory && matchesSearch;
  });

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadforum = async () => {
      const response = await fetchAllForumPosts();
      if (isMounted) {
        if (response) {
          const forumPostsAsCases: ForumPost[] = response.map((post) => ({
            id: post.id,
            author: {
              first_name: post.author.first_name,
              last_name: post.author.last_name,
            },
            title: post.title,
            content: post.content,
            timestamp: post.timestamp,
            bookmark: post.bookmark,
            category: post.category,
          }));

          setForum(forumPostsAsCases);
          setForumLoading(false);
        } else {
          setCasesError("Failed to load forum posts.");
          setForumLoading(false);
        }
      }
    };

    loadforum();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      const response = await getProfile();
      if (isMounted) {
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          console.error("Error fetching user data:", response.message);
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const openCaseCount = filteredCases.filter((c) => (c.bookmark = true)).length;

  return (
    <main
      className="flex flex-col text-black w-full font-[Poppins]"
      role="main"
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={openCaseCount}
        user={user}
      />

      <section
        className="self-center mt-10 pb-10 w-full max-w-[1080px] h-[calc(100vh-40px)] max-h-[77vh] flex flex-col"
        aria-label="Case listings"
      >
        <div className="flex gap-5 max-md:flex-col h-full overflow-hidden">
          {/* Left Content */}
          <div className="w-[77%] h-[100%] max-md:w-full flex flex-col">
            {/* Top Controls */}
            <div className="flex justify-between gap-4 mb-6 max-md:flex-col mr-6">
              <BaseFormSelect
                label=""
                name="sortOrder"
                value={sortOrder}
                choices={sortingOptions}
                onChange={(e) => setSortOrder(e.target.value)}
                width="145px"
                textSize="text-xs"
              />
            </div>

            {/* Scrollable Case List */}
            <div className="flex-1 overflow-y-auto pr-5">
              {forumLoading ? (
                <p className="text-center text-gray-500 mt-20">
                  Loading cases...
                </p>
              ) : casesError ? (
                <p className="text-center text-red-500 mt-20">{casesError}</p>
              ) : sortedCases.length > 0 ? (
                sortedCases.map((forumItem) => (
                  <ForumCard
                    key={forumItem.id}
                    forumItem={forumItem}
                    categories={categories}
                    onClick={() =>
                      router.push(`/dashboard/case/${forumItem.id}`)
                    }
                    onBookmarkToggle={handleBookmarkToggle} // Pass handler
                    bookmarked={forumItem.bookmark} // Pass bookmark status
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-20">
                  No forum posts found
                </p>
              )}
            </div>
          </div>
          <Sidebar
            selectedCaseType={selectedCaseType}
            setSelectedCaseType={setSelectedCaseType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            router={router}
          />
        </div>
      </section>
    </main>
  );
};

export default InputDesign;
