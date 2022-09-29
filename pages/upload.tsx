import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { BASE_URL } from "../utils";

const upload = () => {
  const [isLoading, setLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [WrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [topic, setTopic] = useState(topics[0].name);
  const [savingPost, setsavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setLoading(true);

      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && topic) {
      setsavingPost(true);

      const doc = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic,
      };

      await axios.post(`${BASE_URL}/api/post`, doc);

      router.push("/");
    }
  };

  return (
    <div className="w-full flex h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap items-center p-14 pt-6 w-[60%] justify-between">
        <div>
          <p className="text-2xl font-bold"> Upload Video </p>
          <p className="text-md text-gray-400 mt-2">
            {" "}
            Post a video to your account{" "}
          </p>

          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] max-w-[250px] bg-black"
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

            {WrongFileType && (
              <p className="text-center font-semibold text-[16px] text-red-400 mt-4 w-[250px]">
                {" "}
                Please select a video type
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10 ">
          <label className="text-md font-medium"> Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-md border-2 lg:p-2 p-1 border-gray-200"
          ></input>

          <label className="text-md font-medium"> Choose a category</label>
          <select
            className="outline-none bg-white border-2 border-gray capitalize lg:p-3 p-2 rounded cursor-pointer"
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                value={topic.name}
                className="outline-none capitalize text-md p-2 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>

          <div className="flex gap-6 mt-10">
            <button
              type="button"
              onClick={() => {}}
              className="border-2 text-md p-2 rounded outline-none w-28 lg:w-44 "
            >
              {" "}
              Discard{" "}
            </button>

            <button
              type="button"
              onClick={handlePost}
              className="bg-[#F51997] text-white border-2 text-md p-2 rounded outline-none w-28 lg:w-44 "
            >
              {savingPost ? (
                <LoadingSpinner
                  height={"25px"}
                  width={"25px"}
                  borderSize={"5px"}
                  margin={"auto"}
                />
              ) : (
                <>Post</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default upload;
