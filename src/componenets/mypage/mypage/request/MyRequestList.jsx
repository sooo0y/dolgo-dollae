import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../../../shared/Api";
import Paginations from "../../../pagination/Paginations";

const MyRequestList = () => {
  const navigate = useNavigate();

  // 서버로부터 받아온 값을 state에 저장
  const [list, setList] = useState([]);
  const [request, setRequet] = useState([...list]);

  const getList = async () => {
    const res = await instance.get("/api/auth/order/mypage");
    setList(res.data);
    setRequet([...res?.data]);
  };

  // 렌더링될 때마다 getList 함수 실행
  useEffect(() => {
    getList();
  }, []);

  // 페이지네이션 구현
  const [currentRequest, setCurrnetRequest] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(3);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPage = indexOfLastPost - postPerPage;

  useEffect(() => {
    setCurrnetRequest(request.slice(indexOfFirstPage, indexOfLastPost));
  }, [indexOfFirstPage, indexOfLastPost, page, list]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <StRequestList>
      <h2>요청한 글</h2>
      {currentRequest.map((request, idx) => (
        <Request
          key={idx}
          onClick={() => {
            navigate(`/myrequest/detail/${request.id}`);
          }}
        >
          <Title>{request.title}</Title>
          {request.state === false ? (
            <State style={{ color: "red" }}>false</State>
          ) : (
            <State style={{ color: "green" }}>true</State>
          )}
        </Request>
      ))}

      {/* 페이지네이션 구현 */}
      <Paginations
        page={page}
        count={list.length}
        setPage={handlePageChange}
        postPerpage={3}
      />
    </StRequestList>
  );
};

export default MyRequestList;

const StRequestList = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 50px auto;
  padding-top: 10px;

  & h2 {
    color: #bfb8b8;
    margin-left: 10px;
  }
`;

const Request = styled.div`
  width: 90%;
  height: 40px;
  margin: 20px auto;
  background: #eef6fa;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  display: block;
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  font-weight: bold;
  padding-left: 10px;
  align-items: center;
  position: relative;
  left: 10px;
  top: 13px;
`;

const State = styled.p`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  font-weight: bold;
  align-items: center;
  position: relative;
  top: 13px;
  right: 18px;
`;
