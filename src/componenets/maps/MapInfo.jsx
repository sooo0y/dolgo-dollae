import React from 'react'
import { useState } from 'react';
import { MapMarker, useMap, } from "react-kakao-maps-sdk";
import styled from "styled-components";
import MapModal from './MapModal';

const MapInfo = ({pos}) => {
  const map = useMap()
  const [isOpen, setIsOpen] = useState(false)
  const close = () => {
    setIsOpen(false)
  }
  
  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap()
    const [isVisible, setIsVisible] = useState(false)
    
    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        onClick={(marker) => {map.panTo(marker.getPosition());setIsOpen(true)}}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
        clickable={true}
      >
        {isVisible && content}
      </MapMarker>
    )
  }
  return (
    <>    
      <EventMarkerContainer
        key={`${pos.lat}-${pos.lng}`}
        position={{
          lat: pos.mapY,
          lng: pos.mapX,
        }}
        content={pos.title}
        onClick={(marker) => {map.panTo(marker.getPosition());setIsOpen(true)}}
      >
      </EventMarkerContainer>  
      {isOpen && (
        <MapModal pos={pos} close={close}/> 
      )} 
    </>
  )
}

export default MapInfo

