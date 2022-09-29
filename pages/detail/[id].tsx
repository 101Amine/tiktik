import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  FormEvent,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import Comments from "../../components/Comments";
import LikeButton from "../../components/LikeButton";
import useAuthStore from "../../store/authStore";
import { Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  postDetails: Video;
}

const Detail: React.FC<IProps> = ({ postDetails }) => {
  const [post, setpost] = useState(postDetails);
  const [playing, setplaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const { userProfile }: any = useAuthStore();

  const [comment, setComment] = useState("");
  const [isPostingComment, setisPostingComment] = useState(false);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setplaying(false);
    } else {
      videoRef?.current?.play();
      setplaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleDislike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setpost({ ...post, likes: data.likes });
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setpost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e: FormEvent) => {
    e.preventDefault();

    if (userProfile && comment) {
      setisPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setpost({ ...post, comments: data.comments });
      setComment("");
      setisPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black bg-center">
        <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>

        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              loop
              ref={videoRef}
              onClick={onVideoClick}
              className="h-full cursor-pointer "
              src={post.video.asset.url}
            ></video>
          </div>

          <div className="absolute top-[45%] left-[45%]">
            {!playing && (
              <button onClick={onVideoClick}>
                {" "}
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 right-5  cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 font-semibold rounded">
            <div className=" ml-4 md:w-20 md:h-20 w-16 h-16 cursor-pointer">
              {" "}
              <Link href={""}>
                <React.Fragment>
                  <Image
                    width={62}
                    height={62}
                    src={post.postedBy.image}
                    alt="profile__photo"
                    layout="responsive"
                  />
                </React.Fragment>
              </Link>
            </div>

            <div>
              <Link href={"/"}>
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 cursor-pointer items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>

                  <p className="capitalize text-sm font-medium text-gray-500 hidden  md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="px-10 mt-4 text-lg text-gray-600"> {post.caption} </p>

          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleDislike(false)}
              />
            )}
          </div>

          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
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
  const { data } = await axios.get(`${BASE_URL}/api/detail/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
