// root/component/sub_componenet_dir/video-player.tsx

// Step 1: Import these
"use client";
import React, { useEffect, useState, useContext } from "react";
import DeletionConfirmation from "../modals/deletion-confirmation";
import supabase from "@/utils/supabaseClient";
import { CreationLabContext } from "@/contexts/creation-lab-context";

// Step 2: define user and video props
interface User {
  id: string;
}

interface Video {
  id: string;
  name: string;
  signedURL: string;
}

function VideoPlayer() {
  // Step 2: Define necessary State Variables
  const [showModal, setShowModal] = useState<boolean>(false);
  const [videoForDeletion, setVideoForDeletion] = useState<string | null>(null); // need
  const [userId, setUserId] = useState<string>("");

  // Step 3: infer global state variables from global context
  const context = useContext(CreationLabContext);
  if (!context) {
    throw new Error("ImgVidInput must be used within a CreationLabProvider");
  }
  const { vidList, setVidList } = context;

  // Step 4: Sign in
  //*** sign in to supabse for testing -> need to delete */ -> document this
  const signin = (): Promise<User | null> => {
    // Return a new Promise from the signin function
    return new Promise((resolve, reject) => {
      supabase.auth
        .signInWithPassword({
          email: "test_user_1@123.com",
          password: "12345678",
        })
        .then((res) => {
          const { data, error } = res;
          if (error) {
            console.error("login error:", error);
            resolve(null); // Resolve null in case of an error
          } else {
            console.log("logged in as:", data);
            resolve(data.user); // Resolve with the user object upon success
          }
        })
        .catch((error) => {
          console.error("login error:", error);
          resolve(null); // Ensure to resolve null in case of any other errors
        });
    });
  };

  // Step 5: call sigin and get set UserId
  useEffect(() => {
    // Immediately invoked async function inside useEffect
    (async () => {
      const user = await signin(); // Wait for signin to complete
      if (user) {
        // Now user can be null or a user object, but not void
        setUserId(user.id);
        console.log("***USER ID: ", user.id);
      } else {
        console.log("No logged in user");
      }
    })();
  }, []);

  // Step 6: Main fetch function from supabase
  const fetchVideos = async () => {
    const { data, error } = await supabase.storage
      .from("generated_videos")
      .list(userId + "/", {
        // a. fetch list of videos that the user has
        limit: 5,
        offset: 0,
        sortBy: {
          column: "created_at",
          order: "asc",
        },
      });

    // b. handle error
    if (error) {
      console.log("Fetch video failed: ", error);
      return;
    }
    // c. get signed url of each video by mapping the videos in the retreaved video list (data)
    const videosWithSignedUrls = await Promise.all(
      data.map(async (video) => {
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from("generated_videos")
            .createSignedUrl(userId + "/" + video.name, 60 * 60 * 24 * 365); // 1 year validity

        if (signedUrlError) {
          console.log("Fetch signed URL failed: ", signedUrlError);
          return null;
        }

        // d. return the Video objects and set the id, name and signedUrl props
        return {
          id: video.id,
          name: video.name,
          signedURL: signedUrlData.signedUrl,
        };
      })
    );

    // Filter out any null values and assert the array type to Video[]
    const validVideos: Video[] = videosWithSignedUrls.filter(
      (video): video is Video => video !== null
    );

    // e. set global vidList state variable to validVideos
    setVidList(validVideos);
  };

  // Step 8: use useEffect to call fetchVideos whenever the userId change is detected
  useEffect(() => {
    if (userId) {
      fetchVideos();
    }
  }, [userId]);
  // overall handler of file drop -> used inside of DropZone
  // setFiles([...files, ...mappedFiles]);
  // UploadVideos(acceptedFiles); // Pass the acceptedFiles array to the UploadVideo function

  // ********TODO: NEED TO FIX ***********
  // const deleteVideo = (id: string) => {
  //   setVideoList(videoList.filter((video) => video.id !== id));
  //   setVideoForDeletion(null);
  // };
  // // overall function for handling deletion
  // const handleDeletionClick = (id: string) => {
  //   setVideoForDeletion(id);
  //   setShowModal(true);
  // };

  // ******** TODO: NEED TO FIX **********
  const handlConfirmDeletion = () => {
    // if (videoForDeletion) {
    //   deleteVideo(videoForDeletion);
    fetchVideos();
    // }
  };

  return (
    <div>
      {/* Step 9: Set up the Component to display the videos */}
      <h2 className="pb-2 mb-2 font-mono ">My videos</h2>
      <div className="flex justify-center items-start flex-col pb-4 mb-4">
        {vidList.map((video) => (
          <div key={video.id} className="mb-4 w-full">
            <p className="text-sm font-mono underline">{video.name}</p>
            <video
              src={video.signedURL} // a. Use the signedURL for the video source
              controls
              style={{ width: "100%" }}
            />
            {/* b. download functionality */}
            <div className="flex justify-left items-start mt-2 gap-2 font-mono text-sm hover: cursor-pointer ">
              <a
                href={video.signedURL} // Use the signedURL for the download link
                download={video.name}
                className="hover:underline transition-all duration-50 mx-1 hover:text-blue-500"
              >
                Download
              </a>{" "}
              {/* c. deletion functionality */}
              <span
                // onClick={() => handleDeletionClick(video.id)}
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
