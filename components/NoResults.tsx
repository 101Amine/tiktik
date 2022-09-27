import React from "react";

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  console.log(text);
  return <div>NoResults</div>;
};

export default NoResults;
