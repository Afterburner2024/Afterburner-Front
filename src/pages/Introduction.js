import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllData } from "../features/dataSlice";
import Mascot from "../assets/images/mascot.png";
import Logo from "../assets/images/afterburner-logo.png";

const Introduction = () => {
  const data = useSelector(selectAllData);
  const [intro, setIntro] = useState({});

  useEffect(() => {
    setIntro(data.introduction[0]);
  }, [data]);

  return (
    <div>
      <img src={Logo} alt="Logo" />
      <br />
      <h1>Afterburner</h1>
      <h1>{intro.intro_title1}</h1>
      <h1>{intro.intro_title2}</h1>
      <p>{intro.intro_contents}</p>
      <img src={Mascot} alt="Mascot" />
    </div>
  );
};

export default Introduction;
