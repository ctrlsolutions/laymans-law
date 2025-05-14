"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Header from "@/components/Profile/Header";
import BaseFormInput from "@/components/Global/BaseFormInput";
import BaseFormSelect from "@/components/Global/BaseFormSelect";
import Button from "@/components/Global/BaseButton";
import Textarea from "@/components/Global/BaseTextArea";
import { Case } from "@/interface/CaseTypes";

const DiscussionForm: React.FC<{
  forumTitle: string;
  setForumTitle: React.Dispatch<React.SetStateAction<string>>;
  forumDetails: string;
  setForumDetails: React.Dispatch<React.SetStateAction<string>>;
  forumCategory: string;
  setForumCategory: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  file: File | null;
  image: File | null;
  video: File | null;
}> = ({
  forumTitle,
  setForumTitle,
  forumDetails,
  setForumDetails,
  forumCategory,
  setForumCategory,
  handleSubmit,
  file,
  image,
  video,
}) => {
  return (
    <div className="w-full lg:h-[44dvh]">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 lg:overflow-x-hidden sm:overflow-y-auto md:overflow-y-auto 
        lg:overflow-y-auto sm:max-h-[calc(50vh-156px)] sm:max-w-[58dvw] 
        md:max-h-[calc(50vh-156px)] md:max-w-[54dvw] 
        lg:max-h-[calc(60vh-156px)] lg:max-w-[70dvw] 
        xl:max-h-[calc(95vh-400px)] my-2"
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
            className="w-full h-[30dvh] border border-black rounded-lg mt-2.5 p-4 text-[13.4px] text-black text-start align-text-top md:max-w-[80dvw] lg:max-w-[70dvw] xl:max-w-[60dvw] focus:outline-none focus:border-black focus:ring-0 focus-visible:ring-0"
            aria-label="Forum Details"
          />
        </div>
      </form>
    </div>
  );
};

const DiscussionPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cases] = useState<Case[]>([]);
  const [user] = useState<{ first_name: string } | null>(null);
  const [forumTitle, setForumTitle] = useState("");
  const [forumDetails, setForumDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [forumCategory, setForumCategory] = useState("General");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forumTitle || !forumDetails) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", forumTitle);
    formData.append("details", forumDetails);
    if (file) formData.append("file", file);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      const res = await fetch("https://your-backend-url.com/api/forums/", {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_TOKEN_HERE",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");
      const data = await res.json();
      console.log("Submitted:", data);

      setForumTitle("");
      setForumDetails("");
      setFile(null);
      setImage(null);
      setVideo(null);

      router.push("/forum");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleCancel = () => {
    setForumTitle("");
    setForumDetails("");
    setFile(null);
    setImage(null);
    setVideo(null);
  };

  return (
    <main className="h-[calc(100vh-4rem)] px-4 py-6 lg:px-8">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCaseCount={cases.filter((c) => c.status === "open").length}
        user={user}
      />

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
            file={file}
            image={image}
            video={video}
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
