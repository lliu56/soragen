"use client";
import React from "react";
import { useState } from "react";

function BrandNameInput() {
  const [customBrandName, setCustomBrandName] = useState<string>("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setCustomBrandName(e.target.value);
  };

  //TODO: Functionality for ChatGPT API call

  return (
    <div className="flex flex-col w">
      <h2 className="py-2 my-2 font-mono">Brand name</h2>
      <div className="flex justify-center items-start flex-col pb-4 mb-4">
        <textarea
          value={customBrandName}
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
