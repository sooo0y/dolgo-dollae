import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../../header/Header";
import Maps from "../../../maps/Maps";

const MapLike = () => {
  const [modal, setModal] = useState(false);
  const [aniState, setAniState] = useState(false);

  return (
    <StMapLike>
      <Header />
      <MapOpen>
        <Maps modal={modal} aniState={aniState} />
      </MapOpen>
    </StMapLike>
  );
};

export default MapLike;

const StMapLike = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;

const MapOpen = styled.div`
  padding-top: 150px;
`;
