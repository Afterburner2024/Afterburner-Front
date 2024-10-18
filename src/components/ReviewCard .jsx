import React from "react";

const ReviewCard = ({ avatarUrl, reviewName, reviewContents }) => {
  return (
    <div className="flex items-center space-x-4 bg-headerFooter p-6 w-2/3 rounded-lg shadow-lg sm:w-full sm:p-4">
      <img
        src={avatarUrl}
        alt={`${reviewName} Avatar`}
        className="w-16 h-16 rounded-full object-cover border-2 border-mainBg bg-white sm:w-12 sm:h-12"
      />
      <div>
        <h3 className="font-title text-sm-title font-bold sm:text-comment-lg">
          {reviewName}
        </h3>
        <p className="font-batang text-content-sm leading-relaxed sm:text-content-ll">
          {reviewContents}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
