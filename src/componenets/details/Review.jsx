import React, { useEffect, useState } from "react";
import Paginations from "../pagination/Paginations";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import Swal from "sweetalert2";

const Review = ({ comment }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const getToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [commentList, setCommentList] = useState([...comment].reverse());
  const [currentComments, setCurrnetComments] = useState([]);
  const [modal, setModal] = useState(false);
  const [arr, setArr] = useState([]);
  const [number, setNumber] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(3);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPage = indexOfLastPost - postPerPage;

  useEffect(() => {
    // setCommentList([...comment].reverse())
    setCurrnetComments(commentList.slice(indexOfFirstPage, indexOfLastPost));
  }, [indexOfFirstPage, indexOfLastPost, page, comment]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    for (let i = 0; i < comment.length; i++) {
      arr.push(i + 1);
      const set = new Set(arr);
      number.push(set);
    }
  }, []);
  const close = (idx) => {
    const newComment = Array(comment.length).fill(false);
    newComment[idx] = true;
    setModal(newComment);
  };
  
  const noLogin = (e) => {
    e.preventDefault();
    Swal.fire({
      text: "로그인이 필요한 서비스 입니다",
      icon: "warning",
    });
    navigate("/login");
  };

  return (
    <div>

      <CommentDiv>
        <p
          style={{
            color: "#BFB8B8",
            fontSize: "1.5rem",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          Review
        </p>
        <div>
          {currentComments.map((comment, index) => {
            return (
              <Comments
                comment={comment}
                key={index}
                arr={arr}
                isSelected={modal[index]}
                handleClick={close}
                elementIndex={index}
              />
            );
          })}
        </div>
        <ButDiv>
          {getToken === null ? (
            <FormBut onClick={noLogin}>후기작성</FormBut>
          ) : (
            <FormBut onClick={() => navigate("/detail/form/" + id)}>
              후기작성
            </FormBut>
          )}
        </ButDiv>
        <Paginations
          page={page}
          count={comment.length}
          setPage={handlePageChange}
          postPerpage={[postPerPage]}
        />
      </CommentDiv>
    </div>
  );
};

export default Review;
const CommentDiv = styled.div`
  margin: 0 auto;
  margin-top: 45px;
  border-top: 3px solid #dedddd;
  text-align: start;
  width: 95%;
  justify-content: center;
  align-items: center;
`;
const ButDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const FormBut = styled.button`
  cursor: pointer;
  color: white;
  background-color: #ABD4E2;
  border: 0px;
  height: 2.5rem;
  border-radius: 5px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;
