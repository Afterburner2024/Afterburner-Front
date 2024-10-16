import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllData } from "../features/dataSlice";
import Mascot from "../assets/images/mascot.png";
import Logo from "../assets/images/afterburner-logo.png";

const Introduction = () => {
  const data = useSelector(selectAllData);
  const [intro, setIntro] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setIntro(data.introduction[0]);
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
      <h1>Afterburner</h1>
      <h1>{intro.intro_title1}</h1>
      <h1>{intro.intro_title2}</h1>
      <p>{intro.intro_contents}</p>
      <img src={Mascot} alt="Mascot" />
    </div>
  );
};

export default Introduction;
