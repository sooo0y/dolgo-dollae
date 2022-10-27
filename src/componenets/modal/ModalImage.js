import React from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ModalImage = ({onClose, comment}) => {
  document.body.style.overflow = "hidden"

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable:true,
    arrow:false
  };

  return (
      <Background>
        <Content>
          <PageDel>
            <HeadDiv>
              <CancelP 
                onClick={() => {
                  onClose(false);
                  document.body.style.overflow = "unSet"
                }}
                >X</CancelP>
            </HeadDiv>
            <Slider {...settings}> 
                  {comment.imageList.map((image, index) => {
                    return <DetailImg key={index} alt="" src={image} />;
                  })}
            </Slider>
          </PageDel>
        </Content>
      </Background>
  );
};

export default ModalImage;

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  z-index: 10;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.6);
`;
const PageDel = styled.div`
  max-width:400px;
  width: 100%;
  height: 100%;
  max-height:428px;
  background-color: rgb(255, 255, 255);
  margin: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  border-radius:20px;
  padding-bottom:2rem;
`;

const DetailImg = styled.img`
  width: 100%;
  height:300px;
  border-radius: 20px;
  margin-top: 1rem;
  margin-bottom:1rem;
`;

const HeadDiv = styled.div`
  display:flex;
  justify-content: space-between;
  text-align: center;
  margin:1rem 1.5rem 0 1.5rem;

`
const HeadP = styled.p`
  font-size:20px;
  font-weight:700;
`
const CancelP = styled.p`
  font-size:30px;
  line-height:1.3rem;
  font-weight:700;
  cursor:pointer;
  &:hover{
    color:#abd4e2;
  }
`
