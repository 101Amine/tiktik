import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";

import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLiked: Video[];
  };
}

const Profile: React.FC<IProps> = ({ data }) => {
  const { user, userVideos, userLiked } = data;

  const [showUserVideos, setshowUserVideos] = useState(true);
  const [videosList, setvideosList] = useState<Video[]>([]);

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setvideosList(userVideos);
    } else {
      setvideosList(userLiked);
    }
  }, [showUserVideos, userVideos, userLiked]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={data.user.image}
            alt="avatar"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="flex items-center text-2xl tracking-wider gap-1 font-bold text-primary capitalize">
            {" "}
            {data.user.userName}
            <GoVerified className="text-blue-400 ml-2" />
          </p>

          <p className="text-black mt-2 text-sm lower"> {data.user.userName}</p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            onClick={() => setshowUserVideos(true)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
          >
            Videos
          </p>

          <p
            onClick={() => setshowUserVideos(false)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
          >
            Liked
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((video: Video, index: number) => (
              <VideoCard post={video} key={index} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "liked"} videos yet.`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: data },
  };
};

export default Profile;
