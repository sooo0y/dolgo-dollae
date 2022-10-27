import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../../shared/Api";
import { useRef } from "react";
import { deleteCookie } from "../../../shared/Cookie";
import Swal from "sweetalert2";

const Withdrawal = () => {
  const navigate = useNavigate();

  // sessionStorage에서 가져온 username
  const username = sessionStorage.getItem("username");

  // input에 입력한 값을 저장
  const memberOutRef = useRef();

  // 탈퇴하기 버튼을 클릭했을 때 서버로 값 전송
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 서버에 보내줄 동의 문구, email
    const req = {
      memberOut: memberOutRef.current.value,
      email: username,
    };

    // 온점을 포함했을 때 alert
    if (memberOutRef.current.value === "회원탈퇴를 동의합니다.") {
      Swal.fire({
        text: "온점(.)은 포함되지 않습니다.",
        icon: "warning",
      });
      return;
    }

    // 다른 문구를 작성하거나, input이 비었을 때 alert
    else if (
      memberOutRef.current.value !== "회원탈퇴를 동의합니다" ||
      memberOutRef.current.value === ""
    ) {
      Swal.fire({
        text: "위 문구를 올바르게 따라 작성해주세요.",
        icon: "warning",
      });
      return;
    } else {
      // 변경여부 재확인
      Swal.fire({
        html: "탈퇴 후 7일간<br/>재가입 불가능합니다.<br/>정말 탈퇴하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        // closeOnConfirm: false,
        // closeOnCancel: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          // 동의했을 때, 서버로 값 전송, 메인으로 이동, cookie에 저장한 token 삭제
          try {
            const res = await instance.post("/api/auth/member/memberout", req);
            Swal.fire({
              text: "정상적으로 탈퇴되었습니다.",
              icon: "success",
            });
            navigate("/");
            deleteCookie("REFRESH_TOKEN");
            deleteCookie("ACCESS_TOKEN");
          } catch {
            // 동일한 이메일이 아니거나, 작성 문구가 틀릴 경우 alert
            Swal.fire({
              text: "탈퇴할 수 없는 계정입니다.",
              icon: "error",
            });
            navigate("/mypage");
          }
        } else {
          // 동의하지 않았을 경우 alert
          Swal.fire({
            text: "더 나은 서비스로 보답하겠습니다 :)",
            icon: "success",
          });
        }
      });
    }
  };

  return (
    <StWithdrawal>
      <h2>회원탈퇴</h2>
      <p>회원탈퇴를 동의합니다</p>
      <input placeholder="위 문구를 따라 작성해주세요." ref={memberOutRef} />
      <button onClick={onSubmitHandler}>탈퇴하기</button>
    </StWithdrawal>
  );
};
export default Withdrawal;

const StWithdrawal = styled.div`
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;

  & h2 {
    margin-left: 20px;
  }

  & p {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    font-size: 18px;
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

  & div {
    display: flex;
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

    &:hover {
      cursor: pointer;
    }
  }
`;
