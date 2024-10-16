import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllData } from "../features/dataSlice";
import ProfileCard from "./ProfileCard";
import Logo from "../assets/images/afterburner-logo.png";
import Discord from "../assets/images/Discord2.png";
import Wiki from "../assets/images/Wiki.png";
import Notion from "../assets/images/Notion.png";
import Figma from "../assets/images/Figma.png";

const Afterburner = () => {
  const data = useSelector(selectAllData);
  const [afterburner, setAfterburner] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setAfterburner(data.afterburner[0]);
  }, [data]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  const users = [
    { username: "stjoo0925", name: "주순태" },
    { username: "ppudding3861", name: "강형석" },
    { username: "hwangjeonghan", name: "황정한" },
    { username: "dansun2", name: "이서현" },
    { username: "KHY90", name: "김화연" },
    { username: "wooseungyeop", name: "우승엽" },
  ];

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
      <h1>{afterburner.afterburner_title}</h1>
      <p>{afterburner.afterburner_contents}</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {users.map((user) => (
          <ProfileCard key={user.username} user={user} />
        ))}
      </div>
      <h1>Join our Community</h1>
      <img src={Discord} alt="Discord" />
      <img src={Wiki} alt="Wiki" />
      <img src={Notion} alt="Notion" />
      <img src={Figma} alt="Figma" />
    </div>
  );
};

export default Afterburner;
