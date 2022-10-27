import React, { useRef, useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import basicImg from "../../assert/image/basic.png";
import ModalPortal from "../modal/ModalPortal";
import CoseModal from "./CoseModal";
import Swal from "sweetalert2";

const CoseDetail = ({ cose, index, length }) => {
  const scrollRef = useRef();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => {
    setIsOpen(false);
  };

  // ACCESS_TOKEN이 없으면 마이페이지 접근 불가
  const getToken = sessionStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    if (getToken === null) {
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        icon: "warning",
      });
      navigate("/login");
    }
  }, [getToken]);

  //모달창 열렸을 때 스크롤 맨 아래로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <CoseBox>
        <TitleDiv key={index}>
          {index + 1 === length ? (
            <CoseBox onClick={() => setIsOpen(true)}>
              <LastCoseDiv>
                <Title>{cose.title}</Title>
              </LastCoseDiv>
            </CoseBox>
          ) : (
            <CoseBox>
              <CoseDiv onClick={() => setIsOpen(true)}>
                <Title>{cose.title}</Title>
              </CoseDiv>
              <p
                style={{
                  paddingTop: "0.8rem",
                  paddingBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                ▼
              </p>
            </CoseBox>
          )}
        </TitleDiv>
      </CoseBox>
      <div ref={scrollRef} />
      <ModalPortal>
        {isOpen && <CoseModal pos={cose} close={close} />}
      </ModalPortal>
    </>
  );
};

export default CoseDetail;

const CoseBox = styled.div`
  width: 100%;
  max-width: 428px;
  font-family: bold;
`;

const TitleDiv = styled.div`
  width: 80%;
  display: flex;
  margin: 5px auto;
`;
const CoseDiv = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: -0.2rem;
  cursor: pointer;
  background-color: #eef6fa;
  &:hover {
    transform: scale(1.05);
    transition-duration: 0.1s;
  }
`;

const LastCoseDiv = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: -0.2rem;
  cursor: pointer;
  background-color: #eef6fa;
  &:hover {
    transform: scale(1.05);
    transition-duration: 0.1s;
  }
`;

const Title = styled.p`
  display: block;
  width: 90%;
  text-align: center;
  white-space: nowrap;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
