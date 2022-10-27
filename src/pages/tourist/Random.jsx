import Header from "../../componenets/header/Header";
import Randoms from "../../componenets/random/Randoms";
import styled from "styled-components";

const Random = () => {
  return (
    <StRandom>
      <Header />
      <Randoms />
    </StRandom>
  );
};

export default Random;

const StRandom = styled.div`
  margin: 0 auto;
  max-width: 428px;
  width: 100%;
`;
