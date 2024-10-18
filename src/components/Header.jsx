// components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/afterburner-logo.png";
import Github from "../assets/images/github.svg";
import Appstore from "../assets/images/appstore.svg";
import GooglePlay from "../assets/images/googleplay.svg";

const Header = () => {
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
          <a
            href="https://github.com/Afterburner2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Appstore} alt="Appstore" className="w-6 h-auto mx-2" />
          </a>
          <a
            href="https://github.com/Afterburner2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={GooglePlay}
              alt="GooglePlay"
              className="w-6 h-auto mx-2"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
