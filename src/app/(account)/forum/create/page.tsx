"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import Button from "@/components/Global/BaseButton";
import Textarea from "@/components/Global/BaseTextArea";
import { createForumPost } from "@/services/ForumServices";
import { categories } from "@/constants/caseConstants";

const DiscussionForm: React.FC<{
  forumTitle: string;
  setForumTitle: React.Dispatch<React.SetStateAction<string>>;
  forumDetails: string;
  setForumDetails: React.Dispatch<React.SetStateAction<string>>;
  forumCategory: string;
  setForumCategory: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  forumTitle,
  setForumTitle,
  forumDetails,
  setForumDetails,
  forumCategory,
  setForumCategory,
}) => {
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="w-full lg:h-[70dvh]">
      <div
        className="space-y-4 lg:overflow-x-hidden sm:overflow-y-auto md:overflow-y-auto 
        lg:overflow-y-auto sm:max-h-[calc(50vh-156px)] sm:max-w-[58dvw] 
        md:max-h-[calc(50vh-156px)] md:max-w-[54dvw] 
        lg:max-h-[calc(90vh-156px)] lg:max-w-[70dvw] 
        xl:max-h-[calc(95vh-200px)] my-2"
      >
        <div className="flex items-center space-x-4 mt-2">
          <BaseFormInput
            label=""
            name="forumTitle"
            type="text"
            value={forumTitle}
            width="50px"
            onChange={(e) => setForumTitle(e.target.value)}
            placeholder="Enter Forum Title"
            className="w-[51vw] flex-grow h-12 border border-black rounded-lg p-4 text-[0.90rem] text-black-200 focus:outline-none focus:ring-0"
          />

          <BaseFormSelect
            label=""
            name="forumCategory"
            width="200px"
            textSize="text-xs"
            value={forumCategory}
            onChange={(e) => setForumCategory(e.target.value)}
            choices={categoryOptions}
          />
        </div>

        <div className="flex flex-col space-y-1 p-1 mt-4 mb-4 relative">
          <Textarea
            name="forumDetails"
            value={forumDetails}
            onChange={(e) => setForumDetails(e.target.value)}
            placeholder="Enter Forum Details"
            className="w-full h-[50dvh] border border-black rounded-lg mt-2.5 p-4 text-[0.95rem] placeholder:text-[0.95rem] text-black text-start align-text-top md:max-w-[80dvw] lg:max-w-[100dvw] xl:max-w-[100vw] focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
            aria-label="Forum Details"
            maxLength={500}
          />
          <span className="absolute bottom-2 right-12 text-xs text-gray-500 bg-white bg-opacity-80 px-1 rounded">
            {forumDetails.length}/500
          </span>
        </div>
      </div>
    </div>
  );
};

const DiscussionPage: React.FC = () => {
  const [user] = useState<{ first_name: string; last_name: string } | null>(
    null
  );
  const [forumTitle, setForumTitle] = useState("");
  const [forumDetails, setForumDetails] = useState("");
  const [forumCategory, setForumCategory] = useState("General");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forumTitle || !forumDetails) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const newPost = await createForumPost({
        title: forumTitle,
        content: forumDetails,
        category: forumCategory,
        author: {
          first_name: user?.first_name || "Anonymous",
          last_name: user?.last_name || "User",
        },
        bookmark: false,
      });

      if (!newPost) {
        throw new Error("Failed to create forum post.");
      }

      alert("Forum post created successfully!");
      setForumTitle("");
      setForumDetails("");
      setForumCategory("General");

      router.push("/forum");
    } catch (err) {
      console.error("Submission error:", err);
      alert("There was an error submitting your forum post.");
    }
  };

  const handleCancel = () => {
    setForumTitle("");
    setForumDetails("");
  };

  return (
    <main className="h-[calc(100vh-4rem)] px-4 py-6 lg:px-8">
      <section className="mx-0 flex flex-col mt-6 overflow-y-auto max-h-full md:mx-4 lg:mx-8 lg:flex-row">
        <div className="w-full mx-0 md:mx-4">
          <h1 className="text-black text-lg font-[900] px-2">Create a Post</h1>
          <div
            className="my-0 mt-1.5 w-full h-px bg-black bg-opacity-60"
            role="separator"
            aria-hidden="true"
          />

          {/* Wrap entire form including buttons */}
          <form onSubmit={handleSubmit}>
            <DiscussionForm
              forumTitle={forumTitle}
              setForumTitle={setForumTitle}
              forumDetails={forumDetails}
              setForumDetails={setForumDetails}
              forumCategory={forumCategory}
              setForumCategory={setForumCategory}
            />

            <div className="flex justify-between mx-auto space-x-8 overflow-y-hidden max-h-[calc(70vh-160px)]">
              <Button
                color="red"
                textColor="white"
                type="button"
                width="200px"
                onClick={handleCancel}
              >
                Back
              </Button>
              <Button
                color="blue"
                textColor="white"
                type="submit"
                width="200px"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default DiscussionPage;
