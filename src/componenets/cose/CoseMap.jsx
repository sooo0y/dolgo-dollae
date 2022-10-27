import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Map,
  Polyline,
  CustomOverlayMap,
  MapMarker,
} from "react-kakao-maps-sdk";
import styled from "styled-components";
import { instance } from "../../shared/Api";
import CoseMark from "./CoseMark";
import { useMemo } from "react";
import CoseDetail from "./CoseDetail";
import CoseModal from "./CoseModal";
import Header from "../header/Header";
const { kakao } = window;

const CoseMap = () => {
  const mapRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const [cose, setCose] = useState([]);
  const [name, setName] = useState([]);
  const fetch = async () => {
    const response = await instance.get(`/api/auth/course/${id}`);
    setCose(response?.data.data);
    setName(response?.data.name);
  };
  useEffect(() => {
    fetch();
  }, []);
  const initialization = (e) => {
    sessionStorage.removeItem("TITLE_NAME");
  };
  // select 페이지로 돌아올 시 자동으로 필터 초기화
  useEffect(() => {
    initialization();
  }, []);

  const addCose = () => {
    navigate("/cose/add");
  };

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    cose?.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.mapY, point.mapX));
    });
    return bounds;
  }, [cose]);

  const refresh = () => {
    const map = mapRef.current;
    if (map) map.setBounds(bounds);
  };

  useEffect(() => {
    refresh();
  }, [cose]);

  return (
    <>
      <CoseBox>
        <Header />
        {/* <CalculatePolylineDistanceStyle /> */}
        <NameDiv>
          <NameP>{name}</NameP>
        </NameDiv>
        <MapDiv>
          <Map // 지도를 표시할 Container
            id={`map`}
            center={{
              // 지도의 중심좌표
              lat: 37.498004414546934,
              lng: 127.02770621963765,
            }}
            style={{
              // 지도의 크기
              width: "80%",
              height: "300px",
              margin: "auto",
            }}
            level={5} // 지도의 확대 레벨
            ref={mapRef}
          >
            <CourseDetailBox>
            {cose.map((coses, index) => {
              return (
                <CoseDetail
                  cose={coses}
                  index={index}
                  key={index}
                  length={cose.length}
                />
              );
            })}
            </CourseDetailBox>
            {cose?.map((path, index) => {
              return (
                <CoseMark
                  path={path}
                  key={index}
                  index={index}
                  length={cose.length}
                />
              );
            })}
            <Polyline
              path={[
                cose?.map((path) => ({
                  lat: path?.mapY,
                  lng: path?.mapX,
                })),
              ]}
              strokeWeight={4} // 선의 두께입니다
              strokeColor={"#db4040"} // 선의 색깔입니다
              strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
              endArrow={true}
            />
            <div></div>
          </Map>
        </MapDiv>
        <ButtonDiv>
          <ReviseP onClick={() => navigate("/cose/revise/" + id)}>
            수정하기
          </ReviseP>
          <BackP onClick={() => navigate("/cose")}>뒤로가기</BackP>
        </ButtonDiv>
      </CoseBox>
    </>
  );
};

export default CoseMap;

const CoseBox = styled.div`
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
  font-family: bold;
`;

const NameDiv = styled.div`
  width: 80%;
  margin: auto;
  padding-top: 11rem;
  color: #ffaeae;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NameP = styled.p`
  font-size: 2.3rem;
  margin-bottom: 2rem;
  text-align: center;
`;
const ButtonDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 50px;
`;
const BackP = styled.p`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #abd4e2;
  cursor: pointer;
  border: 3px solid #abd4e2;
  padding: 0.8rem;
  border-radius: 15px;
  text-align: center;
  &:hover {
    background-color: #abd4e2;
    color: #fff;
  }
`;
const ReviseP = styled.p`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 2rem;
  background-color: #ffaeae;
  color: white;
  cursor: pointer;
  border: 2px solid #ffaeae;
  padding: 0.8rem;
  border-radius: 15px;
  margin-right: 1rem;
  text-align: center;
  &:hover {
    background-color: #ffaeae;
    color: #fff;
  }
`;
const MapDiv = styled.div`
  width: 100%;
  margin: auto;
`;
const CourseDetailBox = styled.div`
  margin-top: 35px;
`;