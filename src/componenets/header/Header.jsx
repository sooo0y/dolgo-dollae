import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { instance } from "../../shared/Api";

// 이미지
import dolphin from "../../assert/header/logo_.png";
import bell from "../../assert/header/bell.png";
import burger from "../../assert/header/burger.png";

// component
import Search from "./Search";
import SSE from "../sse/SSE";
import HeaderMenu from "./HeaderMenu";
import ModalPortal from "../modal/ModalPortal";

const Header = ({ title }) => {
  const navigate = useNavigate();

  // 햄버거 메뉴 modal
  const [modal, setModal] = useState(false);

  // 클릭 시 모달 열고 닫기
  const onModalHandler = (e) => {
    setModal(!modal);
  };

  // 로그인 여부를 확인하기 위해 storage에서 가져온 데이터
  const token = sessionStorage.getItem("ACCESS_TOKEN");

  // sse
  // sse modal
  const [notice, setNotice] = useState(false);

  // 알림 modal on/off
  const modalHandler = () => {
    setNotice(false);
  };

  // 알림 갯수
  const [count, setCount] = useState();

  // 서버로부터 받아온 알림 갯수를 state에 저장
  const getNotice = async () => {
    const res = await instance.get("/api/auth/notice/notifications");
    setCount(res.data.unreadCount);
  };

  // 알림 아이콘 Click했을 경우,
  const noticeModalHandler = () => {
    // token이 있으면 알림 모달 open
    if (token) {
      setNotice(!notice);
    }
    // token이 없으면 안내 alert
    else {
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        icon: "warning",
      });
    }
  };

  // token이 있으면 렌더링될 때마다 알림 조회
  useEffect(() => {
    if (token) {
      getNotice();
    }
  }, []);

  return (
    <StHeader>
      <Top>
        {/* SSE */}
        <Bell
          alt=""
          src={bell}
          style={{ paddingLeft: "8px" }}
          onClick={noticeModalHandler}
        />
        {/* 알림 수가 1 이상이면 표시해주기 */}
        {count === 0 || count === undefined ? null : <Count />}
        {/* 알림 아이콘 클릭하면 sse 모달 open */}
        {notice && (
          <ModalPortal>
            <SSE modalHandler={modalHandler} />
          </ModalPortal>
        )}
        {/* LOGO */}
        <img alt="" src={dolphin} onClick={() => navigate("/")} />
        {/* 햄버거 메뉴 */}
        <img
          alt=""
          src={burger}
          onClick={onModalHandler}
          style={{ paddingBottom: "7px", paddingRight: "12px" }}
        />
      </Top>
      {/* MENU BAR */}
      {modal && (
        <ModalPortal>
          <HeaderMenu modalHandler={onModalHandler} />
        </ModalPortal>
      )}
      <Search title={title} />
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
  z-index: 3;
  position: fixed;
  top: 0;
`;

const Top = styled.div`
  background-color: #abd4e2;
  height: 70px;
  max-width: 428px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  position: relative;

  & img {
    margin-top: 5px;
    &:hover {
      cursor: pointer;
    }
  }

`;

const Count = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  top: 10px;
  left: 43px;
  background-color: red;
  border-radius: 50px;
`;

const Bell = styled.img`
  width: 40px;
  height: 40px;
  margin: auto 0;
  margin-left: 10px;
  position: relative;
  top: 8px;
  cursor: pointer;
`;
