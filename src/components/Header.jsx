// components/Header.js
import React from "react";
import Logo from "../assets/images/afterburner-logo.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-8 bg-gray-900">
      <img src={Logo} alt="Afterburner Logo" className="w-40" />
    </header>
  );
};

export default Header;
