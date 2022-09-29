import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: (like: boolean) => void;
  handleDislike: (like: boolean) => void;
  likes: any[];
}

const LikeButton: React.FC<IProps> = ({ handleLike, handleDislike, likes }) => {
  const [alreadyLiked, setalreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile?._id
  );
  useEffect(() => {
    console.log("Userprofile id :", userProfile._id);
    console.log("filter likes :", filterLikes);

    if (filterLikes?.length > 0) {
      setalreadyLiked(true);
    } else {
      setalreadyLiked(false);
    }
  }, [likes, filterLikes]);

  return (
    <div className={` flex gap-6`}>
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997] "
            onClick={() => {
              handleDislike(false);
            }}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4 "
            onClick={() => {
              handleLike(true);
            }}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
