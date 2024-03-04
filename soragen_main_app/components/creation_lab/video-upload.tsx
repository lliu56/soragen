// this is a test component for the video upload logic
// NOTES****: Sora May be hosting the videos already, look into that
// Can be MORE EFFICIENT if once we get the files we just show a preview hosted on Sora and display to the user.
// They can pick if they wanna save or discard that one. If they decide to save then we can save it in the storage.
// TODO: DOCUMENT THIS PAGE *******

"use client";
import React from "react";
import Dropzone, { FileWithPath } from "react-dropzone";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import { v4 as uuidv4 } from "uuid";

// interface PreviewFileProps extends FileWithPath {
//   preview: string;
// }

interface PreviewFileProps extends FileWithPath {
  preview: string;
}

interface User {
  id: string;
}

interface Video {
  id: string;
  name: string;
  signedURL: string;
}

const VideoUpload: React.FC = () => {
  const CNDUrl = process.env.NEXT_PUBLIC_CDNURL;

  // these 2 are dups, looks to remove one of them
  const [files, setFiles] = useState<PreviewFileProps[]>([]);
  const [vidList, setVidList] = useState<Video[]>([]);
  const [userId, setUserId] = useState<string>("");

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

  // ** not needed **
  // const getUser = async () => {
  //   await signin();
  //   try {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     if (user !== null) {
  //       setUserId(user.id);
  //     } else {
  //       setUserId("");
  //       console.log("No logged in user");
  //     }

  //     console.log("***USER ID: ", userId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // do i need this?
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

  // ************************* upload video function **********************************
  const UploadVideos = async (filesToUpload: File[]) => {
    if (!userId) {
      console.log("User not logged in, cannot upload files.");
      return;
    }

    filesToUpload.forEach((file) => {
      // can just get the files from sora and upload to supase and upload
      // *** upload to supabase ***
      // document syntax
      supabase.storage
        .from("generated_videos")
        // for this, insted of uuid, can use userId to create a folder in the future follow this link https://www.youtube.com/watch?v=HvOvdD2nX1k
        .upload(
          userId + "/" + uuidv4() + ".mp4",
          file
          // Include the Authorization header
        )
        .then((response) => {
          const { data, error } = response;
          if (error) {
            console.log(error);
          }
          if (data) {
            console.log(data);
          }
        });
    });
  };

  // ************************* fetch videos from supabase ***********************************
  // const fetchVideos = async () => {
  //   supabase.storage
  //     .from("generated_videos")
  //     .list(userId + "/", {
  //       limit: 5,
  //       offset: 0,
  //       sortBy: {
  //         column: "created_at",
  //         order: "asc", // correct??
  //       },
  //     })
  //     .then((res) => {
  //       const { data, error } = res;
  //       if (error) {
  //         console.log("fetch video failed: ", error);
  //       } else {
  //         // setVidList(data);
  //         // console.log("Video List:", data);
  //         data.map(async (video) => {
  //           await supabase.storage
  //             .from("generated_videos")
  //             .createSignedUrl(userId + "/" + video.name, 60 * 60 * 24 * 365)
  //             .then((response) => {
  //               const { data: signedUrl, error } = response;
  //               if (error) {
  //                 console.log("fetch signed URL failed: ", error);
  //               } else {
  //                 setVidList ({
  //                   id: video.id,
  //                   name: video.name,
  //                   url: signedUrl.signedUrl;
  //                 })
  //               }
  //             });
  //         });
  //       }
  //     });
  // };
  const fetchVideos = async () => {
    const { data, error } = await supabase.storage
      .from("generated_videos")
      .list(userId + "/", {
        limit: 5,
        offset: 0,
        sortBy: {
          column: "created_at",
          order: "asc",
        },
      });

    if (error) {
      console.log("Fetch video failed: ", error);
      return;
    }

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

    setVidList(validVideos);
  };

  useEffect(() => {
    if (userId) {
      fetchVideos();
    }
  }, [userId]);
  // overall handler of file drop -> used inside of DropZone
  const handleDrop = (acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles([...files, ...mappedFiles]);
    UploadVideos(acceptedFiles); // Pass the acceptedFiles array to the UploadVideo function
  };

  // Cleanup preview URLs to prevent memory leaks
  React.useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  // upload files

  return (
    <div>
      <h2 className="pb-2 mb-2 font-mono">Image & video input</h2>
      <div className="flex justify-center items-left flex-col pb-4 mb-4 overflow-hidden">
        <div
          className=" border-2 border-gray-300 rounded-sm 
       "
        >
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} accept="image/*,video/*" />
                  <img
                    src="./images/img-vid-input-bg-img.png"
                    alt=""
                    className=" h-96  w-full object-cover hover:opacity-70 cursor-pointer transition-all"
                  />
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {/* preview display */}
        <aside>
          <ul>
            {files.map((file) => (
              <li
                key={file.name}
                className="flex justify-between items-center my-2"
              >
                <span className="font-mono text-sm font-style: italic">
                  {file.name}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="flex justify-center items-start flex-col pb-4 mb-4">
        {vidList.map((video) => (
          <div key={video.id} className="mb-4 w-full">
            <p className="text-sm font-mono underline">{video.name}</p>
            <video
              src={video.signedURL} // Use the signedURL for the video source
              controls
              style={{ width: "100%" }}
            />
            <div className="flex justify-left items-start mt-2 gap-2 font-mono text-sm hover: cursor-pointer ">
              <a
                href={video.signedURL} // Use the signedURL for the download link
                download={video.name}
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
    </div>
  );
};

export default VideoUpload;
