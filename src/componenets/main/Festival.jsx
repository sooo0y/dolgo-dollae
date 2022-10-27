import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { instance } from "../../shared/Api";

const Festival = () => {
  // Slick 구현
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  // 서버에서 받아온 축제 데이터를 state에 저장
  const [festival, setFestival] = useState();

  const getEvents = async () => {
    const res = await instance.get("/api/events");
    setFestival(res.data);
  };

  // 화면이 렌더링되면 getEvents 함수 실행
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <StFestival>
      <Title>이 달의 축제</Title>
      <FestivalList>
        <Slider {...settings}>
          {festival?.map((festival) => {
            return (
              <Card key={festival.id}>
                <img
                  alt=""
                  src={festival.imageUrl}
                  // 이미지를 클릭했을 때 축제 페이지로 이동
                  onClick={() => window.open(festival.linkUrl)}
                />
                <Text style={{ fontWeight: "bold" }}>{festival.title}</Text>
                <p>{festival.period}</p>
              </Card>
            );
          })}
        </Slider>
      </FestivalList>
    </StFestival>
  );
};

export default Festival;

const StFestival = styled.div`
  max-width: 428px;
  width: 100%;
  text-align: center;
  font-size: 37px;
  color: #79b9d3;
  height: 500px;
  padding-top: 130px;
`;

const Text = styled.p`
  display: block;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const FestivalList = styled.div`
  height: 200px;
`;

const Card = styled.div`
  margin-bottom: 0;
  img {
    max-width: 428px;
    width: 100%;
    border-radius: 30px;
    &:hover {
      cursor: pointer;
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    }
  }
  p {
    margin: 20px auto;
    font-size: 25px;
    color: #414141;
  }
`;
