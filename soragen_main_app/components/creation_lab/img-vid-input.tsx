"use client";
import React from "react";
import Dropzone from "react-dropzone";

// TODO: need to build the display functionality
function ImgVidInput() {
  return (
    <div>
      <h2 className="pb-2 mb-2 font-mono">Image & Video Input</h2>
      <div className="flex justify-center items-left flex-col pb-4 mb-4 overflow-hidden">
        <div
          className=" border-2 border-gray-300 rounded-sm 
     "
        >
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
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
      </div>
    </div>
  );
}

export default ImgVidInput;
