import  { FileWithPath } from "react-dropzone";

interface PreviewFileProps extends FileWithPath {
    preview: string;
  }

const useSoraCreation = async (
    files: PreviewFileProps[],
    brandName: string,
    selectedTags: string[],
    customPrompts: string,
) =>{

    // TODO - Sora API call
    console.log (files, brandName, selectedTags, customPrompts)
    // return the video
}

export default useSoraCreation;