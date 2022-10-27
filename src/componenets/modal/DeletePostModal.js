import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../shared/Api";
import Swal from "sweetalert2";

const DeletePostModal = ({ deleteModal, setDeleteModal }) => {
  const place_id = useParams();
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await instance.delete(`/api/auth/place/${place_id.id}`);
      navigate(-1);
      Swal.fire({
        text: "정상적으로 삭제되었습니다.",
        icon: "success",
      });
      setDeleteModal(false);
    } catch {
      Swal.fire({
        text: "잠시 후 다시 시도해주세요.",
        icon: "error",
      });
      setDeleteModal(false);
    }
  };

  return (
    <Background>
      <Content>
        <PageDel>
          <p>정말 삭제하시겠습니까?</p>
          <Button>
            <DeleteButton onClick={deleteHandler}>삭제</DeleteButton>
            <CancelButton onClick={() => setDeleteModal(!deleteModal)}>취소</CancelButton>
          </Button>
        </PageDel>
      </Content>
    </Background>
  );
};

export default DeletePostModal;

//아래는 styled-components를 통한 스타일링
const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  z-index: 10;
  font-family: bold;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  /* margin-top: 70px; */
  position: relative;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.6);
`;

const PageDel = styled.div`
  font-size: 17px;
  width: 296px;
  height: 141px;
  border: 3px solid #abd4e2;
  background-color: rgb(255, 255, 255);
  margin: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  border-radius: 20px;
`;

const Button = styled.div`
  width: 160px;
  height: 35px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: center;
  margin-top: 20px;
`;

const DeleteButton = styled.button`
  font-weight: 600;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  align-items: center;
  background: white;
  border: 3px solid #abd4e2;
  color: #abd4e2;
  cursor: pointer;
  border-radius: 5px;
`;

const CancelButton = styled.button`
  font-weight: 600;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  align-items: center;
  background: #abd4e2;
  border: 1px solid #abd4e2;
  color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 5px;
`;
