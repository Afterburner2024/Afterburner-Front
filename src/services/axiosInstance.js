import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // 여기에 백엔드 API URL을 입력하세요
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
