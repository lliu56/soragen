
// TODO: this is an anti pattern, need to fix
"use client";

import { useState} from "react";

interface UseCreationLabInputsReturnType {
    imageVideo: File[]; 
    setImageVideo: (files: File[]) => void; 
    brandName: string;
    setBrandName: (name: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    customPrompts: string;
    setCustomPrompts: (prompts: string) => void;
}

export default function useCreationLabInputs (): UseCreationLabInputsReturnType {
    const [imageVideo, setImageVideo] = useState<File[]>([]);
    const [brandName, setBrandName] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [customPrompts, setCustomPrompts] = useState<string>("");
    return {
        imageVideo,
        setImageVideo,
        brandName,
        setBrandName,
        tags,
        setTags,
        customPrompts,
        setCustomPrompts,
    };
};