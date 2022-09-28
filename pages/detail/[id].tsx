import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { HiVolumeOff } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { BASE_URL } from "../../utils";

const Detail = () => {
  return <div className="w-100"> ttt</div>;
};

export const getServerSideProps = async ({ params: { id } }: any) => {
  const { data } = await axios.get(`${BASE_URL}/api/detail/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
