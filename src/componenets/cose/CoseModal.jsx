import React from "react";
import { useNavigate } from "react-router-dom";
import dolphin from "../../assert/detail/dolphin_test.png";
import styled from "styled-components";
import { useRef } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import ThemeList from "../theme/ThemeList";
import basicImg from "../../assert/image/basic.png";

const CoseModal = ({ pos, close, setIsOpen }) => {
  const modalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (!modalRef.current.contains(event.target)) {
      close();
    }
  };

  return (
    <StModal>
      <Background>
        <DescDiv >
          <Div ref={modalRef}>
          <ImageBox>
            {pos.image === null ? (
              <NoneImg alt="mapsImage" src={basicImg} />
            ) : (
              <Img alt="mapsImage" src={pos.image} />
            )}
          </ImageBox>
          <TotalDiv>
            <div style={{ padding: "5px", color: "#000" }}>
              <TitleDIv>
                <TitleB>{pos.title}</TitleB>
              </TitleDIv>
              <StarDiv>
                <TemaP>
                  <ThemeList post={pos} />
                </TemaP>
                <FaStar style={{ color: "#fcc419" }} />
                <StarP>{pos.star}</StarP>
              </StarDiv>
              <p>{pos.adress}</p>
              <MapBut onClick={() => navigate("/detail/" + pos.id)}>
                상세보기
              </MapBut>
            </div>
          </TotalDiv>
          </Div>
        </DescDiv>
      </Background>
    </StModal>
  );
};

export default CoseModal;

const StModal = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
  font-family: bold;
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

const DescDiv = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const Div = styled.div`
  max-width: 330px;
  width: 90%;
  height: 520px;
  background-color: rgb(255, 255, 255);
  margin: auto;
  flex-direction: column;
  display: flex;
  z-index: 99;
  border-radius: 10px;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  scrollbar-width: none;
`;

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  height: 300px;
`;

const NoneImg = styled.img`
  width: 100%;
  height: 300px;
`;

const TotalDiv = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px;
`;

const TitleDIv = styled.div`
  width: 90%;
  display: flex;
  margin-bottom: 0.3rem;
  margin-top: 0.8rem;
`;

const TitleB = styled.p`
  width: 100%;
  font-weight: 700;
  font-size: 1.25rem;
  color: #79b9d3;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TemaP = styled.p`
  color: #8f8f8f;
  font-size: 0.9rem;
  line-height: 1rem;
  margin-right: 0.5rem;
`;

const StarDiv = styled.div`
  display: flex;
  margin-bottom: 0.7rem;
  align-items: center;
`;

const StarP = styled.p`
  margin-top: 0.2rem;
  line-height: 1.2rem;
  margin-left: 0.2rem;
  font-weight: 600;
`;

const DeleteDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: end;
`;

const DeleteImg = styled.img``;

const MapBut = styled.button`
  cursor: pointer;
  color: white;
  background-color: #abd4e2;
  border: 0px;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.5rem;
  /* margin-right:1rem; */
  width: 70%;
  margin-top: 1.2rem;
  font-family: bold;
`;
