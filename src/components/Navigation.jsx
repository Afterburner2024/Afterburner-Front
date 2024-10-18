import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed h-dvh right-5 flex flex-col justify-center space-y-4 text-white z-10 mr-4 sm:hidden">
      <Link
        to="/introduction"
        className={`font-title text-xs-title hover:text-highlightBlue ${
          location.pathname === "/introduction" ? "text-highlightBlue" : ""
        }`}
      >
        Introduction
      </Link>
      <Link
        to="/function"
        className={`font-title text-xs-title hover:text-highlightBlue ${
          location.pathname === "/function" ? "text-highlightBlue" : ""
        }`}
      >
        Functions
      </Link>
      <Link
        to="/reviews"
        className={`font-title text-xs-title hover:text-highlightBlue ${
          location.pathname === "/reviews" ? "text-highlightBlue" : ""
        }`}
      >
        Reviews
      </Link>
      <Link
        to="/support"
        className={`font-title text-xs-title hover:text-highlightBlue ${
          location.pathname === "/support" ? "text-highlightBlue" : ""
        }`}
      >
        Support
      </Link>
      <Link
        to="/afterburner"
        className={`font-title text-xs-title hover:text-highlightBlue ${
          location.pathname === "/afterburner" ? "text-highlightBlue" : ""
        }`}
      >
        Afterburner
      </Link>
    </nav>
  );
};

export default Navigation;
