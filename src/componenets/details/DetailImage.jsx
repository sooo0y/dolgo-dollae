import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation,Pagination} from 'swiper';
import styled from "styled-components";
import dolphin from "../../assert/detail/dolphin_test.png";
import basicImg from "../../assert/image/basic.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const DetailImage = ({post}) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplayspeed: 10000,
    autoplay:true,
    pauseOnHover : true,
    arrows :false,
    draggable:true,
  };

  return (
    <>
      {post?.imageUrl?.length === 0
      ?
      <NoneImg key={post.id+20} style={{border:"0px"}}alt='' src={basicImg}/>
      :  
      <Slider {...settings}> 
      {post && post?.imageUrl.map((image,index) => {
        return  <Img alt='detailImg' key={post.id+index} src={image}/>
      })}
      </Slider>
      }
    </>
  )
}

export default DetailImage
const Img = styled.img`
  border: 1px solid rgb(238, 238, 238);
  position: relative;
  width: 100%;
  height: 100%;
  /* min-width:428px; */
  min-height:300px;
  max-height:300px;
  border-radius: 20px;
  margin-bottom:20px;
  z-index:-10;
`
const NoneImg =styled.img`
  border: 1px solid rgb(238, 238, 238);
  position: relative;
  width: 100%;
  padding-top: 23px;
  padding-bottom: 23px;
`