import React from "react";
import LoadingSvg from "../assets/images/loading.svg";

const Loading = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center bg-mainBg">
      <img src={LoadingSvg} alt="Loading animation" />
    </div>
  );
};

export default Loading;
