import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../componenets/header/Header";
import Info from "../../componenets/mypage/mypage/Info";
import LikeList from "../../componenets/mypage/mypage/likeList/LikeList";
import MyRequestList from "../../componenets/mypage/mypage/request/MyRequestList";
import ReviewList from "../../componenets/mypage/mypage/review/ReviewList";
import Swal from "sweetalert2";

const MyPage = () => {
  const navigate = useNavigate();

  // ACCESS_TOKEN이 없으면 마이페이지 접근 불가
  const getToken = sessionStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    if(getToken === null){
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        icon: "warning",
      });
      navigate('/login')
    }
  },[getToken])

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <StMyPage>
      <Header />
      <Info />
      <LikeList />
      <ReviewList />
      <MyRequestList />
    </StMyPage>
  );
};

export default MyPage;

const StMyPage = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;
