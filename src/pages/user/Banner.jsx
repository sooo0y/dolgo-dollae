import React, { useState } from "react";
import styled from "styled-components";
import BannerImg from "../../assert/banner/BannerImg.png";

const Banner = () => {
  const [click, setClick] = useState(false);

  const [modal, setModal] = useState(true);

  const banner = sessionStorage.getItem("never");

  const closeHandler = () => {
    setModal(!modal);
    if (click === true) {
      sessionStorage.setItem("never", click);
    } else {
      return;
    }
  };

  return (
    <>
      {banner === null && modal === true ? (
        <St>
          <Text>
            <div>
              <label style={{ display: "flex", marginLeft: "10px" }}>
                <input
                  type="checkbox"
                  onClick={() => {
                    setClick(!click);
                  }}
                />
                <p>다음 로그인까지 보지 않기</p>
              </label>
            </div>
            <div>
              <label style={{ marginRight: "10px" }} onClick={closeHandler}>닫기</label>
            </div>
          </Text>
          <Img
            src={BannerImg}
            onClick={() =>
              window.open(
                "https://blog.naver.com/PostView.naver?blogId=wmr06102&Redirect=View&logNo=222905608839&categoryNo=13&isAfterWrite=true&isMrblogPost=false&isHappyBeanLeverage=true&contentLength=6267&isWeeklyDiaryPopupEnabled=false"
              )
            }
          />
        </St>
      ) : null}
    </>
  );
};

export default Banner;

const St = styled.div`
  position: absolute;
  max-width: 428px;
  width: 100%;
  margin-top: 145px;
  z-index: 2;
  position: fixed;

  & input {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
`;

const Img = styled.img`
  max-width: 428px;
  width: 100%;
  &:hover {
    cursor: pointer;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;

const Text = styled.div`
  display: flex;
  gap: 20px;
  background-color: black;
  line-height: 27px;
  color: white;
  justify-content: space-between;

  & label {
    float: right;
    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }
`;
