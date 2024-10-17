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
        <div className="w-1/2 p-16">
          <h1 className="text-lg-title mb-4">Afterburner</h1>
          <h2 className="text-md-title mb-2">{intro.intro_title1}</h2>
          <h3 className="text-sm-title mb-4">{intro.intro_title2}</h3>
          <p className="text-content mb-6 leading-relaxed">
            {intro.intro_contents
              ? intro.intro_contents
                  .split(/[.,]/)
                  .map((sentence, index, arr) => (
                    <span key={index}>
                      {sentence.trim()}
                      {index < arr.length - 1 && (
                        <>
                          <br />
                        </>
                      )}
                    </span>
                  ))
              : "Loading..."}
          </p>
        </div>

        {/* 우측 마스코트 이미지 */}
        <div className="w-1/2 flex justify-center">
          <img src={Mascot} alt="Mascot" className="w-150" />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
