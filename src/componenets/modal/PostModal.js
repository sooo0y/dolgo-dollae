import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../shared/Api";
import Swal from "sweetalert2";

const PostModal = ({ modal, setModal, data }) => {
  const navigate = useNavigate();
  return (
    <Background>
      <Content>
        <PageDel>
          <p>정말 삭제하시겠습니까?</p>
          <Buttons>
            <button
            // 삭제 버튼을 눌렀을 때 서버로 해당 place_id 전송
              onClick={async () => {
                try {
                  const res = await instance.delete(
                    `/api/auth/place/${data.place_id}`
                  );
                  Swal.fire({
                    text: "삭제되었습니다.",
                    icon: "success",
                  });
                  setModal(false);
                } catch {
                  Swal.fire({
                    text: "존재하는 여행지가 아닙니다.",
                    icon: "error",
                  });
                  setModal(false);
                }
              }}
            >
              삭제
            </button>
            <button
              style={{
                backgroundColor: "white",
                color: "#abd4e2",
                border: "3px solid #abd4e2",
              }}
              onClick={() => {
                setModal(false);
              }}
            >
              취소
            </button>
          </Buttons>
        </PageDel>
      </Content>
    </Background>
  );
};

export default PostModal;

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
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
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
const Buttons = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: center;
  margin-top: 25px;
  gap: 20px;
  width: 80%;
  height: 45px;

  & button {
    width: 40%;
  }
`;
