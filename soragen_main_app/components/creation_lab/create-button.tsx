"use client";
import { CreationLabContext } from "@/contexts/creation-lab-context";
import React, { useContext } from "react";
import useSoraCreation from "@/hooks/useSoraCreation";
import { GeneratedVideoProps } from "@/contexts/creation-lab-context";

const CreateButton = () => {
  const context = useContext(CreationLabContext);

  if (!context) {
    throw new Error("CreateButton must be used within a CreationLabProvider");
  }

  const {
    files,
    brandName,
    selectedTags,
    customPrompts,
    generatedVideo,
    setGeneratedVideo,
  } = context;

  // TODO: Need to fix
  const handleClick = async () => {
    // const res: GeneratedVideoProps | null = await useSoraCreation(
    //   files,
    //   brandName,
    //   selectedTags,
    //   customPrompts
    // );
    // setGeneratedVideo(res);
    // generated video can then be uploaded
  };

  return (
    <div className="flex flex-row justify-center items-center ">
      <button
        onClick={handleClick}
        className="my-4 bg-gray-900 text-white font-semibold font-mono py-2 px-4 rounded w-full hover:bg-gray-800 transition-all duration-200"
      >
        Create Video
      </button>
    </div>
  );
};

export default CreateButton;
