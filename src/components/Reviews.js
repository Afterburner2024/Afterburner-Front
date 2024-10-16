import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllData } from "../features/dataSlice";
import Logo from "../assets/images/afterburner-logo.png";

const Reviews = () => {
  const data = useSelector(selectAllData);
  const [review, setReview] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setReview(data.reviews[0]);
  }, [data]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  return (
    <div>
      <img src={Logo} alt="Logo" />
      <br />
      <select onChange={handleSelectChange}>
        {" "}
        <option value="">Select a page</option>
        <option value="/">main</option>
        <option value="/introduction">introduction</option>
        <option value="/function">function</option>
        <option value="/reviews">reviews</option>
        <option value="/support">support</option>
        <option value="/afterburner">afterburner</option>
      </select>
      <h1>Reviews</h1>
      <h3>{review.review_name1}</h3>
      <p>{review.review_contents1}</p>
      <h3>{review.review_name2}</h3>
      <p>{review.review_contents2}</p>
      <h3>{review.review_name3}</h3>
      <p>{review.review_contents3}</p>
      <h3>{review.review_name4}</h3>
      <p>{review.review_contents4}</p>
      <h3>{review.review_name5}</h3>
      <p>{review.review_contents5}</p>
    </div>
  );
};

export default Reviews;
