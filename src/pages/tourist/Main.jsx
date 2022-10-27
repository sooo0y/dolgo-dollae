import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../componenets/header/Header";
import Festival from "../../componenets/main/Festival";
import TopTen from "../../componenets/main/TopTen";
import Banner from "../user/Banner";

const Main = () => {
  return (
    <StMain>
      <Header />
      <Banner />
      <Festival />
      <TopTen />
    </StMain>
  );
};

export default Main;

const StMain = styled.div`
  display: block;
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;
