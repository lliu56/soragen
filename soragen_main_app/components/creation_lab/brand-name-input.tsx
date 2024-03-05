// file: root/components/sub_component_directory/your_component
"use client";
import React from "react";

// Step 1: import the context you created as well as {useContext} from "react"
import { CreationLabContext } from "@/contexts/creation-lab-context";
import { useContext } from "react";

function BrandNameInput() {
  // Step 2: Insdie your FC, call the useContext() with your context
  const context = useContext(CreationLabContext);

  // Step 3: null check to make TypeScript happy
  if (!context) {
    throw new Error("ImgVidInput must be used within a CreationLabProvider");
  }

  // Step 4: extract the state variables and functions you need from the context
  const { brandName, setBrandName } = context;

  const handleChange = (e: any) => {
    e.preventDefault();
    setBrandName(e.target.value);
  };

  //TODO: Functionality for ChatGPT API call

  return (
    <div className="flex flex-col w">
      <h2 className="py-2 my-2 font-mono">Brand name</h2>
      <div className="flex justify-center items-start flex-col pb-4 mb-4">
        <textarea
          value={brandName}
          onChange={handleChange}
          placeholder=""
          className="w-full h-10 p-2 resize-none border-2 border-gray-300 rounded-sm overflow-hidden font-mono" // Adjusted class for textarea
          // Minimum height but will expand
        ></textarea>
      </div>
    </div>
  );
}
export default BrandNameInput;
