"use client";
import { CreationLabContext } from "@/contexts/creation-lab-context";
import React from "react";
import { useContext } from "react";

function CustomPromptBox() {
  const context = useContext(CreationLabContext);

  if (!context) {
    throw new Error("ImgVidInput must be used within a CreationLabProvider");
  }
  const { customPrompts, setCustomPrompts } = context;

  const handleChange = (e: any) => {
    e.preventDefault();
    setCustomPrompts(e.target.value);
  };

  return (
    <div className="flex flex-col w">
      <h2 className="py-2 my-2 font-mono">Custom prompt</h2>
      <div className="flex justify-center items-start flex-col  pb-4 mb-4">
        <textarea
          value={customPrompts}
          onChange={handleChange}
          placeholder="Make a UGC style product advertisement video around 50 seconds long, I want my brand name clearly displayed multiple times on the screen"
          className="w-full h-32 p-2 resize-none border-2 border-gray-300 rounded-sm overflow-auto font-mono" // Adjusted class for textarea
          style={{ minHeight: "100px" }} // Minimum height but will expand
        ></textarea>
      </div>
    </div>
  );
}

export default CustomPromptBox;
