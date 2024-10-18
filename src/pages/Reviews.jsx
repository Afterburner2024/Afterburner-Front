import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllData } from "../features/dataSlice";
import { setSeeds, selectSeeds } from "../features/seedSlice";
import ReviewCard from "../components/ReviewCard ";

const Reviews = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllData);
  const storedSeeds = useSelector(selectSeeds);
  const [review, setReview] = useState({});

  useEffect(() => {
    if (data.reviews && data.reviews.length > 0) {
      setReview(data.reviews[0]);

      if (storedSeeds.length === 0) {
        const newSeeds = Array(5)
          .fill()
          .map(() => Math.random().toString(36).substring(7));

        dispatch(setSeeds(newSeeds));
      }
    }
  }, [data, storedSeeds, dispatch]);

  const getAvatarUrl = (seed) =>
    `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`;

  return (
    <div className="min-h-screen bg-mainBg text-fontWhite flex flex-col justify-center">
      <div className="hidden text-center text-title text-md-title sm:block">
        Reviews
      </div>
      <div className="flex flex-row gap-6 p-8 sm:flex sm:flex-col sm:p-4 sm:gap-3">
        {storedSeeds.length > 0 && (
          <>
            {/* 좌측 3개의 카드 */}
            <div className="space-y-6 flex flex-col justify-center items-end sm:space-y-3">
              <div className="flex flex-col justify-center items-end animate__animated animate__fadeInLeft animate-delay">
                <ReviewCard
                  avatarUrl={getAvatarUrl(storedSeeds[0])}
                  reviewName={review.review_name1}
                  reviewContents={review.review_contents1}
                />
              </div>
              <div className="flex flex-col justify-center items-end animate__animated animate__fadeInLeft animate-delay3">
                <ReviewCard
                  avatarUrl={getAvatarUrl(storedSeeds[2])}
                  reviewName={review.review_name3}
                  reviewContents={review.review_contents3}
                />
              </div>
              <div className="flex flex-col justify-center items-end animate__animated animate__fadeInLeft animate-delay5">
                <ReviewCard
                  avatarUrl={getAvatarUrl(storedSeeds[4])}
                  reviewName={review.review_name5}
                  reviewContents={review.review_contents5}
                />
              </div>
            </div>

            {/* 우측 2개의 카드 */}
            <div className="space-y-6 flex flex-col justify-center items-start sm:space-y-3">
              <div className="flex flex-col justify-center items-start animate__animated animate__fadeInRight animate-delay2">
                <ReviewCard
                  avatarUrl={getAvatarUrl(storedSeeds[1])}
                  reviewName={review.review_name2}
                  reviewContents={review.review_contents2}
                />
              </div>
              <div className="flex flex-col justify-center items-start animate__animated animate__fadeInRight animate-delay4">
                <ReviewCard
                  avatarUrl={getAvatarUrl(storedSeeds[3])}
                  reviewName={review.review_name4}
                  reviewContents={review.review_contents4}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reviews;
