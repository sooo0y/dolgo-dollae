import React from "react";
import styled from "styled-components";
import Header from "../../componenets/header/Header";
import Nickname from "../../componenets/mypage/change/Nickname";
import Password from "../../componenets/mypage/change/Password";
import Withdrawal from "../../componenets/mypage/change/Withdrawal";

function MyPageChange() {
  return (
    <St>
      <Header />
      <StChange>
        <Nickname />
        <Password />
        <Withdrawal />
      </StChange>
    </St>
  );
}

export default MyPageChange;

const St = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;

const StChange = styled.div`
  background-color: #eef6fa;
`;
