"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import Button from "@/components/Global/BaseButton";
import Textarea from "@/components/Global/BaseTextArea";
import { createForumPost } from "@/services/ForumServices";

const DiscussionForm: React.FC<{
  forumTitle: string;
  setForumTitle: React.Dispatch<React.SetStateAction<string>>;
  forumDetails: string;
  setForumDetails: React.Dispatch<React.SetStateAction<string>>;
  forumCategory: string;
  setForumCategory: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}> = ({
  forumTitle,
  setForumTitle,
  forumDetails,
  setForumDetails,
  forumCategory,
  setForumCategory,
  handleSubmit,
}) => {
  return (
    <div className="w-full lg:h-[70dvh]">
      <form
        onSubmit={handleSubmit}
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
            onChange={(e) => setForumTitle(e.target.value)}
            placeholder="Enter Forum Title"
            className="w-[50vw] flex-grow h-12 border border-black rounded-lg p-4 text-[14px] text-black-200 focus:outline-none focus:ring-0"
          />

          <BaseFormSelect
            label=""
            name="forumCategory"
            textSize="text-xs"
            value={forumCategory}
            onChange={(e) => setForumCategory(e.target.value)}
            choices={[
              { value: "General", label: "General" },
              { value: "FAQ's", label: "FAQ's" },
              { value: "Divorce Cases", label: "Divorce Cases" },
              { value: "Land Ownership", label: "Land Ownership" },
              { value: "Civil Rights", label: "Civil Rights" },
              { value: "Environmental Law", label: "Environmental Law" },
              { value: "Human Rights", label: "Human Rights" },
              { value: "Other", label: "Other" },
            ]}
          />
        </div>

        <div className="flex flex-col space-y-1 p-1 mt-4 mb-4 relative">
          <Textarea
            name="forumDetails"
            value={forumDetails}
            onChange={(e) => setForumDetails(e.target.value)}
            placeholder="Enter Forum Details"
            className="w-full h-[50dvh] border border-black rounded-lg mt-2.5 p-4 text-[13.5px] text-black text-start align-text-top md:max-w-[80dvw] lg:max-w-[70dvw] xl:max-w-[60dvw] focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
            aria-label="Forum Details"
          />
        </div>
      </form>
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

      console.log("Created forum post:", newPost);

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
          <h1 className="text-black text-lg font-[900] px-2">Post Forum</h1>
          <div
            className="my-0 mt-1.5 w-full h-px bg-black bg-opacity-60"
            role="separator"
            aria-hidden="true"
          />

          <DiscussionForm
            forumTitle={forumTitle}
            setForumTitle={setForumTitle}
            forumDetails={forumDetails}
            setForumDetails={setForumDetails}
            forumCategory={forumCategory}
            setForumCategory={setForumCategory}
            handleSubmit={handleSubmit}
          />

          <div className="flex justify-center mx-auto space-x-40 overflow-y-hidden max-h-[calc(70vh-160px)]">
            <Button
              color="red"
              textColor="white"
              type="button"
              width="200px"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              color="blue"
              textColor="white"
              type="submit"
              width="200px"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DiscussionPage;
