"use client";
import React from "react";

function PresetTags() {
  const initalTagOptions = [
    "cinematic",
    "modern & sleek",
    "dark",
    "vitage",
    "historical drama",
    "bold",
    "aesthethic",
    "minimalist",
  ];

  const [tagOptions, setTagOptions] =
    React.useState<string[]>(initalTagOptions);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const handleClick = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);

    setTagOptions(tagOptions.filter((t) => t !== tag));
  };
  // TODO: need to add the chatGPT API call functionality
  return (
    <div>
      {/* inital tag options */}
      <h2 className="pb-2 mb-2 font-mono">Preset tags </h2>
      <div className="flex justify-center items-center flex-col max-w-md pb-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag, index) => (
            <span
              onClick={() => handleClick(tag)}
              key={index}
              className=" bg-gray-200 text-gray-800 text-sm font-mono font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 hover:scale-105 transition-all duration-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* selected tags */}

      <h2 className="pb-2 mb-2 font-mono">Selected tags </h2>
      <div className="flex justify-center items-start border-2 border-gray-300 rounded-sm flex-col max-w-md p-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag, index) => (
            <span
              //   onClick={() => handleClick(tag)}
              key={index}
              className=" bg-gray-200 text-gray-800 text-sm font-mono font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 hover:scale-105 transition-all duration-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PresetTags;
