import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import fetchAllData from "../actions/dataActions";
import { selectAllData, selectStatus } from "../features/dataSlice";
import AppStore from "../assets/images/app-store.png";
import GooglePlay from "../assets/images/google-play.png";
import QR from "../assets/images/QR.png";
import BG1 from "../assets/images/main-bg-1.png";

const MainPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllData);
  const status = useSelector(selectStatus);
  const [main, setMain] = useState({});

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

  const handleButtonClick = () => {
    Swal.fire({
      icon: "info",
      title: "추가 예정입니다.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 좌측 텍스트 및 다운로드 버튼 영역 */}
      <div className="bg-mainBg text-fontWhite flex flex-col justify-center items-center w-full sm:w-full p-8">
        <h1 className="font-title text-xl-title">{main.main_title1}</h1>
        <h1 className="font-title text-xl-title mb-4">{main.main_title2}</h1>
        <h3 className="font-title text-sm-title mb-8">{main.main_sub_title}</h3>

        {/* 앱스토어 다운로드 */}
        <p className="font-batang text-content-md mb-3">앱스토어 다운로드</p>
        <div className="flex space-x-4 mb-6">
          <button onClick={handleButtonClick} className="focus:outline-none">
            <img
              src={AppStore}
              alt="AppStore"
              className="w-48 h-auto sm:w-32"
            />
          </button>
          <button onClick={handleButtonClick} className="focus:outline-none">
            <img
              src={GooglePlay}
              alt="GooglePlay"
              className="w-48 h-auto sm:w-32"
            />
          </button>
        </div>

        {/* QR코드 다운로드 */}
        <p className="font-batang text-content-md mb-3">QR코드 다운로드</p>
        <img src={QR} alt="QR Code" className="w-24" />
      </div>

      {/* 우측 배경 이미지 영역 */}
      <div
        className="w-full md:w-1/2 bg-cover bg-no-repeat bg-center sm:hidden"
        style={{ backgroundImage: `url(${BG1})` }}
      >
        {/* 이곳에 배경 이미지가 설정됩니다 */}
      </div>
    </div>
  );
};

export default MainPage;
