"use client";
import React, { useEffect, useState } from "react";
import DeletionConfirmation from "../modals/deletion-confirmation";

function VideoPlayer() {
  const [videoList, setVideoList] = useState<{ id: string; url: string }[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [videoForDeletion, setVideoForDeletion] = useState<string | null>(null);

  // *** TODO: Write the actual fetch video logic -> fetch and delete from DB ***
  const fetchVideos = async () => {
    // This will just go to the link and  won't download the video
    // Placeholder for your database fetch logic
    // This could be a call to a backend API that returns a list of video references
    const videosFromDB = [
      { id: "video1", url: "https://www.youtube.com/watch?v=GGxUH6EXF9I" },
      { id: "video2", url: "https://www.youtube.com/watch?v=GGxUH6EXF9I4" },
      { id: "video3", url: "hhttps://www.youtube.com/watch?v=GGxUH6EXF9I" },
      // Add more video objects here
    ];
    setVideoList(videosFromDB);
  };

  useEffect(() => {
    fetchVideos();
  }, []); //TODO: need to look into if I should add videoList in dependency array or not because I want it to fetch upon create but not delete

  // TODO: Write the actual delete video logic -> deletes it from DB
  const deleteVideo = (id: string) => {
    setVideoList(videoList.filter((video) => video.id !== id));
    setVideoForDeletion(null);
  };
  // overall function for handling deletion
  const handleDeletionClick = (id: string) => {
    setVideoForDeletion(id);
    setShowModal(true);
  };

  const handlConfirmDeletion = () => {
    if (videoForDeletion) {
      deleteVideo(videoForDeletion);
    }
  };

  return (
    <div>
      <h2 className="pb-2 mb-2 font-mono ">My videos</h2>
      <div className="flex justify-center items-start flex-col pb-4 mb-4">
        {videoList.map((video) => (
          <div key={video.id} className="mb-4 w-full">
            <p className="text-sm font-mono underline">{video.id}</p>
            <video src={video.url} controls style={{ width: "100%" }} />
            <div className="flex justify-left items-start mt-2 gap-2 font-mono text-sm hover: cursor-pointer ">
              <a
                href={video.url}
                download
                className="hover:underline transition-all duration-50 mx-1 hover:text-blue-500"
              >
                Download
              </a>{" "}
              <span
                onClick={() => handleDeletionClick(video.id)}
                className="hover:underline transition-all duration-50 hover:text-red-500 mx-1"
              >
                Delete
              </span>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <DeletionConfirmation
          showModal={showModal}
          setShowModal={setShowModal}
          handleConfirmDeletion={handlConfirmDeletion}
        />
      )}
    </div>
  );
}
export default VideoPlayer;
