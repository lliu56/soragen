// this is a test component for the video upload logic
// NOTES****: Sora May be hosting the videos already, look into that
// Can be MORE EFFICIENT if once we get the files we just show a preview hosted on Sora and display to the user.
// They can pick if they wanna save or discard that one. If they decide to save then we can save it in the storage.
// TODO: DOCUMENT THIS PAGE *******

// file: root/components/sub_component_dir/vide-upload.tsx
"use client";
// Step 1: import the following
import React, { useContext } from "react";
import Dropzone, { FileWithPath } from "react-dropzone";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { CreationLabContext } from "@/contexts/creation-lab-context";

// interface PreviewFileProps extends FileWithPath {
//   preview: string;
// }

// Step 2: Create PreviewFileProps that extends File with Path
interface PreviewFileProps extends FileWithPath {
  preview: string;
}

// Step 3: Create a User Prop that takes their id
interface User {
  id: string;
}

// Step 4: Create a Video Prop that takes the video id, name, and signedURL
interface Video {
  id: string;
  name: string;
  signedURL: string;
}

const VideoUpload: React.FC = () => {
  // const CNDUrl = process.env.NEXT_PUBLIC_CDNURL;

  // step 5: set up the state variables
  const [files, setFiles] = useState<PreviewFileProps[]>([]); // for preview when files are dropped
  const [userId, setUserId] = useState<string>(""); // for login and file creation for specific user

  // step 6: use the contexual data to maintain the the state of the list of videos users have
  // NOTE: need to be setup in the your_context.tsx file
  const context = useContext(CreationLabContext);
  if (!context) {
    throw new Error("ImgVidInput must be used within a CreationLabProvider");
  }
  const { vidList, setVidList } = context;

  // Step 7: Created the signin function/ check signin fucntion
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

  // Step 8: Call the Signin function, and then immediately setting the userId to the user.id
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

  // step 9: Ceate UploadVideo Function
  // ************************* upload video function **********************************
  const UploadVideos = async (filesToUpload: File[]) => {
    // a. check for userId
    if (!userId) {
      console.log("User not logged in, cannot upload files.");
      return;
    }

    // b. Map over the files to upload and upload them to supabase
    filesToUpload.forEach((file) => {
      // can just get the files from sora and upload to supase and upload
      // *** upload to supabase ***
      // document syntax
      supabase.storage
        .from("generated_videos")
        // for this, insted of uuid, can use userId to create a folder in the future follow this link https://www.youtube.com/watch?v=HvOvdD2nX1k
        .upload(
          userId + "/" + uuidv4() + ".mp4", // c. creating a folder for each userId and a uuid -> e.g. "userId/uuid.mp4"
          file
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
  // ************************* OLD fetch videos from supabase ***********************************
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

  // ************************* NEW fetch videos from supabase ***********************************

  // Step 10: Create a function to fetch videos from supabase
  const fetchVideos = async () => {
    const { data, error } = await supabase.storage
      .from("generated_videos")
      // a. fetching the list of videos a user have by their userId
      .list(userId + "/", {
        // b. apply filters or sort if neccessary
        limit: 5,
        offset: 0,
        sortBy: {
          column: "created_at",
          order: "asc",
        },
      });

    // c. handle error for typescript
    if (error) {
      console.log("Fetch video failed: ", error);
      return;
    }

    // d. map over the fetched videos (data) amd create a signed url for each video
    const videosWithSignedUrls = await Promise.all(
      data.map(async (video) => {
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from("generated_videos")
            // e. create signed URL for each video
            .createSignedUrl(userId + "/" + video.name, 60 * 60 * 24 * 365); // 1 year validity

        if (signedUrlError) {
          console.log("Fetch signed URL failed: ", signedUrlError);
          return null;
        }
        console.log(" **** Signed URL: ", signedUrlData.signedUrl);
        // f. return video props with id, name and signedURL
        return {
          id: video.id,
          name: video.name,
          signedURL: signedUrlData.signedUrl,
        };
      })
    );

    // e. Filter out any null values and assert the array type to Video[]
    const validVideos: Video[] = videosWithSignedUrls.filter(
      (video): video is Video => video !== null
    );

    // f. Set the VidList state with the valid videos
    setVidList(validVideos);
  };

  // Step 11: calle fetchVideos function when the userId changes
  useEffect(() => {
    if (userId) {
      fetchVideos();
    }
  }, [userId]); // on userID change
  // overall handler of file drop -> used inside of DropZone

  // Step 12: Create handleDrop function from react-dropzone  (can look at website)
  const handleDrop = (acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file), // preview file name
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
          {/* Step 13: DropZone tag from react-dropzone, pass handleDrop function */}
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

      {/* Step 14: Display the videos */}
      <div className="flex justify-center items-start flex-col pb-4 mb-4">
        {vidList.map((video) => (
          <div key={video.id} className="mb-4 w-full">
            {/* a. display video name */}
            <p className="text-sm font-mono underline">{video.name}</p>
            <video
              // b. source the videom from the signed URL
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
