import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../../shared/Api";
import Swal from "sweetalert2";

const Nickname = () => {
  const navigate = useNavigate();

  // sessionStorage로부터 가져온 "nickname"
  const nickname = sessionStorage.getItem("nickname");

  // input에 입력한 값을 onChange를 통해 state에 저장
  const [changeNickname, setChangeNickname] = useState({ nickname: "" });

  // 변경하기 버튼을 클릭했을 때 서버로 변경값 전송
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // input이 비어있으면 alert
    if (changeNickname.nickname === "") {
      Swal.fire({
        text: "변경할 닉네임을 입력해주세요.",
        icon: "warning",
      });
      e.preventDefault();
    } else {
      // 변경여부 재확인
      Swal.fire({
        title: `「${changeNickname.nickname}」`,
        text: "(으)로 변경하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        // closeOnConfirm: false,
        // closeOnCancel: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log("예");
          // 동의하면 서버로 값 전송, storage에 저장, mypage로 이동, 변경값 alert
          await instance.put("/api/auth/member/updatenickname", changeNickname);
          sessionStorage.setItem("nickname", changeNickname.nickname);
          navigate("/mypage");
          Swal.fire({
            title: `「${changeNickname.nickname}」`,
            text: "(으)로 변경되었습니다.",
            icon: "success",
          });
        } else {
          // 동의하지 않을 시, alert
          Swal.fire({
            text: "닉네임 변경이 취소되었습니다.",
            icon: "success",
          });
        }
      });
    }
  };

  return (
    <StNickname>
      <h2>닉네임 변경</h2>
      <div>
        <input
          placeholder={nickname}
          name="nickname"
          value={changeNickname.nickname}
          onChange={(e) => setChangeNickname({ nickname: e.target.value })}
        />
        <p>님</p>
      </div>
      <button onClick={onSubmitHandler}>변경하기</button>
    </StNickname>
  );
};

export default Nickname;

const StNickname = styled.div`
  padding-top: 150px;
  margin: 0 auto;
  max-width: 428px;
  width: 100%;

  & h2 {
    margin-left: 20px;
  }

  & div {
    display: flex;
    width: 95%;
  }

  & input {
    display: flex;
    margin: 0 auto;
    width: 80%;
    height: 52px;
    border: none;
    border-radius: 15px;
    padding-left: 15px;
  }

  & p {
    font-weight: bold;
    font-size: 23px;
    margin-top: 15px;
  }

  & button {
    display: flex;
    margin: 0 auto;
    width: 127px;
    height: 43px;
    font-weight: 700;
    font-size: 23px;
    color: white;
    background: #ffc0c0;
    border: none;
    border-radius: 15px;
    margin: 30px auto;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
