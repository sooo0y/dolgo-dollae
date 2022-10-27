import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../shared/Api";
import CoseList from "../../componenets/cose/CoseList";
import PaginationCose from "../../componenets/pagination/PaginationCose";
import CoseHeaderMain from "../../componenets/cose/CoseHeaderMain";
import Swal from "sweetalert2";

const Cose = () => {
  const mapRef = useRef();
  const navigate = useNavigate();
  const [cose, setCose] = useState([]);
  const [currentCose, setCurrnetCose] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(5);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPage = indexOfLastPost - postPerPage;

  const handlePageChange = (page) => {
    setPage(page);
  };
  const fetch = async () => {
    const response = await instance.get(`/api/auth/course/`);
    setCose(response?.data?.reverse());
  };

  useEffect(() => {
    // setCommentList([...comment].reverse())
    setCurrnetCose(cose.slice(indexOfFirstPage, indexOfLastPost));
  }, [indexOfFirstPage, indexOfLastPost, page, cose]);
  // ACCESS_TOKEN이 없으면 마이페이지 접근 불가
  const getToken = sessionStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    if (getToken === null) {
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        icon: "warning",
      });
      navigate("/login");
    }
  }, [getToken]);

  useEffect(() => {
    fetch();
  }, []);
  const initialization = (e) => {
    sessionStorage.removeItem("TITLE_NAME");
    sessionStorage.removeItem("NAME");
    sessionStorage.removeItem("IDs");
  };
  // select 페이지로 돌아올 시 자동으로 필터 초기화
  useEffect(() => {
    initialization();
  }, []);

  const addCose = () => {
    navigate("/cose/add");
  };

  return (
    <>
      <CoseBox>
        <CoseHeaderMain />
        <CoseDiv>
          <Title>
            <h2>나만의 코스</h2>
            <PostDiv title="코스 추가하기">
              <span onClick={addCose}>+</span>
            </PostDiv>
            {/* <span onClick={addCose}>+</span> */}
          </Title>
          {currentCose.map((cose, index) => {
            return <CoseList cose={cose} key={index} />;
          })}
        </CoseDiv>
        <Pagination>
            <PaginationCose
              page={page}
              count={cose.length}
              setPage={handlePageChange}
              postPerpage={[postPerPage]}
            />
        </Pagination>
      </CoseBox>
    </>
  );
};

export default Cose;

const CoseBox = styled.div`
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
  font-family: bold;
`;

const CoseDiv = styled.div`
  padding-top: 6rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;

  & h2 {
    color: #ffaeae;
    font-size: 2rem;
    font-weight: bolder;
    position: relative;
  }
`;

const Pagination = styled.div`
  margin-top: 100px;
`;

const PostDiv = styled.div`
  position: absolute;
  margin: auto;
  display: flex;
  float: right;
  align-items: center;
  margin-top: 20px;

  & span {
    margin-left: 260px;
    font-size: 2.1rem;
    width: 37px;
    border: 3px solid #ffaeae;
    text-align: center;
    border-radius: 35px;
    background-color: #ffaeae;
    color: #fff;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
      transition-duration: 0.3s;
    }
  }
`;

const ButDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  button {
    cursor: pointer;
    color: white;
    background-color: #abd4e2;
    border: 0px;
    height: 3rem;
    border-radius: 5px;
    width: 90%;
    font-size: 20px;
    font-weight: bold;
  }
`;
