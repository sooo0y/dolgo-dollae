import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../../componenets/header/Header";
import Category from "../../componenets/select/Select";

const Select = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  return (
    <StSelect>
      <Header />
      <Category />
    </StSelect>
  );
};

export default Select;

const StSelect = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;
