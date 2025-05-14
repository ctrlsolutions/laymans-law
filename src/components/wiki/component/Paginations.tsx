import React from "react";
import { iconMapping } from "@/utils/IconMapping";

const ChevronLeft = iconMapping.chevronDown;
const ChevronRight = iconMapping.chevronUp;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    pages.push(1);

    const range = [];
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 2) {
      pages.push("...");
    }

    pages.push(...range);

    if (range[range.length - 1] < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          currentPage === 1
            ? "text-gray cursor-not-allowed"
            : "text-gray hover:bg-gray"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() =>
            typeof page === "number" ? handlePageChange(page) : null
          }
          className={`w-8 h-8 flex items-center justify-center rounded-md text-xs ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : page === "..."
              ? "text-gray-500 cursor-default"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? "text-gray cursor-not-allowed"
            : "text-gray hover:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
