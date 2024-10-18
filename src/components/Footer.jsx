import React from "react";
import { useLocation } from "react-router-dom";
import Down from "../assets/images/page-down.svg";

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-between items-center py-4 z-10">
      {/* 첫 번째 영역 */}
      <div className="flex-1 flex justify-start ml-5">
        <div className="font-title text-fontWhite text-content-sm sm:text-content-ll">
          © 2024 Afterburner. All rights reserved.
        </div>
      </div>

      {/* 두 번째 영역 (화살표) */}
      <div className="flex-1 flex justify-center">
        {location.pathname !== "/afterburner" && (
          <div className="animate-bounce text-white text-2xl">
            <img src={Down} alt="Down" className="mx-auto" />
          </div>
        )}
      </div>

      {/* 세 번째 영역 */}
      <div className="flex-1 flex justify-end mr-5">
        <a
          href="https://app.netlify.com/sites/afterburner2024/deploys"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://api.netlify.com/api/v1/badges/f465e7fc-da1c-4fe0-bf4f-58a6021d8996/deploy-status"
            alt="Netlify Status"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
