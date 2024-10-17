import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllData } from "../features/dataSlice";
import SI1 from "../assets/images/fc-sample1.webp";
import SI2 from "../assets/images/fc-sample2.webp";
import SI3 from "../assets/images/fc-sample3.webp";

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
        {/* 기능 1 */}
        <div className="bg-headerFooter p-6 m-4 w-full md:w-1/4 rounded-lg shadow-lg min-h-[34rem]">
          <img
            src={SI1}
            alt="기능 1 이미지"
            className="mb-4 w-full h-64 object-cover rounded-lg"
          />
          <h3 className="text-md-title mb-4">{func.func_title1}</h3>
          <p className="text-content leading-relaxed">{func.func_contents1}</p>
        </div>

        {/* 기능 2 */}
        <div className="bg-headerFooter p-6 m-4 w-full md:w-1/4 rounded-lg shadow-lg min-h-[34rem]">
          <h3 className="text-md-title mb-4">{func.func_title2}</h3>
          <p className="text-content leading-relaxed mb-4">
            {func.func_contents2}
          </p>
          <img
            src={SI2}
            alt="기능 2 이미지"
            className="mb-4 w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* 기능 3 */}
        <div className="bg-headerFooter p-6 m-4 w-full md:w-1/4 rounded-lg shadow-lg min-h-[34rem]">
          <img
            src={SI3}
            alt="기능 3 이미지"
            className="mb-4 w-full h-64 object-cover rounded-lg"
          />
          <h3 className="text-md-title mb-4">{func.func_title3}</h3>
          <p className="text-content leading-relaxed">{func.func_contents3}</p>
        </div>
      </div>
    </div>
  );
};

export default Functions;
