"use client";

import React, { useEffect, useState } from "react";
import { Forum } from "@/interface/ForumTypes";
import { User } from "@/interface/AuthTypes";

import BaseFormSelect from "@/components/Global/BaseFormSelect";
import ForumCard from "@/components/Forum/ForumCard";
import ForumSideBar from "@/components/Forum/ForumSideBar";
import Header from "@/components/Profile/Header";
import ForumModal from "@/components/Forum/ForumModal";
import ForumModalContent from "@/components/Forum/ForumModalContent";

import { getProfile } from "@/services/ProfileServices";
import {
  fetchAllForums,
  fetchBookmarkedForumPosts,
} from "@/services/ForumServices";
import { checkIfBookmarked, toggleBookmark } from "@/services/ForumServices";

import { sortingOptions, categories } from "@/constants/caseConstants";
import { filterForum } from "@/utils/filterForum";

const ForumPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedCaseType, setSelectedCaseType] = useState("all");

  const [forum, setForum] = useState<Forum[]>([]);
  const [forumLoading, setForumLoading] = useState(true);
  const [forumError, setForumError] = useState("");

  const [user, setUser] = useState<User | null>(null);

  const [filteredForum, setFilteredForum] = useState<Forum[]>([]);
  const ForumCount = filteredForum.filter((f) => f.title).length;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);

  const openModal = (forumItem: Forum) => {
    // Find the latest forum object from state
    const latestForum = forum.find((f) => f.id === forumItem.id) || forumItem;
    setSelectedForum(latestForum);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedForum(null);
  };

  const handleForumDelete = (deletedId: number) => {
    setForum((prevForums) => prevForums.filter((f) => f.id !== deletedId));
    setSelectedForum(null);
    setIsModalOpen(false);
  };

  const handleBookmarkToggle = async (id: number) => {
    const result = await toggleBookmark(id);
    if (!result) {
      return;
    }
    setForum((prevForums) =>
      prevForums.map((f) =>
        f.id === id
          ? {
              ...f,
              bookmark: result.bookmarked,
              bookmark_count: result.bookmark_count,
            }
          : f
      )
    );
    setSelectedForum((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            bookmark: result.bookmarked,
            bookmark_count: result.bookmark_count,
          }
        : prev
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
      setFilteredForum(filtered);
    }
  }, [forum, searchQuery, selectedCaseType, sortOrder]);

  useEffect(() => {
    const loadForumsByType = async () => {
      setForumLoading(true);
      if (selectedCaseType === "bookmarked") {
        const bookmarked = await fetchBookmarkedForumPosts();
        setForum(
          (bookmarked || []).map((forumItem: Forum) => ({
            ...forumItem,
            bookmark: true,
          }))
        );
      } else {
        const all = await fetchAllForums();
        if (all.success && all.data) {
          const forumsWithBookmarks = await Promise.all(
            (all.data as Forum[]).map(async (item: Forum) => {
              try {
                const result = await checkIfBookmarked(item.id);
                return { ...item, bookmark: result?.bookmarked ?? false };
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
          setUser(response.data as User);
        } else {
          console.error("Error fetching user data:", response.message);
        }
      }
    };

    fetchUserProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main
      className="flex flex-col text-black w-full font-[Poppins] "
      role="main"
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={ForumCount}
        user={user ? { firstName: user.first_name } : null}
      />

      <section
        className="self-center mt-6 pb-10 w-full h-[calc(100vh-40px)] max-h-[78vh] md:h-[60vh]  flex flex-col
        max-sm:h-[68vh]
        "
        aria-label="Case listings"
      >
        <div className="flex gap-5 px-10 max-md:flex-col h-full overflow-hidden max-md:overflow-y-auto">
          <div className="w-[77%] h-[98%] max-md:w-full flex flex-col">
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
            <div className="flex-1 overflow-y-auto pr-5 p-3">
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
                    onClick={() => openModal(forumItem)}
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

      {isModalOpen && selectedForum && (
        <ForumModal onClose={closeModal}>
          <ForumModalContent
            post={selectedForum}
            onDelete={handleForumDelete}
          />
        </ForumModal>
      )}
    </main>
  );
};

export default ForumPage;
