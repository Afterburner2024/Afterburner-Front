import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllData } from "../features/dataSlice";
import Logo from "../assets/images/afterburner-logo.png";

const Functions = () => {
  const data = useSelector(selectAllData);
  const [func, setFunc] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setFunc(data.functions[0]);
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
      <h1>Functions</h1>
      <h3>{func.func_title1}</h3>
      <p>{func.func_contents1}</p>
      <h3>{func.func_title2}</h3>
      <p>{func.func_contents2}</p>
      <h3>{func.func_title3}</h3>
      <p>{func.func_contents3}</p>
    </div>
  );
};

export default Functions;
