import React from "react";

const ReviewCard = ({ avatarUrl, reviewName, reviewContents }) => {
  return (
    <div className="flex items-center space-x-4 bg-headerFooter p-6 w-full md:w-2/3 rounded-lg shadow-lg ">
      <img
        src={avatarUrl}
        alt={`${reviewName} Avatar`}
        className="w-16 h-16 rounded-full object-cover border-2 border-mainBg bg-white"
      />
      <div>
        <h3 className="font-title text-sm-title font-bold">{reviewName}</h3>
        <p className="font-batang text-content-sm leading-relaxed">
          {reviewContents}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
