import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Info = () => {
  const navigate = useNavigate();

  // sessionStorage로부터 가져온 username과 nickname
  const username = sessionStorage.getItem("username");
  const nickname = sessionStorage.getItem("nickname");

  return (
    <StInfo>
      <Email>
        <div>
          <h2>이메일</h2>
          <button onClick={() => navigate("/mypage/change")}>
            내 정보 변경
          </button>
        </div>
        <p>{username}</p>
      </Email>
      <Nickname>
        <h2>닉네임</h2>
        <div>
          <p>{nickname}</p>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>님</p>
        </div>
      </Nickname>
    </StInfo>
  );
};

export default Info;

const StInfo = styled.div`
  max-width: 428px;
  width: 100%;
  height: 240px;
  padding-top: 130px;
  background-color: #eef6fa;

  & button {
    width: 140px;
    height: 40px;
    background-color: #abd4e2;
    color: white;
    border-radius: 15px;
    border: none;
    font-weight: 700;
    font-size: 21px;
    margin-top: 15px;

    &:hover {
      cursor: pointer;
      background-color: #ffc0c0;
      border: none;
    }
  }
`;

const Email = styled.div`
  padding: 10px 30px;
  & div {
    display: flex;
    justify-content: space-between;
  }
`;

const Nickname = styled.div`
  margin: 20px 30px;
  margin-top: 40px;
  & div {
    display: flex;
    justify-content: space-between;
  }
`;
