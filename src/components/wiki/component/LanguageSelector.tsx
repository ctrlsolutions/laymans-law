import React, { useState, useEffect, useRef } from "react";
import { iconMapping } from "@/utils/IconMapping";

const ChevronDown = iconMapping.chevronDown;

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage = "Choose Language",
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    "All Languages",
    "English",
    "Tagalog",
    "Cebuano",
    "Ilocano",
    "Hiligaynon",
    "Waray",
    "Kapampangan",
  ];

  const handleLanguageSelect = (language: string) => {
    onLanguageChange(language);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-between items-center w-40 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedLanguage}
        <ChevronDown
          size={14}
          className={`ml-1 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 transition-opacity duration-200 ease-in-out">
          <div
            className="py-1 max-h-64 overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
          >
            {languages.map((language) => (
              <button
                key={language}
                className={`block w-full text-left px-4 py-2 text-xs ${
                  selectedLanguage === language
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                role="menuitem"
                onClick={() => handleLanguageSelect(language)}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
