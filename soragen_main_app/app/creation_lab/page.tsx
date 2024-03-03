import ImgVidInput from "@/components/creation_lab/img-vid-input";
import PresetTags from "@/components/creation_lab/preset-tags";
import Title from "@/components/creation_lab/title";
import React from "react";

const CreationLab = () => {
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

  return (
    <div>
      <Title />
      <div className="flex justify-center">
        <div className="flex justify-center flex-col items-center max-w-md ">
          <ImgVidInput />
          <PresetTags />
        </div>
      </div>
    </div>
  );
};

export default CreationLab;
