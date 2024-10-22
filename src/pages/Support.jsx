import React, { useState } from "react";
import Swal from "sweetalert2";
import MailService from "../components/Mail";
import FAQ from "../assets/images/FAQ.png";
import Mascot from "../assets/images/support-mascot.png";
import Mail from "../assets/images/mail-to.png";

const Support = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleButtonClick = () => {
    Swal.fire({
      icon: "info",
      title: "추가 예정입니다.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="min-h-screen bg-mainBg text-fontWhite flex flex-col justify-between">
      <div className="flex flex-grow items-center justify-between p-8 sm:p-4 sm:flex-col sm:justify-center">
        {/* 좌측 콘텐츠 */}
        <div className="w-1/2 p-28 ml-24 sm:ml-0 sm:p-1 sm:w-full">
          <h1 className="font-title text-xl-title mb-2 sm:text-xl-title">
            Support
          </h1>
          <h2 className="font-title text-md-title mb-4 sm:text-sm-title sm:mb-2">
            도움이 필요하신가요?
          </h2>
          <h3 className="font-batang text-xs-title mb-8 sm:text-content-md sm:mb-4">
            아래의 방법으로 지원해드리겠습니다!
          </h3>

          {/* FAQ 섹션 */}
          <h2 className="font-title text-md-title mb-4 sm:mb-2">FAQ</h2>
          <button onClick={handleButtonClick} className="focus:outline-none">
            <img
              src={FAQ}
              alt="FAQ"
              className="mb-8 w-40 h-auto sm:w-28 sm:mb-2"
            />
          </button>

          <h2 className="font-title text-md-title mb-4 sm:mb-2">
            Contact Form
          </h2>
          {/* 메일 이미지 클릭 시 팝업 열림 */}
          <img
            src={Mail}
            alt="Mail"
            className="mb-8 w-40 h-auto cursor-pointer sm:w-28 sm:mb-2"
            onClick={togglePopup}
          />
          {/* 팝업창 */}
          <MailService isPopupOpen={isPopupOpen} onClose={togglePopup} />
        </div>

        {/* 우측 마스코트 */}
        <div className="w-1/2 flex justify-center animate__animated animate__fadeInRight animate-delay">
          <img src={Mascot} alt="Mascot" className="w-150 sm:w-44 sm:h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Support;
