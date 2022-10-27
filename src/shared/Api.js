import axios from "axios";
import { getCookie } from "./Cookie";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// 토큰을 쿠키에 저장할 때
// instance.interceptors.request.use((config) => {
//   const token = getCookie("ACCESS_TOKEN");
//   const refreshToken = getCookie("REFRESH_TOKEN");

//   config.headers.authorization = token;
//   config.headers.refreshtoken = refreshToken;

//   return config;
// });

// instance.interceptors.request.use((config) => {
//     const token = sessionStorage.getItem("ACCESS_TOKEN");
//     const refreshToken = sessionStorage.getItem("REFRESH_TOKEN");
//     const cookieToken = getCookie("ACCESS_TOKEN");
//     const cookieRefreshToken = getCookie("REFRESH_TOKEN");

//     config.headers.authorization = token;
//     config.headers.refreshtoken = refreshToken;
//     config.headers.authorization = cookieToken;
//     config.headers.refreshtoken = cookieRefreshToken;

//   return config;
// });

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("ACCESS_TOKEN");
  const refreshToken = sessionStorage.getItem("REFRESH_TOKEN");

  config.headers.Authorization = token;
  config.headers.RefreshToken = refreshToken;

  return config;
});