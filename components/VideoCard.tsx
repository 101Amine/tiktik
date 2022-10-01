import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "../types";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);

  const [playing, setPlaying] = useState(false);

  const [isVideoMuted, setisVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10 cursor-pointer">
            {" "}
            <Link href={`/profile/${post.userId}`}>
              <div>
                <Image
                  width={62}
                  height={62}
                  src={post.postedBy.image}
                  alt="profile__photo"
                  layout="responsive"
                />
              </div>
            </Link>
          </div>

          <div>
            <Link href={`/profile/${post.userId}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 cursor-pointer items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>

                <p className="capitalize font-medium text-sm text-gray-500 hidden  md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg-ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className="rounded-2xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              loop
              ref={videoRef}
              src={post.video.asset.url}
            ></video>
          </Link>

          {true && (
            <div className="absolute w-[100px] p-3 md:w-[50px] bottom-6 flex cursor-pointer left-8 md:left-14 lg:left-0 gap-10 lg:justify-between">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}

              {isVideoMuted ? (
                <button onClick={() => setisVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setisVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
