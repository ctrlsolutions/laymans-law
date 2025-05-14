import React from "react";
import useVote from "@/components/wiki/component/useVote";
import { iconMapping } from "@/utils/IconMapping";

const ChevronUp = iconMapping.chevronUp;
const ChevronDown = iconMapping.chevronDown;

interface TranslationCardProps {
  translation: {
    id: number;
    title: string;
    author: string;
    language: string;
    content: string;
    votes: number;
    chapter: string;
  };
}

const TranslationCard: React.FC<TranslationCardProps> = ({ translation }) => {
  const { voteCount, userVote, vote } = useVote({
    initialValue: translation.votes,
    onVoteChange: (newValue) => {
      console.log(
        `Vote changed to ${newValue} for translation ${translation.id}`
      );
    },
  });

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-md bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => vote("up")}
            className={`p-1 rounded transition-colors duration-200 ${
              userVote === "up"
                ? "text-blue-500"
                : "text-gray-400 hover:text-gray-600"
            }`}
            aria-label="Upvote"
          >
            <ChevronUp size={20} />
          </button>
          <span
            className={`my-1 text-sm font-medium ${
              userVote === "up"
                ? "text-blue-500"
                : userVote === "down"
                ? "text-red-500"
                : "text-gray-700"
            }`}
          >
            {voteCount.toFixed(2)}
          </span>
          <button
            onClick={() => vote("down")}
            className={`p-1 rounded transition-colors duration-200 ${
              userVote === "down"
                ? "text-red-500"
                : "text-gray-400 hover:text-gray-600"
            }`}
            aria-label="Downvote"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        <div className="flex-1">
          <div className="mb-3 text-xs text-gray-500 flex justify-between">
            <span>by {translation.author}</span>
            <span className="font-medium">{translation.language}</span>
          </div>

          <h3 className="text-xl font-bold mb-2">{translation.title}</h3>

          <div className="mb-3">
            <h4 className="font-medium mb-2">Chapter {translation.chapter}</h4>
            <p className="text-sm leading-relaxed text-gray-800">
              {translation.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationCard;
