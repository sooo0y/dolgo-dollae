import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { instance } from "../../shared/Api";

const HeaderMenu = ({ modalHandler }) => {
  const navigate = useNavigate();

  // 로그인 여부와 관리자 여부를 확인하기 위해 storage에서 가져온 데이터
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("ACCESS_TOKEN");

  // 로그아웃 클릭 시, 데이터 전송 & storage 초기화
  const logout = async () => {
    try {
      await instance.post("/api/auth/member/logout");
      Swal.fire({
        text: "로그아웃 되었습니다.",
        icon: "success",
      });
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("nickname");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("ACCESS_TOKEN");
      sessionStorage.removeItem("REFRESH_TOKEN");
      sessionStorage.removeItem("THEME_CODE");
      sessionStorage.removeItem("THEME_NAME");
      sessionStorage.removeItem("AREA_CODE");
      sessionStorage.removeItem("AREA_NAME");
      sessionStorage.removeItem("SIGUNGU_CODE");
      sessionStorage.removeItem("SIGUNGU_NAME");
      sessionStorage.removeItem("never");
      navigate("/");
      modalHandler();
    } catch {
      Swal.fire({
        text: "로그아웃 되었습니다.",
        icon: "success",
      });
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("nickname");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("ACCESS_TOKEN");
      sessionStorage.removeItem("REFRESH_TOKEN");
      sessionStorage.removeItem("THEME_CODE");
      sessionStorage.removeItem("THEME_NAME");
      sessionStorage.removeItem("AREA_CODE");
      sessionStorage.removeItem("AREA_NAME");
      sessionStorage.removeItem("SIGUNGU_CODE");
      sessionStorage.removeItem("SIGUNGU_NAME");
      sessionStorage.removeItem("never");
      navigate("/");
      modalHandler();
    }
  };

  // Modal 바깥 클릭 시 modal off
  const modalRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (!modalRef.current.contains(event.target)) {
      modalHandler();
    }
  };

  return (
    <MenuContainer>
      <Menu ref={modalRef}>
        <h3 onClick={() => navigate("/")}>홈</h3>
        <h3 onClick={() => navigate("/select")}>지역별 여행지</h3>
        <h3 onClick={() => navigate("/random")}>랜덤 여행지</h3>
        <h3 onClick={() => navigate("/ideal")}>여행지 월드컵</h3>
        <h3 onClick={() => navigate("/review/recent")}>최근 후기 목록</h3>
        <br />
        {/* 로그인 했을 경우*/}
        {token !== null ? (
          <>
            <h3 onClick={() => navigate("/request/post")}>장소 추가 요청</h3>
            <h3 onClick={() => navigate("/mypage")}>마이페이지</h3>
            <h3 onClick={() => navigate("/cose")}>나만의 코스</h3>
          </>
        ) : null}
        <br />
        {/* 관리자일 경우 */}
        {role === "ADMIN" ? (
          <>
            <h3 onClick={() => navigate("/request/list")}>* 요청 목록 *</h3>
            <h3 onClick={() => navigate("/post")}>* 게시글 추가 *</h3>
          </>
        ) : null}
        <div>
          {/* 로그인 했을 경우에는 로그인, 아닐 경우 로그아웃으로 노출 */}
          {token === null ? (
            <h3 onClick={() => navigate("/login")}>로그인 ＞</h3>
          ) : (
            <h3
              onClick={() => {
                logout();
              }}
            >
              로그아웃 ＞
            </h3>
          )}
        </div>
      </Menu>
    </MenuContainer>
  );
};

export default HeaderMenu;

const MenuContainer = styled.div`
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

const Menu = styled.div`
  position: absolute;
  left: 50%;
  max-width: 214px;
  width: 50%;
  float: right;
  height: 100vh;
  top: calc(0vh + 70px);
  background-color: #abd4e2;
  text-align: center;
  color: #535353;
  transition: all 0.3s;
  z-index: 999;
  margin-top: -1px;

  & h3 {
    margin: 30px auto;
    cursor: pointer;
  }

  & div {
    margin-top: 60px;
    color: white;
  }
`;
