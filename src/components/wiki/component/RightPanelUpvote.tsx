"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/components/wiki/component/Paginations";
import LanguageSelector from "@/components/wiki/component/LanguageSelector";
import TranslationCard from "@/components/wiki/component/TranslationCard";

interface RightPanelUpvoteProps {
  selectedChapter: string;
}

const RightPanelUpvote: React.FC<RightPanelUpvoteProps> = ({
  selectedChapter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");

  // Mock data for translations - in a real app, this would come from an API
  const translations = [
    {
      id: 1,
      chapter: "1",
      title: "R.A. Title of Law of the Philippines",
      author: "Caleb Josh Beranday",
      language: "Tagalog",
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum...",
      votes: 5.25,
    },
    {
      id: 2,
      chapter: "1",
      title: "R.A. Title of Law of the Philippines",
      author: "Alessandra Busiños",
      language: "Waray",
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum...",
      votes: 2.25,
    },
    {
      id: 3,
      chapter: "2",
      title: "R.A. Title of Law of the Philippines",
      author: "Marco Riviera",
      language: "Cebuano",
      content:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum...",
      votes: 3.5,
    },
  ];

  const filteredTranslations = translations.filter(
    (translation) =>
      translation.chapter === selectedChapter &&
      (selectedLanguage === "All Languages" ||
        translation.language === selectedLanguage)
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedChapter, selectedLanguage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, you would fetch the data for the new page here
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Translation</h2>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      {filteredTranslations.length > 0 ? (
        <>
          {filteredTranslations.map((translation) => (
            <TranslationCard key={translation.id} translation={translation} />
          ))}

          <div className="mt-8 mb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={25}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div className="py-10 text-center text-gray-500">
          <p>No translations found for the selected chapter and language.</p>
        </div>
      )}
    </div>
  );
};

export default RightPanelUpvote;
