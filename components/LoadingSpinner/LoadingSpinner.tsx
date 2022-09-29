import React from "react";
import styled from "styled-components";

interface IProps {
  height?: string;
  width?: string;
  borderSize?: string;
  margin?: string;
}

const SpinnerContainer = styled.div``;

const Spinner = styled.div<IProps>`
  width: ${(props) => (props.width ? props.width : "50px")};
  height: ${(props) => (props.height ? props.height : "50px")};
  border: ${(props) => (props.borderSize ? props.borderSize : "10px")} solid
    #f3f3f3;
  border-top: ${(props) => (props.borderSize ? props.borderSize : "10px")} solid
    #383636;
  margin-inline: ${(props) => (props.margin ? props.margin : "")};
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
`;
const LoadingSpinner: React.FC<IProps> = ({
  height,
  width,
  borderSize,
  margin,
}) => {
  return (
    <SpinnerContainer>
      <Spinner
        margin={margin}
        height={height}
        width={width}
        borderSize={borderSize}
      />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
