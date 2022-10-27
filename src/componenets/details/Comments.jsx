import React, { useState, useRef, useEffect } from "react";
import CommentModal from "./CommentModal";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";

const Comments = ({ comment, arr, isSelected, handleClick, elementIndex }) => {
  const [modal, setModal] = useState(false);
  const number = [...arr].reverse();
  const date = comment?.createdAt?.substring(2, 10);

  return (
    <>
      {modal === false ? (
        <CommentDiv>
          <ContentDiv
            onClick={() => {
              handleClick(elementIndex);
              setModal(true);
            }}
          >
            {/* {number.map((number) => {
         return <Numbers number={number}/>   
        })} */}
            <p style={{ width: "9rem" }}>{date}</p>
            {comment.imageList.length === 0 ? (
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
                <FaImage style={{ marginTop: "1rem" }} />
              </span>
            )}
            <PCom>{comment.title}</PCom>
            {/* <p>닉네임</p> */}
          </ContentDiv>
          <div id="state">
            {modal === true ? (
              <CommentModal key={comment.comment_id} comment={comment} />
            ) : null}
          </div>
        </CommentDiv>
      ) : (
        <CommentDiv>
          <ContentDiv
            onClick={() => {
              handleClick(elementIndex);
              setModal(false);
            }}
            style={{ marginLeft: "-15px"}}
          >
            <p style={{ width: "9rem" }}>{date}</p>
            {comment.imageList.length === 0 ? (
              <span
                style={{
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
                  color: "black",
                  fontSize: "1.5rem",
                  lineHeight: "3.4rem",
                }}
              >
                <FaImage style={{ marginTop: "1rem" }} />
              </span>
            )}
          </ContentDiv>
          <div id="state">
            {modal === true ? (
              <CommentModal key={comment.comment_id} comment={comment} />
            ) : null}
          </div>
        </CommentDiv>
      )}
    </>
  );
};

export default Comments;

const PCom = styled.p`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const CommentDiv = styled.div`
  background-color: #eef6fa;
  border-radius: 20px;
  margin-top: 0.8rem;
`;
const ContentDiv = styled.div`
  width: 95%;
  display: flex;
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
  align-items: center;
  margin: 0px auto;
& span {
  padding-top: 6px;
  padding-right: 8px;
  padding-left: -4px;
}
`;
