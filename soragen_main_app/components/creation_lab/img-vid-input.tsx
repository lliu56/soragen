"use client";
import React from "react";
import Dropzone, { FileWithPath } from "react-dropzone";
import { useState } from "react";

interface PreviewFileProps extends FileWithPath {
  preview: string;
}

// TODO: need to build the display functionality
const ImgVidInput: React.FC = () => {
  const [files, setFiles] = useState<PreviewFileProps[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles([...files, ...mappedFiles]);
  };

  const removeFile = (fileName: string) => {
    const newFiles = files.filter((file) => file.name !== fileName);
    setFiles(newFiles);
  };

  // Cleanup preview URLs to prevent memory leaks
  React.useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
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
            {files.map((file) => (
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
