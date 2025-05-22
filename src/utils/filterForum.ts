// import { Forum } from "@/interface/ForumTypes";

// export function filterForum(
//   forum: Forum[],
//   searchQuery: string,
//   sortOrder: string,
//   selectedCategory: string | null,
//   selectedForumType: string
// ): Forum[] {
//   const query = searchQuery.toLowerCase();

//   let filtered = forum.filter((forumItem) => {
//     const matchesSearch =
//       forumItem.title.toLowerCase().includes(query) ||
//       forumItem.category.toLowerCase().includes(query);

//     let matchesCategory = true;
//     if (selectedCategory && selectedCategory !== "all") {
//       matchesCategory = forumItem.category === selectedCategory;
//     }

//     let matchesType = true;
//     if (selectedForumType === "bookmarked") {
//       matchesType = forumItem.bookmark === true;
//     }

//     return matchesSearch && matchesCategory && matchesType;
//   });

//   filtered.sort((a, b) => {
//     const dateA = new Date(a.timestamp).getTime();
//     const dateB = new Date(b.timestamp).getTime();
//     return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
//   });

//   return filtered;
// }

// utils/filterForum.ts
import { Forum } from "@/interface/ForumTypes";

export function filterForum(
  forum: Forum[],
  searchQuery: string,
  sortOrder: string,
  selectedCaseType: string // "all", "bookmarked", or category ID
): Forum[] {
  const query = searchQuery.toLowerCase();

  let filtered = forum.filter((forumItem) => {
    const matchesSearch =
      forumItem.title.toLowerCase().includes(query) ||
      forumItem.category.toLowerCase().includes(query);

    // Handle category filter (if selectedCaseType is a category ID)
    let matchesCategory = true;
    if (
      selectedCaseType !== "all" &&
      selectedCaseType !== "bookmarked" &&
      selectedCaseType !== ""
    ) {
      matchesCategory = forumItem.category === selectedCaseType;
    }

    // Handle bookmark filter
    let matchesType = true;
    if (selectedCaseType === "bookmarked") {
      matchesType = forumItem.bookmark === true;
    }

    return matchesSearch && matchesCategory && matchesType;
  });

  // Sort by latest/oldest
  filtered.sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return filtered;
}
