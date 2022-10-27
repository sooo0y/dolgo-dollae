import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../shared/Api";
import Swal from "sweetalert2";

const CompleteModal = ({ completeModal, setCompleteModal, data }) => {
  const navigate = useNavigate();

  // input에 입력하는 값을 onChange를 통해 state에 저장
  const [answer, setAnswer] = useState("");

  // 작성 버튼을 눌렀을 때 서버로 전송
  const completeHandler = async () => {
    const req = {
      answer: answer,
      id: data.id,
      username: data.username,
    };

    try {
      await instance.post(`/api/auth/order/state`, req);
      Swal.fire({
        text: "답변이 등록되었습니다.",
        icon: "success",
      });
      setCompleteModal(false);
      navigate("/request/list");
    } catch {
      Swal.fire({
        text: "잠시후 다시 시도해주세요.",
        icon: "error",
      });
    }
  };

  return (
    <Background>
      <Content>
        <PageDel>
          <textarea
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          />
          <Buttons>
            <button onClick={completeHandler}>작성</button>
            <button
              style={{
                backgroundColor: "white",
                color: "#abd4e2",
                border: "3px solid #abd4e2",
              }}
              onClick={() => {
                setCompleteModal(false);
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

export default CompleteModal;

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
  height: 300px;
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

  & textarea {
    height: 150px;
    width: 80%;
    background-color: #eef6fa;
    border: none;
    border-radius: 15px;
    font-family: bold;
    padding: 15px;
  }
`;
const Buttons = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: center;
  margin-top: 25px;
  width: 90%;
  height: 45px;

  & button {
    width: 45%;
  }
`;
