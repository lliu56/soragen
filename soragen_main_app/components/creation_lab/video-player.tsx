"use client";
import React, { useEffect, useState } from "react";

function VideoPlayer() {
  const [videoList, setVideoList] = useState<{ id: string; url: string }[]>([]);

  // TODO: Write the actual fetch video logic
  const fetchVideos = async () => {
    // Placeholder for your database fetch logic
    // This could be a call to a backend API that returns a list of video references
    const videosFromDB = [
      { id: "video1", url: "https://example.com/video1.mp4" },
      { id: "video2", url: "https://example.com/video2.mp4" },
      { id: "video3", url: "https://example.com/video3.mp4" },
      { id: "video4", url: "https://example.com/video4.mp4" },
      // Add more video objects here
    ];
    setVideoList(videosFromDB);
  };

  useEffect(() => {
    fetchVideos();
  }, [videoList]);

  return (
    <div>
      <h2 className="pb-2 mb-2 font-mono ">My videos</h2>
      <div className="flex justify-center items-start flex-col pb-4 mb-4">
        {videoList.map((video) => (
          <div key={video.id} className="mb-4 w-full">
            <video src={video.url} controls style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPlayer;
