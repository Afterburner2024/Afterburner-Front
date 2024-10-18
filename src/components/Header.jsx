import React from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../assets/images/afterburner-logo.png";
import Github from "../assets/images/github.svg";
import Appstore from "../assets/images/appstore.svg";
import GooglePlay from "../assets/images/googleplay.svg";

const Header = () => {
  const location = useLocation();
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
    <header className="w-full fixed flex justify-between items-center p-8 z-20 sm:p-4">
      <div className="w-full flex flex-row justify-between z-20">
        <Link to="/">
          <img src={Logo} alt="Afterburner Logo" className="w-40" />
        </Link>
        {location.pathname !== "/" && (
          <div className="flex flex-row items-center rounded-xl bg-white p-2 shadow-xl z-20 sm:hidden">
            <a
              href="https://github.com/Afterburner2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Github} alt="Github" className="w-6 h-auto mx-2 z-20" />
            </a>
            <button
              onClick={handleButtonClick}
              className="focus:outline-none z-20"
            >
              <img
                src={Appstore}
                alt="Appstore"
                className="w-6 h-auto mx-2 z-20"
              />
            </button>
            <button
              onClick={handleButtonClick}
              className="focus:outline-none z-20"
            >
              <img
                src={GooglePlay}
                alt="GooglePlay"
                className="w-6 h-auto mx-2 z-20"
              />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
