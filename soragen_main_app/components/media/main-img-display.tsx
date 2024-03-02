import ModalVideo from "./modal-video";
import VideoThumb from "@/public/images/hero-image.png";

import React from "react";

const MainImgDisplay = () => {
  return (
    <>
      {/* Hero image */}{" "}
      <ModalVideo
        thumb={VideoThumb}
        thumbWidth={768}
        thumbHeight={432}
        thumbAlt="Modal video thumbnail"
        video="/videos/video.mp4"
        videoWidth={1920}
        videoHeight={1080}
      />
    </>
  );
};

export default MainImgDisplay;
