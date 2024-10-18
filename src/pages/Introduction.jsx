import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllData } from "../features/dataSlice";
import Mascot from "../assets/images/mascot.png";

const Introduction = () => {
  const data = useSelector(selectAllData);
  const [intro, setIntro] = useState({});

  useEffect(() => {
    if (data.introduction && data.introduction.length > 0) {
      setIntro(data.introduction[0]);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-mainBg text-fontWhite flex flex-col justify-between">
      {/* 메인 콘텐츠: 좌측 텍스트, 우측 마스코트 */}
      <div className="flex flex-grow items-center justify-between p-8">
        {/* 좌측 텍스트 */}
        <div className="w-1/2 p-28">
          <h1 className="font-title text-xl-title mb-6">Afterburner</h1>
          <h2 className="font-title text-md-title mb-2">
            {intro.intro_title1}
          </h2>
          <h3 className="font-title text-md-title mb-6">
            {intro.intro_title2}
          </h3>
          <p
            className="font-batang text-content-md mb-6 leading-normal"
            dangerouslySetInnerHTML={{
              __html: intro.intro_contents
                ? intro.intro_contents.split(/[.,]/).join("<br />")
                : "Loading...",
            }}
          ></p>
        </div>

        {/* 우측 마스코트 이미지 */}
        <div className="w-1/2 flex justify-center animate__animated animate__fadeInRight animate-delay">
          <img src={Mascot} alt="Mascot" className="w-150" />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
