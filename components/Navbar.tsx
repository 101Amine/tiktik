import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setsearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full p-5 flex justify-between border-b-2 items-center border-grap-200 py-2">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] ">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktik"
            layout="responsive"
          />
        </div>
      </Link>

      {/** Implement this **/}
      {/* <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            className="md:text-md border-gray-100 focus:outline-none focus:border-gray-300
            bg-primary p-3 font-medium
            w-[300px] md:w-[350px] rounded-[10px] md:top-0 h-[40px]
            "
            onChange={(e) => {
              setsearchValue(e.target.value);
            }}
            value={searchValue}
            type={"text"}
            placeholder="Search accounts and videos"
          />

          <button
            className="absolute md:r-5 right-5 top-2 border-l-2 border-gray-200 pl-4 text-2xl text-gray-400"
            onClick={handleSearch}
          >
            <BiSearch className="" />
          </button>
        </form>
      </div> */}
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10 ">
            <Link href={"/upload"}>
              <button className="border-2 px-2 md:px-4 text-md flex font-semibold items-center gap-2">
                <IoMdAdd className="text-xl" />
                <span className="hidden md:block "> Upload</span>
              </button>
            </Link>

            {userProfile.image && (
              <Link href={""}>
                <React.Fragment>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="profile__shot"
                  />
                </React.Fragment>
              </Link>
            )}

            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className="px-2"
              type="button"
            >
              {" "}
              <AiOutlineLogout color="red" fontSize={21} />{" "}
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Login Failed")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
