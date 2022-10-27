import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Map,MarkerClusterer } from "react-kakao-maps-sdk";
import { instance } from '../../shared/Api';
import MapInfo from './MapInfo';
import styled, { keyframes } from "styled-components";


const Maps = ({aniState}) => {
const [positions, setPositions] = useState([]);

const fetch = async () => {
  const response = await instance.get(`/api/auth/place/mypage?areaCode=0&sigunguCode=0`); 
  setPositions(response.data)
}
useEffect(() => {
  fetch()
}, []);
  
return (
  <>
      <MapDiv aniState={aniState}>
        <MapBox>
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 36.2683,
            lng: 127.6358,
          }}
          style={{
            // 지도의 크기
            maxWidth:"428px",
            width: "100%",
            height: "450px",
            margin:"0 auto"
          }}
          level={13} // 지도의 확대 레벨
        >
          <MarkerClusterer
            averageCenter={false} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={12} // 클러스터 할 최소 지도 레벨
          >
              {positions.map((pos,index) => {
                return <MapInfo pos={pos} key={index}/>
              })}
          </MarkerClusterer>
        </Map>
        </MapBox>
      </MapDiv>
    </>
  )
}

export default Maps

const slideIn = keyframes`
  from {
    transform: translateY(-5%);
  }
  to {
    transform: translateY(0%);
  }
`;

const slideOut = keyframes`
  from {
      transform: translateY(0%);
  }
  to {
      transform: translateY(5%);
  }
`;

const MapDiv = styled.div`
  max-width:428px;
  width:95.5%;
  margin:0 auto;
  animation: ${(props) => (props.aniState ? slideOut : slideIn)} 0.4s;
`
const MapBox = styled.div`
  max-width:428px;
  width:100%;
  padding-bottom:2.5rem;
`