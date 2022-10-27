import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import dolphin from "../../../assert/header/logo_.png";
import bell from "../../../assert/header/bell.png";
import { instance } from "../../../shared/Api";
import burger from "../../../assert/header/burger.png";
import ReviseMap from "./ReviseMap";
import Swal from "sweetalert2";
import ModalPortal from "../../modal/ModalPortal";
import SSE from "../../sse/SSE";

const ReviseHeader = ({ searchWords }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const role = sessionStorage.getItem("role");
  // const getToken = getCookie("ACCESS_TOKEN");
  const getToken = sessionStorage.getItem("ACCESS_TOKEN");

  const onModalHandler = (e) => {
    setModal(!modal);
  };

    // sse modal
    const [notice, setNotice] = useState(false);

    // 로그인 여부를 확인하기 위해 storage에서 가져온 데이터
    const token = sessionStorage.getItem("ACCESS_TOKEN");


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
    } catch(error) {
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
    }
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
      {modal === true ? (
        <MenuContainer>
          <Menu>
            <h3 onClick={() => navigate("/")}>홈</h3>
            <h3 onClick={() => navigate("/select")}>지역별 조회</h3>
            <h3 onClick={() => navigate("/random")}>랜덤 추천</h3>
            {getToken !== null ? (
              <>
                <h3 onClick={() => navigate("/mypage")}>마이페이지</h3>
                <h3 onClick={() => navigate("/request/post")}>
                  장소 등록 요청
                </h3>
              </>
            ) : null}
            <br />
            { role === "ADMIN" ? (
              <>
                <h3 onClick={() => navigate("/request/list")}>* 요청 목록 *</h3>
                <h3 onClick={() => navigate("/post")}>* 게시글 추가 *</h3>
              </>
            ) : null}
            <div>
              {getToken === null ? (
                <h3 onClick={() => navigate("/login")}>로그인 ＞</h3>
              ) : (
                <h3
                  onClick={() => {
                    logout();
                    setModal(!modal);
                  }}
                >
                  로그아웃 ＞
                </h3>
              )}
            </div>
          </Menu>
        </MenuContainer>
      ) : null}
      <ReviseMap searchWords={searchWords}/>
    </StHeader>
  );
};

export default ReviseHeader;

const StHeader = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
  z-index: 999;
  position: fixed;
  top: 0;
  font-family: bold;
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
  /* & h2 {
    color: white;
    background-image: url(${dolphin});
    background-repeat: no-repeat;
  } */

  & div {
    top: 10px;
    &:hover {
      cursor: pointer;
    }
  }

  & img {
    margin-top: 5px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Bell = styled.img`
  width: 42px;
  height: 42px;
  margin: auto 0;
  margin-left: 13px;
  position: relative;
  top: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const MenuContainer = styled.div`
  /* margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3); */
`;

const Menu = styled.div`
  position: absolute;
  left: 50%;
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
    /* text-decoration: underline; */
    margin: 30px auto;

    &:hover {
      cursor: pointer;
    }
  }

  & div {
    margin-top: 60px;
    color: white;
    & h2 {
      text-decoration: none;
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