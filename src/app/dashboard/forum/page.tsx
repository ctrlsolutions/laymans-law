"use client";

import Image from "next/image";
import { useState } from "react";
import CommentBox from "@/components/Forum/CommentBox";
import { Comment } from "@/interface/ComponentTypes";
import { useRouter } from "next/navigation";

const mockComments: Comment[] = [
  {
    author: {
      name: "Alessandra",
      avatar: "/1582663e-4415-4962-9a2c-30ed1183e132.png",
    },
    createdAt: "2 days ago",
    content:
      "I don’t know about divorce, but do you sell hollow blocks? Earth is flat guys, I can explain why it is not round using the power of my eyes!",
    replies: [
      {
        author: {
          name: "Caleb Berandoy",
          avatar: "/1582663e-4415-4962-9a2c-30ed1183e132.png",
        },
        createdAt: "1 day ago",
        content: "Bro stop trolling :-(",
        replies: [],
      },
    ],
  },
  {
    author: {
      name: "Nico Bello",
      avatar: "/1582663e-4415-4962-9a2c-30ed1183e132.png",
    },
    createdAt: "2 days ago",
    content: "Who tf is that troll??",
    replies: [],
  },
];

const Page: React.FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.4fr 1.6fr",
        gap: "1%",
        gridTemplateAreas: `"left-side right-side"`,
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
      className="p-6"
    >
      <div
        style={{ gridArea: "left-side" }}
        className="flex flex-col items-center"
      >
        <Image
          src="/profile.png"
          alt="Profile"
          width={120}
          height={120}
          className="rounded-full border"
          style={{ width: "80px", height: "80px", margin: "0.5rem" }}
        />
        <button
          onClick={() => router.back()}
          className="mt-auto px-4 py-2 bg-white text-black border border-black-300 rounded-md hover:bg-blue-700 text-sm block"
        >
          ← Back
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto auto auto",
          gridTemplateAreas: `
            "header"
            "content"
            "comment-section"
          `,
          gridArea: "right-side",
          overflowY: "auto",
        }}
        className="space-y-6"
      >
        <div style={{ gridArea: "header" }}>
          <h1 className="text-2xl font-bold text-gray-600">
            Petition for Dissolution of Marriage
          </h1>
          <p className="text-xs text-gray-600">
            Shared by <strong>Cheska Paul Tucson</strong> on Aug 2, 2023 ·
            Edited on Nov 19, 2023
          </p>
          <div className="mt-2 flex flex-col items-start gap-2">
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
              Divorce Case
            </span>
            <div className="flex gap-2 text-xs text-black cursor-pointer ml-2">
              <span>Edit</span>
              <span>Delete</span>
            </div>
            <hr className="w-full border-t border-gray-300 mt-2" />
          </div>
        </div>

        <div style={{ gridArea: "content" }}>
          <p className="text-xs text-gray-800 whitespace-pre-line">
            {`Lorem ipsum `.repeat(100)}
          </p>
        </div>

        <div
          style={{ gridArea: "comment-section" }}
          className="bg-gray-10 p-2  rounded-lg"
        >
          <h2 className="text-sm text-gray-600 font-semibold mb-2">
            3 Comments
          </h2>
          <div className="space-y-4">
            {mockComments.map((comment, index) => (
              <CommentBox key={index} comment={comment} />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2">
            <textarea
              placeholder="Reply"
              className="flex-grow border rounded-md p-3 text-sm resize-none"
              rows={3}
            />
            <button className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-700 text-sm">
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
