import React from "react";
import styled from "styled-components";
import Header from "../../componenets/header/Header";
import { useState, useEffect } from "react";
import { instance } from "../../shared/Api";
import { useNavigate } from "react-router-dom";
import PaginationRequest from "../../componenets/pagination/PaginationRequest";
import { FaImage } from "react-icons/fa";

const RequestList = () => {
  const navigate = useNavigate();

  // 서버로부터 받아온 값을 state에 저장
  const [list, setList] = useState([]);
  const [reviewList, setReviewList] = useState([...list].reverse());
  console.log(list);

  const getList = async () => {
    const response = await instance.get("/api/comment/recent");
    setList(response.data);
    setReviewList([...response?.data]);
  };

  // 렌더링될 때마다 getList 함수 실행
  useEffect(() => {
    getList();
  }, []);

  // 페이지네이션 구현
  const [currentReview, setCurrnetReview] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(10);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPage = indexOfLastPost - postPerPage;

  useEffect(() => {
    setCurrnetReview(reviewList.slice(indexOfFirstPage, indexOfLastPost));
  }, [indexOfFirstPage, indexOfLastPost, page, list]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <StAdministrator>
      <Header />
      <Container>
        <Title>최근 후기 목록</Title>
        {currentReview?.map((item) => {
          return (
            <Contents
              key={item.id}
              onClick={() => navigate(`/detail/${item.place_id}`)}
            >
              <Image>
                {item.image === false ? (
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#EBF8FF",
                      fontSize: "1.5rem",
                      lineHeight: "3.4rem",
                    }}
                  >
                    <FaImage />
                  </span>
                ) : (
                  <span
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontSize: "1.5rem",
                      lineHeight: "3.4rem",
                    }}
                  >
                    <FaImage style={{ marginTop: "1.7rem" }} />
                  </span>
                )}
              </Image>
              <Text>
                <p style={{ fontSize: "18px" }}>{item.placeTitle}</p>
                <p>{item.createdAt.substr(0, 10)}</p>
                <p>{item.title}</p>
              </Text>
            </Contents>
          );
        })}
      </Container>
      <PaginationRequest
        page={page}
        count={list.length}
        setPage={handlePageChange}
      />
    </StAdministrator>
  );
};

export default RequestList;

const StAdministrator = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
  color: #727272;
`;

const Container = styled.div`
  padding-top: 160px;
`;

const Title = styled.div`
  font-size: 29px;
  line-height: 40px;
  text-align: center;
  color: #bfb8b8;
`;

const Contents = styled.div`
  width: 90%;
  height: 95px;
  background-color: #eef6fa;
  border-radius: 20px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;

  & p {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const Image = styled.div`
  margin-left: 10px;
  margin-top: 6px;
`;

const Text = styled.div`
  vertical-align: middle;
  width: 85%;
  & p {
    margin-top: 11px;
    text-align: left;
  }
`;
