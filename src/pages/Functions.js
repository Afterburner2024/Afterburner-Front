import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllData } from "../features/dataSlice";
import Logo from "../assets/images/afterburner-logo.png";

const Functions = () => {
  const data = useSelector(selectAllData);
  const [func, setFunc] = useState({});

  useEffect(() => {
    setFunc(data.functions[0]);
  }, [data]);

  return (
    <div>
      <img src={Logo} alt="Logo" />
      <br />
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
