import React, { useState, useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { instance } from "../../shared/Api";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import basicImg from "../../assert/image/basic.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WorldCupDetail = ({ detail, modalHandler }) => {
  const [detailData, setDetailData] = useState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplayspeed: 10000,
    autoplay: true,
    pauseOnHover: true,
    arrows: false,
    draggable: true,
  };

  const getData = async () => {
    const res = await instance.get(`/api/place/${detail}`);
    setDetailData(res.data);
  };

  const newText = detailData?.content?.replace(/(<([^>]+)>)/gi, "\n"); //태그 제거
  const tmp = newText?.replace(/&nbsp;/gi, " "); //공백 제거
  const tmp2 = tmp?.replace(/&lt;/gi, ""); //부등호(<) 제거
  const tmp3 = tmp2?.replace(/&gt;/gi, ""); //부등호(>) 제거

  useEffect(() => {
    getData();
  }, []);

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
    <St>
      <Background>
        <Content>
          <PageDel ref={modalRef}>
            <div>
              <Data>
                {detailData && detailData?.imageUrl.length === 0 ? (
                  <>
                    <BasicImg alt="detailImg" src={basicImg} />
                    <Title1 style={{ paddingTop: "35px" }}>
                      {detailData?.title}
                    </Title1>
                  </>
                ) : (
                  <>
                    <Slider {...settings}>
                      {detailData &&
                        detailData?.imageUrl.map((image, index) => (
                          <Img alt="detailImg" key={index} src={image} />
                        ))}
                    </Slider>
                    <div style={{ marginTop: "50px" }}>
                      {/* <ThemeList post={detailData} /> */}
                      <Title1>{detailData?.title}</Title1>
                    </div>
                  </>
                )}
              </Data>
              <Location>
                <div style={{ justifyContent: "center", marginBottom: "30px" }}>
                  <Title>위치</Title>
                  <p
                    style={{
                      fontSize: "19px",
                      marginTop: "20px",
                      marginBottom: "-10px",
                      width: "90%",
                    }}
                  >
                    {detailData?.address}
                  </p>
                </div>
                <MapDiv>
                  <Map
                    center={{
                      lat: detailData?.mapY || "",
                      lng: detailData?.mapX || "",
                    }}
                    level={8}
                    style={{
                      width: "100%",
                      height: "30vh",
                      borderRadius: "20px",
                      margin: "0 auto",
                    }}
                  >
                    <MapMarker
                      position={{
                        lat: detailData?.mapY || "",
                        lng: detailData?.mapX || "",
                      }}
                    />
                  </Map>
                </MapDiv>
              </Location>
              <Des>
                <Title>설명</Title>
                <DesContent>{tmp3}</DesContent>
              </Des>
              <SearchDate>
                <Title style={{ marginTop: "2rem" }}>더 알아보기</Title>
                <SearchDiv>
                  <ALink
                    target="_blank"
                    rel="noreferrer"
                    href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${detailData?.title}`}
                  >
                    <ImgLink
                      alt=""
                      src="https://www.siksinhot.com/static2/images/mobile/bg_site_img01.gif"
                    />
                  </ALink>
                  <ALink
                    target="_blank"
                    rel="noreferrer"
                    href={`https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=${detailData?.title}`}
                  >
                    <ImgLink
                      alt=""
                      src="https://www.siksinhot.com/static2/images/mobile/bg_site_img02.gif"
                    />
                  </ALink>
                  <ALink
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/search?q=${detailData?.title}`}
                  >
                    <ImgLink
                      alt=""
                      src="https://www.siksinhot.com/static2/images/mobile/bg_site_img03.gif"
                    />
                  </ALink>
                </SearchDiv>
              </SearchDate>
            </div>
            <Buttons>
              <button onClick={modalHandler}>닫 기</button>
            </Buttons>
          </PageDel>
        </Content>
      </Background>
    </St>
  );
};

export default WorldCupDetail;

const St = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
  font-family: bold;
`;

const Title1 = styled.h2`
  text-align: center;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const PageDel = styled.div`
  max-width: 428px;
  width: 90%;
  height: 70%;
  background-color: rgb(255, 255, 255);
  margin: auto;
  flex-direction: column;
  display: flex;
  z-index: 99;
  border-radius: 10px;
  overflow: auto;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  ::-webkit-scrollbar {
    width: 0px;
    color: gray;
  }
`;

const Data = styled.div`
  background-color: #eef6fa;
  min-height: 450px;
  margin-top: -20px;
`;

const Title = styled.h2`
  color: #bfb8b8;
  text-align: left;
  padding-left: 10px;
  margin-bottom: 0.5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px auto;

  & button {
    width: 200px;
    height: 50px;
    background-color: #eef6fa;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Location = styled.div`
  margin: 0 auto;
  width: 90%;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;

const MapDiv = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Des = styled.div`
  padding-top: 40px;
  width: 90%;
  margin: 0 auto;
`;

const DesContent = styled.p`
  font-family: Noto Sans KR;
  padding-top: 10px;
  white-space: pre-wrap;
  line-height: 35px;
  font-size: 18px;
  text-align: left;
`;

const Img = styled.img`
  border: 1px solid rgb(238, 238, 238);
  position: relative;
  width: 90%;
  height: 300px;
  /* border-radius: 20px; */
  margin: 20px auto;
`;

const BasicImg = styled.img`
  width: 90%;
  height: 300px;
  margin: 20px auto;
  justify-content: center;
  display: flex;
  padding-top: 20px;
`;
const SearchDate = styled.div`
  padding-top: 20px;
  width: 90%;
  margin: 0 auto;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding-top: 10px;
`;

const ALink = styled.a`
  width: 6rem;
  height: 40px;
`;

const ImgLink = styled.img`
  width: 100%;
  height: 100%;
`;
