import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../header/Header";

//랜덤이미지
import img1 from "../../assert/random/img1.jpg";
import img2 from "../../assert/random/img2.jpg";
import img3 from "../../assert/random/img3.jpg";
import img4 from "../../assert/random/img4.jpg";
import img5 from "../../assert/random/img5.jpg";
import img6 from "../../assert/random/img6.jpg";
import img7 from "../../assert/random/img7.jpg";
import img8 from "../../assert/random/img8.jpg";
import img9 from "../../assert/random/img9.jpg";
import img10 from "../../assert/random/img10.jpg";
import img11 from "../../assert/random/img11.jpg";

const Randoms = () => {
  const navigate = useNavigate();

  const backgroundArr = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ];

  const randomIndex = Math.floor(Math.random() * backgroundArr.length);
  const backgroundImg = backgroundArr[randomIndex];

  const random = (e) => {
    let timerInterval;
    Swal.fire({
      title: "지역을 선정중입니다",
      html: "잠시만 기다려주세요",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
        navigate("/rnd");
        sessionStorage.removeItem("place0");
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  };

  return (
    <>
      <BoxDiv>
        <Header />
        <Box>
          <Explanation>
            * <b style={{ textDecoration: "underline" }}>완전 랜덤</b>은{" "}
            <b style={{ color: "red" }}>전국</b>의 여행지를 기준으로,
            <br /> *{" "}
            <b style={{ textDecoration: "underline" }}>
              지역 선택 후 랜덤
            </b>은 <b style={{ color: "red" }}>선택한 지역</b>의 여행지를 <br />
            &nbsp;&nbsp;기준으로 추천합니다.
          </Explanation>
          <ImgBox>
            <Img alt="logo" src={backgroundImg} />
          </ImgBox>
          <ButDiv>
            <button onClick={() => random()}>완전 랜덤</button>
            <button onClick={() => navigate("/rndlocation")}>
              지역 선택 후 랜덤
            </button>
          </ButDiv>
        </Box>
      </BoxDiv>
    </>
  );
};

export default Randoms;
const BoxDiv = styled.div`
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
`;

const Box = styled.div`
  padding-top: 8rem;
`;

const Explanation = styled.div`
  background-color: #eef6fa;
  font-size: 16px;
  line-height: 28px;
  width: 320px;
  margin: 30px auto;
  padding: 15px;
`;

const ImgBox = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;

const Img = styled.img`
  min-height: 317px;
  max-height: 317px;
  display: flex;
  width: 90%;
  margin: 30px auto;
`;

const ButDiv = styled.div`
  width: 90%;
  margin: 50px auto;

  & button {
    background-color: #abd4e2;
    color: white;
    border: none;
    border-radius: 12px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    display: block;
    margin: 20px auto;

    &:hover {
      background-color: #ffaeae;
    }
  }
`;
