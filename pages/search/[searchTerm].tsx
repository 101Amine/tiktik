import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NoResults from "../../components/NoResults";
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";

interface IProps {
  xx: string;
  yy: string;
}

const Search: React.FC<IProps> = ({ xx, yy }) => {
  return <div>Search</div>;
};

const getServerProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: res.data,
  };
};

export default Search;
