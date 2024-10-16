import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchAllData from "../actions/dataActions";
import { selectAllData, selectStatus } from "../features/dataSlice";
import AppStore from "../assets/images/app-store.png";
import GooglePlay from "../assets/images/google-play.png";
import QR from "../assets/images/QR.png";
import BG1 from "../assets/images/main-bg-1.png";
import Logo from "../assets/images/afterburner-logo.png";

const MainPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllData);
  const status = useSelector(selectStatus);
  const [main, setMain] = useState({});
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (data.main.length > 0) {
      setMain(data.main[0]);
    }
  }, [data]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading data.</div>;
  }

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
      <h1>{main.main_title1}</h1>
      <h1>{main.main_title2}</h1>
      <h3>{main.main_sub_title}</h3>
      <p>앱스토어 다운로드</p>
      <img src={AppStore} alt="AppStore" />
      <img src={GooglePlay} alt="GooglePlay" />
      <br />
      <p>QR코드 다운로드</p>
      <img src={QR} alt="QR" />
      <br />
      <img src={BG1} alt="BG1" />
    </div>
  );
};

export default MainPage;
