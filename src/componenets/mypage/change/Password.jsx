import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../../shared/Api";
import Swal from "sweetalert2";

const Password = () => {
  const navigate = useNavigate();

  // input에 입력한 값을 저장할 state
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  // 변경하기 버튼을 클릭했을 때 서버로 전송
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // input이 비어있을 때, alert
    if (
      password.password === "" ||
      password.newPassword === "" ||
      password.newPasswordConfirm === ""
    ) {
      Swal.fire({
        text: "모든 항목을 입력해주세요.",
        icon: "warning",
      });
      e.preventDefault();
    }
    // 변경여부 확인
    else {
      if (window.confirm("정말 비밀번호를 변경하시겠습니까?")) {
        // 동의시 서버로 값 전송, mypage로 이동, alert
        const res = await instance.put(
          "/api/auth/member/updatepassword",
          password
        );
        navigate("/mypage");
        Swal.fire({
          text: "비밀번호가 변경되었습니다.",
          icon: "success",
        });
      }
      // 동의하지 않을 시 alert
      else {
        Swal.fire({
          text: "비밀번호 변경이 취소되었습니다.",
          icon: "success",
        });
      }
    }
  };

  return (
    <StPassword>
      <div>
        <h2>비밀번호 변경</h2>
      </div>
      <div>
        <input
          type="password"
          placeholder="기존 비밀번호를 입력해주세요"
          name="password"
          value={password.password}
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
        />
        <input
          type="password"
          style={{ marginTop: "20px" }}
          placeholder="새로운 비밀번호를 입력해주세요"
          name="newPassword"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
        <input
          type="password"
          style={{ marginTop: "20px" }}
          placeholder="새로운 비밀번호를 다시 입력해주세요."
          name="newPasswordConfirm"
          value={password.newPasswordConfirm}
          onChange={(e) =>
            setPassword({ ...password, newPasswordConfirm: e.target.value })
          }
        />
      </div>
      <div>
        <button onClick={onSubmitHandler}>변경하기</button>
      </div>
    </StPassword>
  );
};

export default Password;

const StPassword = styled.div`
  margin: 0 auto;
  padding-top: 30px;

  & h2 {
    margin-left: 20px;
  }

  & input {
    display: flex;
    margin: 0 auto;
    width: 85%;
    height: 52px;
    border: none;
    border-radius: 15px;
    padding-left: 15px;
  }

  & p {
    font-weight: 900;
    font-size: 23px;
    margin-left: 15px;
    margin-top: 10px;
  }

  & button {
    display: flex;
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
