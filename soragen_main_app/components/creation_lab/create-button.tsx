import React from "react";

function CreateButton() {
  // TODO handing click functionality and Sora API call
  return (
    <div className="flex flex-row justify-center items-center ">
      <button className="my-4 bg-gray-900 text-white font-semibold font-mono py-2 px-4 rounded w-full hover:bg-gray-800 transition-all duration-200">
        Create Video
      </button>
    </div>
  );
}

export default CreateButton;
