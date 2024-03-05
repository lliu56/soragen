"use client";
import React, { useState, useContext } from "react";
import { CreationLabContext } from "@/contexts/creation-lab-context";
import Dropzone from "react-dropzone";

interface FileObjectProps {
  name: string;
  preview: string;
}

// TODO: need to build the display functionality
const ImgVidInput: React.FC = () => {
  const context = useContext(CreationLabContext);

  if (!context) {
    throw new Error("ImgVidInput must be used within a CreationLabProvider");
  }
  const { files, setFiles } = context;

  const handleDrop = (acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles([...files, ...mappedFiles]);
  };

  const removeFile = (fileName: string) => {
    const newFiles = files.filter(
      (file: { name: string }) => file.name !== fileName
    );
    setFiles(newFiles);
  };

  // Cleanup preview URLs to prevent memory leaks
  React.useEffect(() => {
    return () =>
      files.forEach((file: FileObjectProps) =>
        URL.revokeObjectURL(file.preview)
      );
  }, [files]);

  return (
    <div>
      <h2 className="pb-2 mb-2 font-mono">Image & video input</h2>
      <div className="flex justify-center items-left flex-col pb-4 mb-4 overflow-hidden">
        <div
          className=" border-2 border-gray-300 rounded-sm 
     "
        >
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} accept="image/*,video/*" />
                  <img
                    src="./images/img-vid-input-bg-img.png"
                    alt=""
                    className=" h-96  w-full object-cover hover:opacity-70 cursor-pointer transition-all"
                  />
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {/* preview display */}
        <aside>
          <ul>
            {files.map((file: FileObjectProps) => (
              <li
                key={file.name}
                className="flex justify-between items-center my-2"
              >
                <span className="font-mono text-sm font-style: italic">
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(file.name)}
                  className=" text-gray-500 p-1 rounded font-mono text-sm "
                >
                  {" "}
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default ImgVidInput;
