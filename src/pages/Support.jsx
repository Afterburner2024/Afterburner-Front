import React, { useState } from "react";
import MailService from "../components/Mail";
import FAQ from "../assets/images/FAQ.png";
import Mascot from "../assets/images/support-mascot.png";
import Mail from "../assets/images/mail-to.png";

const Support = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="min-h-screen bg-mainBg text-fontWhite flex flex-col justify-between">
      <div className="flex flex-grow items-center justify-between p-8">
        {/* 좌측 콘텐츠 */}
        <div className="w-1/2 p-28">
          <h1 className="text-lg-title mb-2">Support</h1>
          <h2 className="text-md-title mb-4">도움이 필요하신가요?</h2>
          <h3 className="text-sm-title mb-8">
            아래의 방법으로 지원해드리겠습니다!
          </h3>

          {/* FAQ 섹션 */}
          <h2 className="text-md-title mb-4">FAQ</h2>
          <img src={FAQ} alt="FAQ" className="mb-8 w-40 h-auto" />

          <h2 className="text-md-title mb-4">Contact Form</h2>
          {/* 메일 이미지 클릭 시 팝업 열림 */}
          <img
            src={Mail}
            alt="Mail"
            className="mb-8 w-40 h-auto cursor-pointer"
            onClick={togglePopup}
          />
          {/* 팝업창 */}
          <MailService isPopupOpen={isPopupOpen} onClose={togglePopup} />
        </div>

        {/* 우측 마스코트 */}
        <div className="w-1/2 flex justify-center">
          <img src={Mascot} alt="Mascot" className="w-150" />
        </div>
      </div>
    </div>
  );
};

export default Support;
