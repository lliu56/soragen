import BrandNameInput from "@/components/creation_lab/brand-name-input";
import CreateButton from "@/components/creation_lab/create-button";
import CustomPromptBox from "@/components/creation_lab/custom-prompt-box";
import ImgVidInput from "@/components/creation_lab/img-vid-input";
import PresetTags from "@/components/creation_lab/tags";
import Title from "@/components/creation_lab/title";
import VideoPlayer from "@/components/creation_lab/video-player";
//***** Needed comopnents  */
// title
// ** left **
// img/vid input
// brand name
// preset tags
// compound tag display
// custom prompts input box
// creation button
// creation progress bar
// ** right **
// series of video player of the created

const CreationLab = () => {
  //   const {
  //     imageVideo,
  //     setImageVideo,
  //     brandName,
  //     setBrandName,
  //     tags,
  //     setTags,
  //     customPrompts,
  //     setCustomPrompts,
  //   } = useCreationLabInputs();

  // const handleCreate = () => {
  //   CreateVideo({ imageVideo, brandName, tags, customPrompts });

  //   // debug logs can delete
  //   console.log("imageVideo", imageVideo);
  //   console.log("brandName", brandName);
  //   console.log("tags", tags);
  //   console.log("customPrompts", customPrompts);
  // };

  return (
    <div className="h-lg mx-20 ">
      <Title />
      <div className="flex flex-row justify-center items-start w-full ">
        {/* left */}
        <div className="flex flex-col m-8 p-4 w-2/3 space-y-4">
          <ImgVidInput />
          <BrandNameInput />
          <PresetTags />
          <CustomPromptBox />
          {/* <CreateButton onCreate={handleCreate} /> */}
        </div>
        {/* TODO:vertical border */}

        {/* right */}
        <div className="flex flex-col m-8 p-4 w-1/3 space-y-4">
          <VideoPlayer />
        </div>
      </div>
    </div>
  );
};

export default CreationLab;
