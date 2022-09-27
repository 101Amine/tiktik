import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";

const upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setvideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [WrongFileType, setWrongFileType] = useState(false);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];

    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    console.log(selectedFile);

    if (fileTypes.includes(selectedFile)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setvideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };
  return (
    <div className="w-full flex h-full">
      <div className="bg-white rounded-lg">
        <div>
          <div>
            <p className="text-2xl font-bold"> Upload Video </p>
            <p className="text-md text-gray-400 mt-2">
              {" "}
              Post a video to your account{" "}
            </p>

            <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
              {isLoading ? (
                <p> isLoading </p>
              ) : (
                <div>
                  {videoAsset ? (
                    <div>
                      ttt
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className="rounded-xl h-[450px] mt-16 bg-black"
                      ></video>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center justify-center">
                          <p>
                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                          </p>

                          <p className="text-xl font-semibold mt-1">
                            Upload video
                          </p>
                        </div>

                        <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                          {" "}
                          MP4 or WebM or ogg
                          <br />
                          720x1280 or higher <br />
                          Up to 10 minutes <br />
                          Less than 2GB
                        </p>

                        <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                          {" "}
                          Select file
                        </p>
                      </div>

                      <input
                        name="upload-video"
                        onChange={uploadVideo}
                        type="file"
                        className="w-0 h-0 "
                      ></input>
                    </label>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default upload;
