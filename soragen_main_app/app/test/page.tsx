// this is a page used to test functionalities or components

import VideoUpload from "@/components/creation_lab/video-upload-retreaval";
import { CreationLabProvider } from "@/contexts/creation-lab-context";

const CreationLab = () => {
  return (
    <CreationLabProvider>
      <div className="h-lg mx-20 ">
        <div className="flex flex-col justify-center items-center w-full ">
          <VideoUpload />
        </div>
      </div>
    </CreationLabProvider>
  );
};

export default CreationLab;
