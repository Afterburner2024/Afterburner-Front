import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed right-4 top-4 flex flex-col space-y-2 text-white">
      <Link to="/introduction" className="hover:text-blue-500">
        Introduction
      </Link>
      <Link to="/functions" className="hover:text-blue-500">
        Functions
      </Link>
      <Link to="/reviews" className="hover:text-blue-500">
        Reviews
      </Link>
      <Link to="/support" className="hover:text-blue-500">
        Support
      </Link>
      <Link to="/afterburner" className="hover:text-blue-500">
        Afterburner
      </Link>
    </nav>
  );
};

export default Navigation;
