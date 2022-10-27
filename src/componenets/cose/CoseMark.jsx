import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { MapMarker, useMap} from "react-kakao-maps-sdk";
import CoseModal from './CoseModal';


const CoseMark = ({path, index, length}) => {
  const MARKER_WIDTH = 50 // 기본, 클릭 마커의 너비
  const MARKER_HEIGHT = 45 // 기본, 클릭 마커의 높이
  const OFFSET_X = 15 // 기본, 클릭 마커의 기준 X좌표
  const OFFSET_Y = MARKER_HEIGHT // 기본, 클릭 마커의 기준 Y좌표
  console.log(length)
  const startImage = 
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png"
  const endImage = 
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png"

  const map = useMap()
  const scrollRef = useRef();
  const [isOpen, setIsOpen] = useState(false)

  //모달창 열렸을 때 스크롤 맨 아래로
  // useEffect(() => {
  //   window.scrollTo({ top: 3000, behavior: "smooth" });
  // }, [isOpen])

  const close = () => {
    setIsOpen(false)
  }

  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap()
    const [isVisible, setIsVisible] = useState(false)
    return (
      <>
        {/* 코스 시작점 */}
        {index === 0
        ? (<MapMarker
            position={position} // 마커를 표시할 위치
            onClick={(marker) => {map.panTo(marker.getPosition());setIsOpen(true)}}
            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)}
            clickable={true}
            image={{
              src: startImage,
              size: {
                width: MARKER_WIDTH,
                height: MARKER_HEIGHT,
              },
              options: {
                offset: {
                  x: OFFSET_X,
                  y: OFFSET_Y,
                },
              },
            }}
          >
            {isVisible && content}
          </MapMarker>)
        :(index+1 === length)
        //코스 마지막 점
        ?( <MapMarker
          position={position} // 마커를 표시할 위치
          onClick={(marker) => {map.panTo(marker.getPosition());setIsOpen(true)}}
          onMouseOver={() => setIsVisible(true)}
          onMouseOut={() => setIsVisible(false)}
          clickable={true}
          image={{
            src: endImage,
            size: {
              width: MARKER_WIDTH,
              height: MARKER_HEIGHT,
            },
            options: {
              offset: {
                x: OFFSET_X,
                y: OFFSET_Y,
              },
            },
          }}
        >
          {isVisible && content}
        </MapMarker>)
        //코스 중간
        :(<MapMarker
          position={position} // 마커를 표시할 위치
          onClick={(marker) => {map.panTo(marker.getPosition());setIsOpen(true)}}
          onMouseOver={() => setIsVisible(true)}
          onMouseOut={() => setIsVisible(false)}
          clickable={true}
          >
          {isVisible && content}
           </MapMarker>)
        }

      </>
    )
  }

  return (
    <>
      <EventMarkerContainer
          key={index}
          position={{
              lat: path.mapY,
              lng: path.mapX,
          }}
          zIndex={1}
          content={path.title}
          onClick={(marker) => {map.panTo(marker.getPosition());setIsOpen(true)}}
          >
      </EventMarkerContainer>
      <div ref={scrollRef}/>
      {isOpen && (
        <CoseModal pos={path} close={close}/> 
      )} 
    </>
  )
}

export default CoseMark
