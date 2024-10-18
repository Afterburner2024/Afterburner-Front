import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllData } from "../features/dataSlice";
import ProfileCard from "../components/ProfileCard";
import Discord from "../assets/images/Discord2.png";
import Wiki from "../assets/images/Wiki.png";
import Notion from "../assets/images/Notion.png";
import Figma from "../assets/images/Figma.png";

const Afterburner = () => {
  const data = useSelector(selectAllData);
  const [afterburner, setAfterburner] = useState({});

  const contributors = data.contributor || [];

  useEffect(() => {
    if (data.afterburner && data.afterburner.length > 0) {
      setAfterburner(data.afterburner[0]);
    }
  }, [data]);

  return (
    <div
      className="min-h-screen bg-mainBg text-fontWhite flex flex-col items-start justify-center 
    p-28 sm:p-4"
    >
      {/* 타이틀 및 내용 */}
      <div className="w-full text-left mb-4">
        <h1 className="font-title text-xl-title mb-4">
          {afterburner.afterburner_title}
        </h1>
        <p
          className="font-batang text-content-md leading-normal mb-4 sm:text-comment-sm"
          dangerouslySetInnerHTML={{
            __html: afterburner.afterburner_contents
              ? afterburner.afterburner_contents.split(/[.,]/).join("<br />")
              : "Loading...",
          }}
        ></p>
      </div>

      {/* 기여자 프로필 카드 */}
      <h1 className="font-title text-md-title text-left mb-4 sm:hidden">
        Contributor
      </h1>
      <div className="flex flex-wrap justify-start items-start space-x-4 mb-8 sm:flex-row sm:space-x-0 sm:justify-evenly sm:mb-2">
        {contributors.map((contributor, index) => (
          <div
            key={contributor.id}
            className="animate__animated animate__zoomInUp sm:mb-2"
            style={{ animationDelay: `${index * 0.3}s` }} // 각 카드마다 0.3초 간격으로 딜레이
          >
            <ProfileCard user={contributor} />
          </div>
        ))}
      </div>

      {/* 커뮤니티 버튼들 */}
      <h1 className="font-title text-md-title text-left mb-4">
        Join our Community
      </h1>
      <div className="flex space-x-4 items-start">
        <a
          href="https://discord.gg/SH2p3sfASc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={Discord}
            alt="Discord"
            className="w-100 h-auto shadow-lg mr-1"
          />
        </a>
        <a
          href="https://github.com/Afterburner2024/.github/wiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Wiki} alt="Wiki" className="w-100 h-auto shadow-lg mx-1" />
        </a>
        <a
          href="https://www.notion.so/Afterburner-HQ-11bc18d2895180d3b6dae205c0d0d44f?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={Notion}
            alt="Notion"
            className="w-100 h-auto shadow-lg mx-1"
          />
        </a>
        <a
          href="https://www.figma.com/design/L3nhz4B7at9VrOLECcdIh9/Afterburner?node-id=0-1&t=pqPGJCoWXPWXHzXe-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={Figma}
            alt="Figma"
            className="w-100 h-auto shadow-lg mx-1"
          />
        </a>
      </div>
    </div>
  );
};

export default Afterburner;
