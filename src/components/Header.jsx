// components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS 임포트
import Logo from "../assets/images/afterburner-logo.png";
import Github from "../assets/images/github.svg";
import Appstore from "../assets/images/appstore.svg";
import GooglePlay from "../assets/images/googleplay.svg";

const Header = () => {
  const handleButtonClick = () => {
    toast.info("추가 예정입니다.", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <header className="w-full fixed flex justify-between items-center p-8 z-20">
      <div className="w-full flex flex-row justify-between">
        <Link to="/">
          <img src={Logo} alt="Afterburner Logo" className="w-40" />
        </Link>
        <div className="flex flex-row items-center rounded-xl bg-white p-2 shadow-xl">
          <a
            href="https://github.com/Afterburner2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Github} alt="Github" className="w-6 h-auto mx-2" />
          </a>
          <button onClick={handleButtonClick} className="focus:outline-none">
            <img src={Appstore} alt="Appstore" className="w-6 h-auto mx-2" />
          </button>
          <button onClick={handleButtonClick} className="focus:outline-none">
            <img
              src={GooglePlay}
              alt="GooglePlay"
              className="w-6 h-auto mx-2"
            />
          </button>
        </div>
      </div>

      <ToastContainer />
    </header>
  );
};

export default Header;
