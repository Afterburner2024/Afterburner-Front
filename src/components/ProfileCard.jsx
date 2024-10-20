import React from "react";
import Github from "../assets/images/github.svg";

const ProfileCard = ({ user }) => {
  return (
    <div className="flex flex-col justify-center items-center w-44 h-56 border-2 bg-headerFooter rounded-xl shadow-lg sm:w-32 sm:h-36">
      <div className="w-full flex justify-end">
        <a
          href={`https://github.com/${user.contributor_username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Github} alt="GitHub" className="w-6 h-6 mr-3" />
        </a>
      </div>
      <img
        src={`https://github.com/${user.contributor_username}.png?size=80`}
        alt={user.contributor_name}
        className="w-20 border-2 rounded-full mb-4 sm:w-16 sm:mb-1"
      />
      <h2 className="font-title text-xs-title font-bold text-center mb-2 sm:text-comment-md sm:mb-0">
        {user.contributor_username}
      </h2>
      <h3 className="font-batang text-content-sm text-center sm:text-content-ll">
        {user.contributor_name}
      </h3>
    </div>
  );
};

export default ProfileCard;
