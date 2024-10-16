import React from "react";
import { useNavigate } from "react-router-dom";
import FAQ from "../assets/images/FAQ.png";
import Discord from "../assets/images/Discord.png";
import Mascot from "../assets/images/support-mascot.png";
import Logo from "../assets/images/afterburner-logo.png";

const Support = () => {
  const navigate = useNavigate();

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
        <option value="">Select a page</option> {/* 기본 옵션 추가 */}
        <option value="/">main</option>
        <option value="/introduction">introduction</option>
        <option value="/function">function</option>
        <option value="/reviews">reviews</option>
        <option value="/support">support</option>
        <option value="/afterburner">afterburner</option>
      </select>
      <h1>Support</h1>
      <h2>도움이 필요하신가요?</h2>
      <h3>아래의 방법으로 지원해드리겠습니다!</h3>
      <h2>FAQ</h2>
      <ul>
        <li>Afterburner FAQ</li>
      </ul>
      <img src={FAQ} alt="FAQ" />
      <h2>Contact us</h2>
      <ul>
        <li>Afterburner 공식디스코드</li>
      </ul>
      <img src={Discord} alt="Discord" />
      <br />
      <img src={Mascot} alt="Mascot" />
    </div>
  );
};

export default Support;
