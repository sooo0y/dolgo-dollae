import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { instance } from "../../../shared/Api";
import Like from "../../like/Like";
import PaginationsLike from "../../pagination/PaginationsLike";
import basicImg from "../../../assert/image/basic.png";
import Maps from "../../maps/Maps";

const LikeList = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [aniState, setAniState] = useState(false);
  const [list, setList] = useState([]);
  const [likeList, setLikeList] = useState([...list].reverse());
  const [currentLike, setCurrnetLike] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(2);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPage = indexOfLastPost - postPerPage;
  
  const getList = async () => {
    const res = await instance.get("/api/auth/place/mypage?areaCode=0&sigunguCode=0");

    setList(res?.data);
    setLikeList([...res?.data].reverse());
  };
  useEffect(() => {
    setCurrnetLike(likeList.slice(indexOfFirstPage, indexOfLastPost));
  }, [indexOfFirstPage, indexOfLastPost, page, list]);

  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <StLikeList>
      <h2>찜한 장소</h2>
        {modal === false
        ?
        <MapsDiv>
          <p onClick={() => {setModal(true);setAniState(false)}}>지도로 보기<Triangle>▶</Triangle></p>
        </MapsDiv>
        :
        <MapsDiv>
          <p onClick={() => {setAniState(true);setModal(false)}}>지도로 보기<Triangle>▼</Triangle></p>
        </MapsDiv>
        }
        {modal === true
        ? <MapOpen><Maps modal={modal} aniState={aniState}/></MapOpen> 
        : null
        }
      <div>
        <div>
          {currentLike.map((item) => (
            <div style={{ marginBottom: "20px" }} key={item.id}>
              {item.image === null ? (
                <img
                  alt=""
                  src={basicImg}
                  onClick={() => navigate(`/detail/${item.id}`)}
                />
              ) : (
                <img
                  alt=""
                  src={item.image}
                  onClick={() => navigate(`/detail/${item.id}`)}
                />
              )}
              <Title>
                <p>{item.title}</p>
                <span>
                  <Like id={item.id} />
                </span>
              </Title>
            </div>
          ))}
        </div>
        <PaginationsLike
          page={page}
          count={list.length}
          setPage={handlePageChange}
          postPerpage={2}
        />
      </div>
    </StLikeList>
  );
};

export default LikeList;

const StLikeList = styled.div`
  margin: 50px auto;
  margin-top: 20px;
  & h2 {
    color: #bfb8b8;
    margin-left: 10px;
  }

  & img {
    display: flex;
    margin: 0 auto;
    width: 90%;
    border-radius: 15px;
    max-height: 262px;
    &:hover {
      cursor: pointer;
    }
  }

  & div > div {
    /* margin-bottom: 30px; */
  }
`;
const MapsDiv = styled.div`
  width: 95.5%;
  margin: 0 auto;
  padding-bottom: 1rem;
  display: flex;

  p {
    cursor: pointer;
    font-weight: 700;
    font-size: 1.2rem;
  }
  &:hover {
    color: #abd4e2;
  }
`;
const Triangle = styled.span`
  display: inline-block;
  transition: transform 200ms ease-out 0s;
  transform: rotateZ(0deg);
`;
const MapOpen = styled.div`
`;

const Title = styled.div`
  margin: 0 15px;
  display: flex;
  font-weight: 900;
  font-size: 23px;
  justify-content: space-between;
  margin-top: 15px;
  position: relative;
  left: 15px;

  & span {
    font-weight: 700;
    font-size: 40px;
    color: #ff8585;
    position: relative;
    top: -5px;
    right: 15px;

    &:hover {
      cursor: pointer;
    }
  }
`;

