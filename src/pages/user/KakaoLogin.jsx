import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../shared/Api";
import { setCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";

const KaKaoLogin = () => {
  const navigate = useNavigate();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    kakaologin(code);
  }, []);

  const kakaologin = async (code) => {
    try {
      //백엔드로 인가코드 보내기
      const res = await instance.get(`/api/kakao/login?code=${code}`);

      sessionStorage.setItem("ACCESS_TOKEN", res.headers.authorization);
      sessionStorage.setItem("REFRESH_TOKEN", res.headers.refreshtoken);
      sessionStorage.setItem("username", res.data.username);
      sessionStorage.setItem("nickname", res.data.nickname);
      sessionStorage.setItem("role", res.data.role);

      Swal.fire({
        title: `${res.data.nickname}님`,
        text: "환영합니다.",
        icon: "success",
      });
      navigate("/");

    } catch (error) {
      console.log("카카오 로그인 실패");
    }
  };

  return null;
};

export default KaKaoLogin;