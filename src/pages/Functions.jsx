import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllData } from "../features/dataSlice";
import SI1 from "../assets/images/functionImg/fc-sample1.webp";
import SI2 from "../assets/images/functionImg/fc-sample2.webp";
import SI3 from "../assets/images/functionImg/fc-sample3.webp";

const Functions = () => {
  const data = useSelector(selectAllData);
  const [func, setFunc] = useState({});

  useEffect(() => {
    if (data.functions && data.functions.length > 0) {
      setFunc(data.functions[0]);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-mainBg text-fontWhite flex flex-col justify-center">
      <div className="flex justify-center items-center flex-wrap p-8">
        <div className="hidden text-center text-title text-md-title sm:block">
          Functions
        </div>
        {/* 기능 1 */}
        <div
          className="bg-headerFooter p-6 m-4 w-1/4 rounded-lg shadow-lg min-h-[34rem] flex flex-col 
        justify-evenly animate__animated animate__fadeInUp animate-delay sm:flex-col sm:w-5/6 sm:h-auto sm:justify-center sm:min-h-36 sm:p-3 sm:m-2"
        >
          <img
            src={SI1}
            alt="기능 1 이미지"
            className="mb-4 w-full h-64 object-cover rounded-lg sm:hidden"
          />
          <h3 className="font-title text-md-title mb-4 sm:mb-1 sm:text-xs-title">
            {func.func_title1}
          </h3>
          <p className="font-batang text-content-sm leading-normal sm:text-content-ll">
            {func.func_contents1}
          </p>
        </div>

        {/* 기능 2 */}
        <div
          className="bg-headerFooter p-6 m-4 w-1/4 rounded-lg shadow-lg min-h-[34rem] flex flex-col 
        justify-evenly animate__animated animate__fadeInUp animate-delay2 sm:flex-col sm:w-5/6 sm:h-auto sm:justify-center sm:min-h-36 sm:p-3 sm:m-2"
        >
          <h3 className="font-title text-md-title mb-4 sm:mb-1 sm:text-xs-title">
            {func.func_title2}
          </h3>
          <p className="font-batang text-content-sm leading-normal sm:text-content-ll">
            {func.func_contents2}
          </p>
          <img
            src={SI2}
            alt="기능 2 이미지"
            className="w-full h-64 object-cover rounded-lg sm:hidden"
          />
        </div>

        {/* 기능 3 */}
        <div
          className="bg-headerFooter p-6 m-4 w-1/4 rounded-lg shadow-lg min-h-[34rem] flex flex-col 
        justify-evenly animate__animated animate__fadeInUp animate-delay3 sm:flex-col sm:w-5/6 sm:h-auto sm:justify-center sm:min-h-36 sm:p-3 sm:m-2"
        >
          <img
            src={SI3}
            alt="기능 3 이미지"
            className="mb-4 w-full h-64 object-cover rounded-lg sm:hidden"
          />
          <h3 className="font-title text-md-title mb-4 sm:mb-1 sm:text-xs-title">
            {func.func_title3}
          </h3>
          <p className="font-batang text-content-sm leading-normal sm:text-content-ll">
            {func.func_contents3}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Functions;
