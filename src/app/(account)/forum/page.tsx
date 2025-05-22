"use client";

import React, { useEffect, useState } from "react";
import { Forum } from "@/interface/ForumTypes";

import BaseFormSelect from "@/components/Global/BaseFormSelect";
import ForumCard from "@/components/Forum/ForumCard";
import ForumSideBar from "@/components/Forum/ForumSideBar";
import Header from "@/components/Profile/Header";

import { getProfile } from "@/services/ProfileServices";
import {
  fetchAllForums,
  fetchBookmarkedForumPosts,
} from "@/services/ForumServices";
import { checkIfBookmarked } from "@/services/ForumServices";

import { sortingOptions, categories } from "@/constants/caseConstants";
import { filterForum } from "@/utils/filterForum";
import { useRouter } from "next/navigation";

const ForumPage: React.FC = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedCaseType, setSelectedCaseType] = useState("all");

  const [forum, setForum] = useState<Forum[]>([]);
  const [forumLoading, setForumLoading] = useState(true);
  const [forumError, setForumError] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filteredForum, setFilteredForum] = useState<Forum[]>([]);
  const ForumCount = filteredForum.filter((f) => f.title).length;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);

  const openModal = (forumItem: Forum) => {
    setSelectedForum(forumItem);
    setIsModalOpen(true);
  };

  const handleBookmarkToggle = (id: number) => {
    setForum((prevCases) =>
      prevCases.map((forumItem) =>
        forumItem.id === id
          ? { ...forumItem, bookmark: !forumItem.bookmark }
          : forumItem
      )
    );
  };

  useEffect(() => {
    if (forum.length > 0) {
      const filtered = filterForum(
        forum,
        searchQuery,
        sortOrder,
        selectedCaseType
      );
      console.log("Filtered forums:", filtered);
      setFilteredForum(filtered);
    }
  }, [forum, searchQuery, selectedCaseType, sortOrder]);

  useEffect(() => {
    const loadForumsByType = async () => {
      setForumLoading(true);
      if (selectedCaseType === "bookmarked") {
        const bookmarked = await fetchBookmarkedForumPosts();
        setForum(
          (bookmarked || []).map((forumItem: any) => ({
            ...forumItem,
            bookmark: true,
          }))
        );
      } else {
        const all = await fetchAllForums();
        if (all.success && all.data) {
          // Check bookmarks for each forum post after fetching
          const forumsWithBookmarks = await Promise.all(
            all.data.map(async (item: Forum) => {
              try {
                const result = await checkIfBookmarked(item.id);
                return { ...item, bookmark: result?.bookmarked };
              } catch (error) {
                console.error("Error checking bookmark:", error);
                return { ...item, bookmark: false };
              }
            })
          );
          setForum(forumsWithBookmarks);
        } else {
          setForumError(all.message || "Failed to load forums");
        }
      }
      setForumLoading(false);
    };

    loadForumsByType();
  }, [selectedCaseType]);

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

  return (
    <main
      className="flex flex-col text-black w-full font-[Poppins]"
      role="main"
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={ForumCount}
        user={user}
      />

      <section
        className="self-center mt-10 pb-10 w-full max-w-[1080px] h-[calc(100vh-40px)] max-h-[77vh] flex flex-col"
        aria-label="Case listings"
      >
        <div className="flex gap-5 max-md:flex-col h-full overflow-hidden">
          {/* Left Content */}
          <div className="w-[77%] h-[98%] max-md:w-full flex flex-col">
            {/* Top Controls */}
            <div className="flex justify-between gap-2 max-md:flex-col mr-6">
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
                  Loading forums...
                </p>
              ) : forumError ? (
                <p className="text-center text-red-500 mt-20">{forumError}</p>
              ) : filteredForum.length > 0 ? (
                filteredForum.map((forumItem) => (
                  <ForumCard
                    key={forumItem.id}
                    forumItem={forumItem}
                    categories={categories}
                    onClick={() => router.push(`/forum/show/`)}
                    onBookmarkToggle={handleBookmarkToggle}
                    bookmarked={forumItem.bookmark}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-20">
                  No forum posts found
                </p>
              )}
            </div>
          </div>
          <ForumSideBar
            selectedCaseType={selectedCaseType}
            setSelectedCaseType={setSelectedCaseType}
            categories={categories}
          />
        </div>
      </section>
    </main>
  );
};

export default ForumPage;
