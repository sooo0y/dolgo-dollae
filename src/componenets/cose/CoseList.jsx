import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CoseDelete from "../modal/CoseDelete";
import ModalPortal from "../modal/ModalPortal";

const CoseList = ({ cose }) => {
  const [modalOn, setModalOn] = useState(false);
  const navigate = useNavigate();

  const deleteModal = () => {
    setModalOn(true);
  };

  const handleModal = () => {
    setModalOn(false);
  };

  return (
    <>
      <ListBox>
        <ListDiv onClick={() => navigate("/cose/detail/" + cose.id)}>
          <ListP>{cose.name}</ListP>
        </ListDiv>
        <DeleteDiv>
          <DelP onClick={deleteModal}>삭제</DelP>
        </DeleteDiv>
      </ListBox>
      <ModalPortal>
        {modalOn && <CoseDelete onClose={handleModal} cose={cose} />}
      </ModalPortal>
    </>
  );
};

export default CoseList;

const ListBox = styled.div`
  width: 85%;
  height: 35px;
  background-color: #eef6fa;
  border-radius: 20px;
  margin: 25px auto;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: center;
  height: 3.5rem;
  padding-left: 20px;
  padding-right: 20px;
`;

const ListDiv = styled.div`
  width: 80%;
`;

const ListP = styled.p`
  font-size: 19px;
  cursor: pointer;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteDiv = styled.div`
  background-color: #ffaeae;
  color: white;
  border-radius: 5px;
  display: flex;
  width: 45px;
  height: 25px;
  justify-content: center;
  padding-top: 7px;
`;

const DelP = styled.p`
  font-size: 18px;
  cursor: pointer;
`;
