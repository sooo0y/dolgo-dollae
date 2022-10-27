import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { onLikeDetail, onLikeGet } from "../../redux/modules/post";
import styled from "styled-components";
import { instance } from "../../shared/Api";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Like = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const nickname = sessionStorage.getItem("nickname");

  const fetch = async (e) => {
    if (id === undefined) {
      return;
    } else {
      const response = await instance.get(`/api/place/like/${id}`);
      setLike(response?.data);
      // console.log("작동")
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  const likeClick = (e) => {
    e.preventDefault();
    if (like === true) {
      setLike(false);
      dispatch(onLikeDetail(id));
      // window.location.reload()
    } else {
      setLike(true);
      dispatch(onLikeDetail(id));
      // window.location.reload()
    }
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
    <>
      {nickname === null ? (
        <UnLiked onClick={noLogin}>♡</UnLiked>
      ) : (
        <div>
          {like === true ? (
            <Liked onClick={likeClick}>♥</Liked>
          ) : (
            <UnLiked onClick={likeClick}>♡</UnLiked>
          )}
        </div>
      )}
    </>
  );
};

export default Like;

const Liked = styled.span`
  cursor: pointer;
  color: #ff8585;
  font-size: 2.1rem;
  line-height: 1rem;
`;
const UnLiked = styled.span`
  cursor: pointer;
  color: #ff8585;
  font-weight: bold;
  font-size: 2.1rem;
  line-height: 1rem;
`;
