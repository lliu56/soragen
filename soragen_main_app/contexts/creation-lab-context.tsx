// file: "root/context/creation-lab-context.tsx"
"use client"; //needed for useState
import React, { useState } from "react";
import { FileWithPath } from "react-dropzone";

interface PreviewFileProps extends FileWithPath {
  preview: string;
}
interface Video {
  id: string;
  name: string;
  signedURL: string;
}

export interface GeneratedVideoProps extends Video {
  generatedVideo: Video | null; // could be wrong
}

// Step 1: Create context props that shares state between components
// this is where you set which of the state variables and setState functions that you
// want to share between components
interface CreationLabContextProps {
  files: PreviewFileProps[]; // may need to fix
  setFiles: (value: PreviewFileProps[]) => void; // may need to fix
  brandName: string;
  setBrandName: (value: string) => void;
  tagOptions: string[];
  setTagOptions: (value: string[]) => void;
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
  customPrompts: string;
  setCustomPrompts: (value: string) => void;
  vidList: Video[];
  setVidList: (value: Video[]) => void;
  generatedVideo: GeneratedVideoProps | null; // not sure if this is correct
  setGeneratedVideo: (value: GeneratedVideoProps | null) => void;
}

// Step 2: create a provider Props and pass a child properly
interface CreationLabProviderProps {
  children: React.ReactNode;
}

// Step 3: reate the context object and pass in the context props, set it to
// undefined as a default value in this case
export const CreationLabContext = React.createContext<
  CreationLabContextProps | undefined
>(undefined);

// Step 4: create the provider component and pass in the provider props,
// you can  wrap the children in the provider component
export const CreationLabProvider: React.FC<CreationLabProviderProps> = ({
  children,
}) => {
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

  // step 5: create the state variables and setState functions that you want to
  // share between components (intead of separately in different components)
  const [files, setFiles] = useState<PreviewFileProps[]>([]);
  const [brandName, setBrandName] = useState<string>("");
  const [tagOptions, setTagOptions] = useState<string[]>(initalTagOptions);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customPrompts, setCustomPrompts] = useState<string>("");
  const [vidList, setVidList] = useState<Video[]>([]);
  const [generatedVideo, setGeneratedVideo] =
    useState<GeneratedVideoProps | null>(null); // TODO: fix this type

  // Step 6 return the provider component and pass in the context props and
  // the state variables and setState function, and wrap the children in the provider
  return (
    <CreationLabContext.Provider
      value={{
        files,
        setFiles,
        brandName,
        setBrandName,
        tagOptions,
        setTagOptions,
        selectedTags,
        setSelectedTags,
        customPrompts,
        setCustomPrompts,
        vidList,
        setVidList,
        generatedVideo,
        setGeneratedVideo,
      }}
    >
      {children}
    </CreationLabContext.Provider>
  );
};
