import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { instance } from "../../../shared/Api";
import { useParams } from "react-router-dom";
import CoseReviseList from "../coseReviser/CoseReviseList";
import ReviseHeader from "./ReviseHeader";

const CoseRevise = () => {
  const { id } = useParams();
  const [titleMessage, setTitleMessage] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  //기존 코스 데이터 불러오기
  const fetch = async () => {
    if (JSON.parse(sessionStorage.getItem("TITLE_NAME")).length === 0) {
      const response = await instance.get(`/api/auth/course/${id}`);
      sessionStorage.setItem("IDs", JSON.stringify(response?.data.id));
      sessionStorage.setItem("TITLE_NAME", JSON.stringify(response?.data.data));
      sessionStorage.setItem("NAME", JSON.stringify(response?.data.name));
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  //코스 이름 불러오기
  const [title, setTitle] = useState(
    JSON.parse(sessionStorage.getItem("NAME")) || ""
  );

  //코스 이름 유효성 검사
  const onChangeTitle = (e) => {
    const TitleRegex = /^(?=.*[a-zA-z0-9가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^*+=-]).{1,20}$/;
    const TitleCurrnet = e.target.value;
    setTitle(TitleCurrnet);

    if (!TitleRegex.test(TitleCurrnet)) {
      setTitleMessage("20글자 이하로 작성해주세요 ");
      setIsTitle(false);
    } else {
      setTitleMessage(null);
      setIsTitle(true);
    }
  };

  //코스 이름이 바뀌었을 때 로컬스토리지에 저장
  useEffect(() => {
    sessionStorage.setItem("NAME", JSON.stringify(title));
  }, [title]);

  return (
    <>
      <CoseBox>
        <ReviseHeader />
        <HelpP>▲ 추가하고 싶은 장소를 상단에 입력해주세요</HelpP>
        <CoseDiv>
          <NameDiv>
            <p>Course</p>
          </NameDiv>
          {/* <HelpDiv>
              <span onClick={onOpen}>?</span>
            </HelpDiv> */}
        </CoseDiv>
        <TitleDiv>
          <DescDiv>
            <p>▼ 코스 제목을 변경하세요.</p>
          </DescDiv>
          <InputTit
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력해주세요"
          />
        </TitleDiv>
        <Message>
          {title.length > 0 && <p style={{ color: "red" }}>{titleMessage}</p>}
        </Message>
        <DescDiv>
          <p>▼ 드래그해서 순서를 변경하세요.</p>
        </DescDiv>
        <CoseReviseList title={title} setTitle={setTitle} id={id} />
        {/* <ModalPortal>
                {modal && <CoseImage onClose={onClose}/>}
            </ModalPortal> */}
      </CoseBox>
    </>
  );
};

export default CoseRevise;

const CoseBox = styled.div`
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
  font-family: bold;
`;
const HelpP = styled.p`
  padding-top: 8.8rem;
  font-size: 15px;
  color: #bfb8b8;
  text-align: center;
`;
const CoseDiv = styled.div`
  text-align: center;
  padding-top: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 3rem;
    color: #abd4e2;
  }
`;
const HelpDiv = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  justify-content: flex start;
  align-items: center;
  span {
    font-size: 2.3rem;
    width: 25%;
    border: 3px solid #abd4e2;
    text-align: center;
    border-radius: 35px;
    background-color: #abd4e2;
    color: #fff;
    cursor: pointer;
    &:hover {
      border: 3px solid #abd4e2;
      background-color: #fff;
      color: black;
    }
  }
`;
const NameDiv = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;

  & p {
    color: #ffaeae;
  }
`;
const TitleDiv = styled.div`
  padding-top: 1.3rem;
  width: 78%;
  margin: auto;
`;

const InputTit = styled.input`
  width: 100%;
  height: 50px;
  background-color: #eef6fa;
  border-radius: 15px;
  border: none;
  font-family: bold;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: -5px;
`;

const Message = styled.div`
  margin-bottom: 25px;
  font-weight: 500;
  width: 90%;
  font-size: 1rem;
  text-align: end;
  margin-top: 0.5rem;
  justify-content: right;
`;
const DescDiv = styled.div`
  width: 80%;
  margin: auto;
  font-size: 15px;
  color: #bfb8b8;
  text-align: center;
  padding-top: 20px;
`;
