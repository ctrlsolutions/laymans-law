"use client";

import { useState, useCallback } from "react";

interface UseVoteOptions {
  initialValue?: number;
  onVoteChange?: (newValue: number, voteType: "up" | "down" | null) => void;
}

export default function useVote({
  initialValue = 0,
  onVoteChange,
}: UseVoteOptions = {}) {
  const [voteCount, setVoteCount] = useState(initialValue);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const vote = useCallback(
    (type: "up" | "down") => {
      setUserVote((prevVote) => {
        let newVote: "up" | "down" | null;

        if (prevVote === type) {
          newVote = null;
        } else {
          newVote = type;
        }

        let change = 0;

        if (prevVote === "up" && newVote === null) {
          change = -1;
        } else if (prevVote === "down" && newVote === null) {
          change = 1;
        } else if (prevVote === null && newVote === "up") {
          change = 1;
        } else if (prevVote === null && newVote === "down") {
          change = -1;
        } else if (prevVote === "up" && newVote === "down") {
          change = -2;
        } else if (prevVote === "down" && newVote === "up") {
          change = 2;
        }

        setVoteCount((prevCount) => {
          const newCount = prevCount + change;
          if (onVoteChange) {
            onVoteChange(newCount, newVote);
          }
          return newCount;
        });

        return newVote;
      });
    },
    [onVoteChange]
  );

  return {
    voteCount,
    userVote,
    vote,
  };
}
