import React from "react";
import styled from "styled-components";
import Header from "../../../header/Header";
import { instance } from "../../../../shared/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const RequestDetail = () => {
  const navigate = useNavigate();

  // 요청 글의 id값을 param에서 조회
  const param = useParams();

  // 서버로부터 받아온 값을 state에 저장
  const [data, setData] = useState();

  const getData = async () => {
    const res = await instance.get(`/api/auth/order/${param.id}`);
    setData(res.data);
  };

  // 렌더링될 때마다 getData 함수 실행
  useEffect(() => {
    getData();
  }, []);

  return (
    <StRequestDetail>
      <Header />
      <Container>
        <div>
          <Title>제목</Title>
          <Content defaultValue={data?.title} readOnly />
        </div>
        {data?.type !== "추가" ? (
          <div>
            <Title>여행지 id</Title>
            <Content defaultValue={data?.place_id} readOnly />
          </div>
        ) : null}
        <div>
          <Title>유형</Title>
          <div
            style={{ display: "flex", marginLeft: "35px", marginTop: "15px" }}
          >
            <label style={{ marginRight: "15px", fontSize: "18px" }}>
              <input
                type="radio"
                checked
                readOnly
                style={{ width: "15px", height: "15px", marginRight: "10px" }}
              />
              {data?.type}
            </label>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Title>내용</Title>
          <Context
            defaultValue={data?.content}
            style={{ lineHeight: "20px" }}
            readOnly
          ></Context>
        </div>
        {/* <div>
          <Title>주소</Title>
          <Content defaultValue={data?.address} readOnly />
        </div> */}
        <div>
          <Title>이미지</Title>
          <div style={{ width: "100%" }}>
            <ImgBox>
              {data?.imageList.map((img, idx) => {
                return <Img key={idx} alt="" src={img} />;
              })}
            </ImgBox>
          </div>
        </div>
        {data?.state === true ? (
          <div style={{ marginTop: "10px" }}>
            <Title>답변</Title>
            <Context
              defaultValue={data?.answer}
              style={{ lineHeight: "20px" }}
              readOnly
            />
          </div>
        ) : null}
        <Buttons>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            뒤로가기
          </button>
        </Buttons>
      </Container>
    </StRequestDetail>
  );
};

export default RequestDetail;

const StRequestDetail = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
  background-color: #eef6fa;
`;
const Container = styled.div`
  padding-top: 120px;
`;
const Title = styled.p`
  width: 200px;
  height: 40px;
  padding: 40px 0px 0px 30px;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 40px;
`;
const Content = styled.input`
  display: flex;
  margin: 10px auto;
  width: 90%;
  height: 52px;
  background-color: white;
  border-radius: 15px;
  border: none;
  padding-left: 10px;
  font-size: 14px;
  font-family: bold;
  font-weight: lighter;
`;
const Buttons = styled.div`
  display: flex;
  padding-top: 40px;
  padding-bottom: 50px;
  width: 95%;
  margin: 0 auto;

  & button {
    margin: 0 auto;
    width: 90%;
    font-weight: bold;
    font-size: 15px;
    line-height: 40px;
    text-align: center;
    color: white;
    background: #abd4e2;
    border-radius: 15px;
    cursor: pointer;
    border: none;
    background: white;
    border: 3px solid #abd4e2;
    color: #abd4e2;
    letter-spacing: -3px;

    &:hover {
      border: 3px solid #ffaeae;
      color: #ffaeae;
    }
  }
`;
const Context = styled.textarea`
  width: 87%;
  height: 200px;
  display: flex;
  margin: 0 auto;
  border: none;
  border-radius: 15px;
  resize: none;
  font-size: 14px;
  font-family: bold;
  font-weight: lighter;
  padding: 10px;
`;

const ImgBox = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
`;
