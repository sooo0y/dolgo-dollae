import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import basicImg from "../../assert/image/basic.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { instance } from "../../shared/Api";

const TopTen = () => {
  const navigate = useNavigate();

  // slick 구현
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    arrows: false
  };

  // 서버에서 받아온 테마별 데이터를 각 테마 state에 저장
  const [foodList, setFoodList] = useState();
  const [tourList, setTourList] = useState();
  const [activityList, setActivityList] = useState();
  const [museumList, setMuseumList] = useState();

  const fetchPost = async () => {
    const response = await instance.get("/api/place/rank");

    setFoodList(response.data.tourList);
    setTourList(response.data.museumList);
    setActivityList(response.data.activityList);
    setMuseumList(response.data.foodList);
  };

  // 화면이 렌더링되면 fetchPost 함수 실행
  useEffect(() => {
    fetchPost();
  }, []);

  if (foodList === undefined) {
    return;
  }

  return (
    <StTopTen>
      <Title>TOP 10</Title>
      <Theme style={{ marginTop: "-30px" }}>
        <h4>관광</h4>
        <Slider {...settings}>
          {foodList.map((item) => (
            <Card key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              {item.image == null ? (
                <>
                  <BasicImg src={basicImg} />
                  <BasicName>
                    <ItemTitle style={{display: "block"}} >{item.title}</ItemTitle>
                    <div>
                    <FaStar
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      /> {item.star}
                    </div>
                  </BasicName>
                </>
              ) : (
                <>
                  <ImgShadow>
                    <ImgBox>
                      <Img src={item.image} />
                    </ImgBox>
                  </ImgShadow>
                  <Name>
                    <ItemTitle style={{ display: "block" }} >{item.title}</ItemTitle>
                    <div>
                    <FaStar
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      /> {item.star}
                    </div>
                  </Name>
                </>
              )}
            </Card>
          ))}
        </Slider>
      </Theme>
      <Theme>
        <h4>관람</h4>
        <Slider {...settings}>
          {tourList.map((item) => (
            <Card key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              {item.image == null ? (
                <>
                  <BasicImg src={basicImg} />
                  <BasicName>
                    <ItemTitle style={{ display: "block" }} >{item.title}</ItemTitle>
                    <div>
                      <FaStar
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      /> {item.star}
                    </div>
                  </BasicName>
                </>
              ) : (
                <>
                  <ImgShadow>
                    <ImgBox>
                      <Img src={item.image} />
                    </ImgBox>
                  </ImgShadow>
                  <Name>
                    <ItemTitle style={{ display: "block" }} >{item.title}</ItemTitle>
                    <div>
                    <FaStar
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      /> {item.star}
                    </div>
                  </Name>
                </>
              )}
            </Card>
          ))}
        </Slider>
      </Theme>
      <Theme>
        <h4>액티비티</h4>
        <Slider {...settings}>
          {activityList.map((item) => (
            <Card key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              {item.image == null ? (
                <>
                  <BasicImg src={basicImg} />
                  <BasicName>
                    <ItemTitle style={{ display: "block" }} >{item.title}</ItemTitle>
                    <div>
                    <FaStar
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      /> {item.star}
                    </div>
                  </BasicName>
                </>
              ) : (
                <>
                  <ImgShadow>
                    <ImgBox>
                      <Img src={item.image} />
                    </ImgBox>
                  </ImgShadow>
                  <Name>
                    <ItemTitle style={{ display: "block" }} >{item.title}</ItemTitle>
                    <div>
                    <FaStar
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      /> {item.star}
                    </div>
                  </Name>
                </>
              )}
            </Card>
          ))}
        </Slider>
      </Theme>
      <Theme>
        <h4>식도락</h4>
        <Slider {...settings}>
          {museumList.map((item) => (
            <Card key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              {item.image == null ? (
                <>
                  <BasicImg src={basicImg} />
                  <BasicName>
                    <ItemTitle style={{ display: "block" }} >{item.title}</ItemTitle>
                    <div>
                    <FaStar
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      /> {item.star}
                    </div>
                  </BasicName>
                </>
              ) : (
                <>
                  <ImgShadow>
                    <ImgBox>
                      <Img src={item.image} />
                    </ImgBox>
                  </ImgShadow>
                  <Name>
                    <ItemTitle style={{ display: "block" }}>{item.title}</ItemTitle>
                    <div>
                    <FaStar
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      />{item.star}
                    </div>
                  </Name>
                </>
              )}
            </Card>
          ))}
        </Slider>
      </Theme>
    </StTopTen>
  );
};

export default TopTen;

const StTopTen = styled.div`
  max-width: 428px;
  width: 100%;
  text-align: center;
  color: #79b9d3;
  margin: 0 auto;
  margin-top: 120px;

  & h4 {
    font-size: 35px;
    color: #ffaeae;
    margin: -10px auto;
  }
`;

const Title = styled.div`
  color: white;
  background: #c4e0ec;
  border-radius: 30px;
  width: 236px;
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  line-height: 45px;
  margin: 35px auto;
  padding-top: 5px;
`;

const Theme = styled.div`
  text-align: center;
  line-height: 100px;
  font-size: 15px;
  margin-top: 20px;
`;

const Name = styled.div`
  display: flex;
  position: relative;
  top: -55px;
  text-align: initial;
  color: #ffffff;
  font-size: 23px;
  line-height: 33px;
  margin-block-end: 0;
  margin-block-start: 0;
  gap: 20px;
  padding: 0 30px;

  & div {
    display: flex;
    gap: 5px;
  }
`;

const BasicName = styled.div`
  display: flex;
  position: relative;
  top: -55px;
  text-align: initial;
  color: #414141;
  font-size: 23px;
  font-weight: bold;
  line-height: 33px;
  margin-block-end: 0;
  margin-block-start: 0;
  gap: 20px;
  padding: 0 30px;

  & div {
    display: flex;
    gap: 5px;
  }
`;

const Card = styled.div`
  text-align: center;
`;

const BasicImg = styled.img`
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;

const ImgShadow = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 280px;
  border-radius: 20px;
  /* z-index: 3; */
  &:hover {
    cursor: pointer;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  }
`;

const ImgBox = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 280px;
  border-radius: 20px;
  box-shadow: inset 0 -40px 100px #2e2e2e;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  position: relative;
  width: 100%;
  max-width: 428px;
  height: 280px;
  z-index: -2;
  border-radius: 20px;
`;

const ItemTitle = styled.div`
  width: 280px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;