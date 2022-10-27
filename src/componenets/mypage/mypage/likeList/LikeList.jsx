import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LikeList = () => {
  const navigate = useNavigate();

  return (
    <StLikeList>
      <h2>찜한 장소</h2>
      <div style={{ display: "flex", width: "80%", margin: "0 auto" }}>
        <button onClick={() => navigate("/mypage/like/map")}>
          <p>
            <b style={{ fontSize: "20px" }}>지도</b>에서 <br />
            확인하기
          </p>
        </button>
        <button onClick={() => navigate("/mypage/like/select")}>
          <p>
            <b style={{ fontSize: "20px" }}>지역별</b>로 <br />
            확인하기
          </p>
        </button>
      </div>
    </StLikeList>
  );
};

export default LikeList;

const StLikeList = styled.div`
  margin: 40px auto;

  & button {
    width: 40%;
    height: 80px;
    margin: 30px auto;
    display: flex;
    background-color: #ffc0c0;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;

    &:hover {
      cursor: pointer;
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
    }
  }

  & p {
    margin: 10px auto;
    font-weight: bold;
    font-size: 20px;
    vertical-align: middle;
  }

  & h2 {
    color: #bfb8b8;
    margin-left: 10px;
  }
`;
