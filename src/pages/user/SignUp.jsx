import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../componenets/header/Header";
import { instance } from "../../shared/Api";
import Terms from "./Terms";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
    passwordConfirm: "",
  };

  // 회원가입할 때 받을 정보를 저장할 state
  const [user, setUser] = useState(initialState);

  // 이메일 인증을 위해 입력받은 email을 저장할 state
  const [emailCheck, setEmailCheck] = useState({ username: "" });

  const emailChangeHandler = (e) => {
    setEmailCheck({ username: e.target.value });
  };

  // 사용 가능한 이메일인지 여부
  const [availableEmail, setAvailableEmail] = useState(false);

  // email 중복확인
  const emailCheckHandler = async (e) => {
    e.preventDefault();

    // input이 비었거나, 이메일 유효성검사에 안 맞다면 alert
    if (user.username === "" || emailRegex.test(user.username) === false) {
      Swal.fire({
        text: "올바른 이메일을 입력해주세요.",
        icon: "warning",
      });
    }

    // 조건을 충족했다면, 사용 가능한 이메일인지 체크하기 위해 서버로 이메일 전송
    else {
      const response = await instance.post("/api/member/email", emailCheck, {
        headers: {
          "content-type": "application/json",
        },
      });

      // 중복된 이메일이 아니라면 availableEmail === true
      // 중복된 이메일이라면 availableEmail === false
      if (response.data !== "중복 이메일입니다.") {
        setAvailableEmail(true);
        Swal.fire({
          title: "사용 가능합니다.",
          text: "인증코드는 5분 후 만료됩니다.",
          icon: "success",
        });
      } else {
        setAvailableEmail(false);
        Swal.fire({
          text: "중복된 이메일입니다.",
          icon: "error",
        });
      }
    }
  };

  // 입력받은 인증코드를 저장할 state
  const [code, setCode] = useState({ code: "", email: "" });

  const codeChangeHandler = (e) => {
    setCode({ ...code, code: e.target.value, email: user.username });
  };

  // 이메일 인증코드 일치 여부
  const [sameCode, setSameCode] = useState(false);

  // 이메일 인증코드 제출 여부
  const [codeSubmit, setCodeSubmit] = useState(false);

  // 이메일 인증 코드 제출
  const codeSubmitHandler = async (e) => {
    e.preventDefault();
    setCodeSubmit(true);
    const response = await instance.post("api/member/codeEmail", code, {
      headers: {
        "content-type": "application/json",
      },
    });

    // 응답이 true이면 인증 완료 alert, sameCode === true
    if (response.data === true) {
      setSameCode(true);
      Swal.fire({
        text: "인증되었습니다",
        icon: "success",
      });
      return false;
    }

    // 응답이 false라면 코드 확인 alert, sameCode === false
    else {
      setSameCode(false);
      Swal.fire({
        text: "인증 코드를 다시 확인해주세요.",
        icon: "error",
      });
      return false;
    }
  };

  // input에 입력한 값을 state로 저장
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 개인정보 수집에 동의했는지 여부
  const [consent, setConsent] = useState(false);

  const consentHandler = () => {
    setConsent(!consent);
  };

  // 회원가입
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 이메일 중복확인을 안 했을 경우
    if (availableEmail === false) {
      Swal.fire({
        text: "이메일 인증을 해주세요.",
        icon: "warning",
      });
      return false;
    }

    // 이메일 인증코드가 정확하지 않을 경우
    else if (sameCode === false) {
      Swal.fire({
        text: "인증코드를 확인해주세요.",
        icon: "warning",
      });
      return false;
    }

    // 모든 항목을 입력하지 않고 회원가입 버튼을 click했을 경우
    else if (
      user.username === "" ||
      user.password === "" ||
      user.passwordConfirm === ""
    ) {
      Swal.fire({
        text: "모든 항목을 입력해주세요.",
        icon: "warning",
      });
      return false;
    }

    // 비밀번호와 비밀번호 확인이 일치하지 않을 경우
    else if (user.password !== user.passwordConfirm) {
      Swal.fire({
        text: "비밀번호가 일치하지 않습니다.",
        icon: "warning",
      });
      return false;
    }

    // 개인정보 수집에 동의하지 않았을 경우
    else if (consent === false) {
      Swal.fire({
        text: "개인정보 수집에 동의해주세요.",
        icon: "warning",
      });
    } else {
      // 모든 조건을 충족했을 시, 서버로 데이터 전송
      try {
        const response = await instance.post("/api/member/signup", user);
        Swal.fire({
          title: `${response.data.nickname}님`,
          text: "회원가입을 축하드립니다.",
          icon: "success",
        });
        setUser(initialState);
        navigate("/login");
      } catch {
        // 회원탈퇴 후 일정 기간이 지나지 않아 회원가입이 불가능한 경우 alert
        Swal.fire({
          text: "탈퇴 후 7일간 재가입이 불가합니다.",
          icon: "error",
        });
      }
    }
  };

  // 이메일, 비밀번호 정규표현식
  const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

  // 렌더링될 때마다 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <St>
      <Header />
      <StSignUp>
        <form onSubmit={onSubmitHandler}>
          {/* 이메일 검증 */}
          <Email>
            <label>
              <div>
                <b>이메일</b>
              </div>
              <div>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={(e) => {
                    onChangeHandler(e);
                    emailChangeHandler(e);
                  }}
                  placeholder="이메일을 입력해주세요."
                />
                <button onClick={emailCheckHandler}>인증하기</button>
              </div>

              {/* 올바른 이메일 형식인지 설명해주는 문구 */}
              <div>
                {user.username === "" ? null : emailRegex.test(
                    user.username
                  ) ? (
                  <p
                    style={{
                      color: "green",
                      textAlign: "left",
                      lineHeight: "20px",
                    }}
                  >
                    올바른 이메일 형식입니다.
                    <br /> 「인증하기」를 누른 후 잠시 기다려주세요.
                  </p>
                ) : (
                  <p style={{ color: "red" }}>이메일 형식이 맞지 않습니다.</p>
                )}
              </div>
            </label>
          </Email>

          {/* 이메일 중복확인을 통과했을 경우, 인증번호 입력 input 생성 */}
          {availableEmail === false ? null : (
            <EmailConfirm>
              <div>
                <input
                  placeholder="인증번호를 입력해주세요."
                  name="code"
                  value={code.code}
                  onChange={(e) => {
                    codeChangeHandler(e);
                  }}
                />
                <button onClick={codeSubmitHandler}>확인</button>
              </div>

              {/* 올바른 인증코드인지 설명해주는 문구 */}
              <div>
                {codeSubmit === true && sameCode === false ? (
                  <p style={{ color: "red" }}>인증코드를 다시 확인해주세요.</p>
                ) : codeSubmit === true && sameCode === true ? (
                  <p style={{ color: "green" }}>인증되었습니다.</p>
                ) : null}
              </div>
            </EmailConfirm>
          )}

          {/* 비밀번호 검증 */}
          <Password>
            <label>
              <div>
                <b>비밀번호</b>
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  placeholder="숫자, 영문자를 혼용하여 8자리 이상 입력해주세요."
                />
              </div>
              {/* 올바른 비밀번호인지 설명해주는 문구 */}
              <div>
                {user.password === "" ? null : passwordRegex.test(
                    user.password
                  ) ? (
                  <p style={{ color: "green" }}>안전한 비밀번호예요!</p>
                ) : (
                  <p style={{ color: "red" }}>
                    숫자, 영문자 조합으로 8자리 이상 입력하세요.
                  </p>
                )}
              </div>
            </label>
          </Password>

          {/* 비밀번호 확인 */}
          <PasswordConfirm>
            <input
              type="password"
              name="passwordConfirm"
              value={user.passwordConfirm}
              onChange={onChangeHandler}
              placeholder="비밀번호를 다시 입력해주세요."
            />

            {/* 두 개의 비밀번호가 일치하는지 설명해주는 문구 */}
            <div>
              {user.passwordConfirm === "" ? null : user.password ===
                user.passwordConfirm ? (
                <p style={{ color: "green" }}>비밀번호가 일치합니다.</p>
              ) : (
                <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </PasswordConfirm>

          {/* 개인정보 수집에 동의하는지 check */}
          <Check>
            <input type="checkbox" onChange={consentHandler} />
            개인정보 수집 동의
          </Check>

          {/* 약관 */}
          <Terms />
          <Buttons>
            <Submit type="submit" value="가입하기" />
            <Cancel
              type="button"
              value="취소"
              onClick={() => navigate("/login")}
            />
          </Buttons>
        </form>
      </StSignUp>
    </St>
  );
};

export default SignUp;

const St = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;

const StSignUp = styled.div`
  text-align: center;

  padding-top: 90px;

  & form {
    margin-top: 100px;
  }

  & p {
    margin: 15px auto 15px 20px;
  }
`;

const Email = styled.div`
  display: block;
  margin: 40px 20px;
  width: 90%;

  & div {
    display: flex;
    gap: 10px;
  }

  & input {
    width: 80%;
    height: 52px;
    background-color: rgba(172, 212, 228, 0.35);
    border-radius: 15px;
    border: none;
    padding-left: 10px;
    margin-top: 20px;
  }

  & button {
    background-color: rgba(121, 185, 211, 0.62);
    color: white;
    border: none;
    border-radius: 12px;
    width: 20%;
    height: 50px;
    cursor: pointer;
    font-weight: 700;
    line-height: 24px;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
`;

const EmailConfirm = styled.div`
  display: block;
  margin: 0 20px;
  margin-top: -40px;
  width: 90%;

  & div {
    display: flex;
    gap: 10px;
  }

  & input {
    width: 80%;
    height: 52px;
    background-color: rgba(172, 212, 228, 0.35);
    border-radius: 15px;
    border: none;
    padding-left: 10px;
  }

  & button {
    background-color: rgba(121, 185, 211, 0.62);
    color: white;
    border: none;
    border-radius: 12px;
    width: 20%;
    height: 50px;
    cursor: pointer;
    font-weight: 700;
    line-height: 24px;
    display: block;
    margin: 0 auto;
  }
`;

const Password = styled.div`
  display: block;
  margin: 50px auto;
  width: 90%;

  & div {
    display: flex;
    margin-bottom: 20px;
  }

  & p {
    margin-bottom: -10px;
  }

  & input {
    width: 95%;
    height: 52px;
    background-color: rgba(172, 212, 228, 0.35);
    border-radius: 15px;
    border: none;
    padding-left: 10px;
    margin-bottom: -20px;
  }
`;

const PasswordConfirm = styled.div`
  width: 90%;
  margin: 0 auto;

  & input {
    width: 95%;
    height: 52px;
    background-color: rgba(172, 212, 228, 0.35);
    border-radius: 15px;
    border: none;
    padding-left: 10px;
    margin-top: -15px;
  }

  & p {
    margin-bottom: -20px;
    text-align: left;
    margin-left: 20px;
  }
`;

const Buttons = styled.div`
  margin-top: 40px;

  & input {
    margin: 20px auto;
  }
`;

const Submit = styled.input`
  background-color: rgba(121, 185, 211, 0.62);
  color: white;
  border: none;
  border-radius: 12px;
  width: 370px;
  height: 50px;
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  display: block;
  margin: 0 auto;
`;

const Cancel = styled.input`
  background-color: white;
  color: rgba(121, 185, 211, 0.62);
  border: 3px solid rgba(121, 185, 211, 0.62);
  border-radius: 12px;
  width: 370px;
  height: 50px;
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  display: block;
  margin: 0 auto;
`;

const Check = styled.label`
  display: flex;
  margin: 0 auto;
  margin-top: 70px;
  width: 50%;
  line-height: 25px;

  & input {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
`;
