import React from "react";
import styled from "styled-components";
import Header from "../../componenets/header/Header";
import { instance } from "../../shared/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import PostModal from "../../componenets/modal/PostModal";
import CompleteModal from "../../componenets/modal/CompleteModal";

const RequestDetail = () => {
  const navigate = useNavigate();
  const param = useParams();

  // modal on/off를 설정할 state
  const [modal, setModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);

  // 서버로부터 받아온 데이터를 state에 저장
  const [data, setData] = useState();

  const getData = async () => {
    const res = await instance.get(`/api/auth/order/${param.id}`);
    // console.log(res);
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
          <ImgBox>
            {data?.imageList.map((img, idx) => {
              return <Img key={idx} alt="" src={img} />;
            })}
          </ImgBox>
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
            style={{
              background: "white",
              border: "3px solid #abd4e2",
              color: "#abd4e2",
              letterSpacing: "-3px",
            }}
          >
            뒤로가기
          </button>
          {data?.type === "추가" ? (
            <button
              onClick={() => {
                navigate("/post");
                sessionStorage.setItem("ID", param.id);
              }}
            >
              추가
            </button>
          ) : data?.type === "수정" ? (
            <button
              onClick={() => {
                navigate(`/edit/${data?.place_id}`);
              }}
            >
              수정
            </button>
          ) : (
            <button onClick={() => setModal(true)}>삭제</button>
          )}
          {data?.state === false ? (
            <button onClick={() => setCompleteModal(!completeModal)}>
              완료
            </button>
          ) : (
            <button style={{ background: "gray" }} disabled>
              완료
            </button>
          )}

          {/* 삭제버튼 클릭시 modal */}
          {modal === true ? (
            <PostModal modal={modal} setModal={setModal} data={data} />
          ) : null}

          {/* 완료버튼 클릭시 modal */}
          {completeModal === true ? (
            <CompleteModal
              completeModal={completeModal}
              setCompleteModal={setCompleteModal}
              data={data}
            />
          ) : null}
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
    width: 20%;
    font-weight: bold;
    font-size: 15px;
    line-height: 40px;
    text-align: center;
    color: white;
    background: #abd4e2;
    border-radius: 15px;
    cursor: pointer;
    border: none;

    &:hover {
      background-color: #ffaeae;
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

const ImgBox = styled.div``;

const Img = styled.img`
  width: 90%;
  display: flex;
  margin: 0 auto;
  padding-top: 20px;
`;
