"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import Header from "@/components/Profile/Header";
import BaseFormInput from "@/components/Global/BaseFormInput";
import Button from "@/components/Global/BaseButton";
import { Case } from "@/interface/CaseTypes";
import Textarea from "@/components/Global/BaseTextArea";
import { AiOutlineUpload } from "react-icons/ai";
import { IoVideocamOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";

const DiscussionForm: React.FC<{
  forumTitle: string;
  setForumTitle: React.Dispatch<React.SetStateAction<string>>;
  forumDetails: string;
  setForumDetails: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setVideo: React.Dispatch<React.SetStateAction<File | null>>;
  file: File | null;
  image: File | null;
  video: File | null;
}> = ({
  forumTitle,
  setForumTitle,
  forumDetails,
  setForumDetails,
  handleSubmit,
  setFile,
  setImage,
  setVideo,
  file,
  image,
  video,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) setFile(files[0]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) setImage(files[0]);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) setVideo(files[0]);
  };

  return (
    <div className="w-full lg:h-[44dvh]">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 overflow-x-hidden sm:overflow-y-auto md:overflow-y-auto lg:overflow-y-auto sm:max-h-[calc(50vh-156px)] sm:max-w-[58dvw] md:max-h-[calc(50vh-156px)] md:max-w-[54dvw] lg:max-h-[calc(60vh-156px)] lg:max-w-[70dvw] xl:max-h-[calc(76vh-156px)] pr-2"
      >
        <BaseFormInput
          label=""
          name="forumTitle"
          type="text"
          value={forumTitle}
          onChange={(e) => setForumTitle(e.target.value)}
          placeholder="Enter Forum Title"
          className="w-full h-12 border border-black rounded-lg mt-2 p-4 text-[14px] text-black-200 text-start align-text-top md:max-w-[80dvw] lg:max-w-[70dvw] xl:max-w-[60dvw]"
        />

        <div className="flex flex-col space-y-1 mt-4 mb-4 relative">
          <Textarea
            name="forumDetails"
            value={forumDetails}
            onChange={(e) => setForumDetails(e.target.value)}
            placeholder="Enter Forum Details"
            className="w-full h-[30dvh] border border-gray rounded-lg mt-2.5 p-4 text-[13.5px] text-black text-start align-text-top md:max-w-[80dvw] lg:max-w-[70dvw] xl:max-w-[60dvw] focus:outline-none focus:ring-0 focus:border-gray-300"
            aria-label="Forum Details"
          />

          <div className="absolute bottom-16 right-2 w-[80%] h-[18vh] flex flex-col items-end space-y-2 overflow-y-auto">
            {file && (
              <div className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded border">
                📄 {file.name}
              </div>
            )}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="w-16 h-16 object-cover border rounded"
              />
            )}
            {video && (
              <video
                src={URL.createObjectURL(video)}
                controls
                className="w-28 h-20 border rounded"
              />
            )}
          </div>

          <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-white p-1 rounded">
            <div className="relative">
              <button
                type="button"
                className="p-1 text-gray-600 hover:text-blue-600 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <AiOutlineUpload size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                className="p-1 text-gray-600 hover:text-blue-600 cursor-pointer"
                onClick={() => imageInputRef.current?.click()}
              >
                <CiImageOn size={20} />
              </button>
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                className="p-1 text-gray-600 hover:text-blue-600 cursor-pointer"
                onClick={() => videoInputRef.current?.click()}
              >
                <IoVideocamOutline size={20} />
              </button>
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoUpload}
                className="hidden"
                accept="video/*"
              />
            </div>
          </div>
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
            handleSubmit={handleSubmit}
            setFile={setFile}
            setImage={setImage}
            setVideo={setVideo}
            file={file}
            image={image}
            video={video}
          />

          <div className="flex justify-center mt-6 mx-auto space-x-40 overflow-y-hidden max-h-[calc(70vh-156px)] lg:mt-4">
            <Button color="red" textColor="white" type="button" width="200px" onClick={handleCancel}>
              Cancel
            </Button>
            <Button color="blue" textColor="white" type="submit" width="200px" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DiscussionPage;
