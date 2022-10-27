import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import css from "../../css/header.css";
import dolphin from "../../assert/header/logo_.png";
import bell from "../../assert/header/bell.png";
import { instance } from "../../shared/Api";
import Search from "./Search";
import burger from "../../assert/header/burger.png";
import SSE from "../sse/SSE";
import { useEffect } from "react";
import Swal from "sweetalert2";
import ModalPortal from "../modal/ModalPortal";
import HeaderMenu from "./HeaderMenu";

const Header = ({ title }) => {
  const navigate = useNavigate();

  // 햄버거 메뉴 modal
  const [modal, setModal] = useState(false);

  // sse modal
  const [notice, setNotice] = useState(false);

  // 로그인 여부를 확인하기 위해 storage에서 가져온 데이터
  const token = sessionStorage.getItem("ACCESS_TOKEN");

  // 클릭 시 모달 열고 닫기
  const onModalHandler = (e) => {
    setModal(!modal);
  };

  // sse
  const [count, setCount] = useState();

  const getNotice = async () => {
    const res = await instance.get("/api/auth/notice/notifications");
    setCount(res.data.unreadCount);
  };

  const noticeModalHandler = () => {
    if (token) {
      setNotice(!notice);
    } else {
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    if (token) {
      getNotice();
    }
  }, []);

  const modalHandler = () => {
    setNotice(false);
  };

  return (
    <StHeader>
      <Top>
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
        <img alt="" src={dolphin} onClick={() => navigate("/")} />
        <img
          alt=""
          src={burger}
          onClick={onModalHandler}
          style={{ paddingBottom: "7px", paddingRight: "12px" }}
        />
      </Top>
      {modal && (
        <ModalPortal>
          <HeaderMenu modalHandler={onModalHandler}/>
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

  & a {
    &:hover {
      cursor: pointer;
    }
  }
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

  & p {
    font-size: 35px;
    margin-top: 8px;
    margin-left: 10px;
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

  &:hover {
    cursor: pointer;
  }
`;