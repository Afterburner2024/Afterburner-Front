import React from "react";
import FAQ from "../assets/images/FAQ.png";
import Discord from "../assets/images/Discord.png";
import Mascot from "../assets/images/support-mascot.png";

const Support = () => {
  return (
    <div className="min-h-screen bg-mainBg text-fontWhite flex flex-col justify-between">
      <div className="flex flex-grow items-center justify-between p-8">
        {/* 좌측 콘텐츠 */}
        <div className="w-1/2 p-16">
          <h1 className="text-lg-title mb-2">Support</h1>
          <h2 className="text-md-title mb-4">도움이 필요하신가요?</h2>
          <h3 className="text-sm-title mb-8">
            아래의 방법으로 지원해드리겠습니다!
          </h3>

          {/* FAQ 섹션 */}
          <h2 className="text-md-title mb-4">FAQ</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Afterburner FAQ</li>
          </ul>
          <img src={FAQ} alt="FAQ" className="mb-8 w-32" />

          {/* Contact Us 섹션 */}
          <h2 className="text-md-title mb-4">Contact us</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Afterburner 공식디스코드</li>
          </ul>
          <img src={Discord} alt="Discord" className="mb-8 w-32" />
        </div>

        {/* 우측 마스코트 */}
        <div className="w-1/2 flex justify-center">
          <img
            src={Mascot}
            alt="Mascot"
            className="w-150
          "
          />
        </div>
      </div>
    </div>
  );
};

export default Support;
