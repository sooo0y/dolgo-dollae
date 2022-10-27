import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../componenets/header/Header";
import basicImg from "../../assert/image/basic.png";
import { instance } from "../../shared/Api";
import { useLocation } from "react-router";
import { FaStar } from "react-icons/fa";

const List = () => {
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const observerTargetEl = useRef(null);
  const page = useRef(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const THEME_CODE = window.sessionStorage.getItem("THEME_CODE");
  const AREA_CODE = window.sessionStorage.getItem("AREA_CODE");
  const SIGUNGU_CODE = window.sessionStorage.getItem("SIGUNGU_CODE");
  const THEME_NAME = window.sessionStorage.getItem("THEME_NAME");
  const AREA_NAME = window.sessionStorage.getItem("AREA_NAME");
  const SIGUNGU_NAME = window.sessionStorage.getItem("SIGUNGU_NAME");

  const fetch = useCallback(async () => {
    try {
      const data = await instance.get(
        `/api/place?theme=${THEME_CODE}&areaCode=${AREA_CODE}&sigunguCode=${SIGUNGU_CODE}&pageNum=${page.current}`
      );
      setPosts((prevPosts) => [...prevPosts, ...data.data]);
      setHasNextPage(data.data.length === 10);
      if (data.data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!observerTargetEl.current || !hasNextPage) return;

    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        fetch();
      }
    });
    io.observe(observerTargetEl.current);

    return () => {
      io.disconnect();
    };
  }, [fetch, hasNextPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <StList>
      <Header />
      <Title>
        <div>
          <p>{THEME_NAME}</p>
        </div>
        <p>‣</p>
        <div>
          <p>{AREA_NAME}</p>
        </div>
        <p>‣</p>
        <div>
          <p>{SIGUNGU_NAME}</p>
        </div>
      </Title>
      {/* <Sort>
        <p>조회순</p>
        <p>리뷰 많은 순</p>
        <p>별점순</p>
        <p>방문자수 순</p>
      </Sort> */}
      <Content>
        {posts &&
          posts.map((list) => (
            <Card key={list.id} onClick={() => navigate(`/detail/${list.id}`)}>
              {list.image == null ? (
                <BasicContainer>
                  <BasicImg src={basicImg} />
                  <Name>
                    <ListTitle style={{ color: "#414141" }}>
                      {list.title}
                    </ListTitle>
                    <div style={{ display: "flex", color: "#414141" }}>
                      <FaStar
                        style={{
                          color: "#fcc419",
                          marginRight: "0.3rem",
                          marginTop: "0.2rem",
                        }}
                      />
                      {list.star}
                    </div>
                  </Name>
                </BasicContainer>
              ) : (
                <>
                  <ImgShadow>
                    <ImgBox>
                      <Img src={list.image} />
                    </ImgBox>
                  </ImgShadow>
                  <Name>
                    <ListTitle>{list.title}</ListTitle>
                    <div style={{ display: "flex" }}>
                      <FaStar
                        style={{
                          color: "#fcc419",
                          marginRight: "0.3rem",
                          marginTop: "0.2rem",
                        }}
                      />{" "}
                      {list.star}
                    </div>
                  </Name>
                </>
              )}
            </Card>
          ))}
      </Content>
      <div ref={observerTargetEl} />
    </StList>
  );
};

export default List;

const StList = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;

  & button {
    margin-left: 15px;
    margin-top: 30px;
    background: #ffc0c0;
    height: 40px;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 17px;
    text-align: center;
    color: #ffffff;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Title = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  top: 80px;
  height: 150px;
  max-width: 428px;
  width: 100%;
  z-index: 1;
  background-color: #ffffff;

  & div {
    width: 90px;
    height: 50px;
    background-color: #c4e0ec;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    margin: auto 15px;
  }

  & p {
    color: #ffc0c0;
    font-size: 45px;
    font-weight: 700;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  & div > p {
    display: flex;
    justify-content: center;
    margin-block-start: 8px;
    margin-block-end: 0;
    color: #ffffff;
    font-size: 24px;
    font-weight: normal;
    text-shadow: none;
    margin-top: 13px;
  }
`;

const Card = styled.div`
  text-align: center;
`;

const Content = styled.div`
  position: relative;
  top: 280px;
  margin: 0 auto;
`;

const BasicContainer = styled.div`
  max-width: 428px;
  width: 100%;
`;

const BasicImg = styled.img`
  width: 100%;
  height: 234px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;

const ImgShadow = styled.div`
  margin: 0 auto;
  max-width: 428px;
  width: 100%;
  height: 235px;
  border-radius: 20px;
  /* z-index: 3; */
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }
`;

const ImgBox = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 235px;
  border-radius: 20px;
  box-shadow: inset 0 -30px 70px #2e2e2e;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  position: relative;
  width: 100%;
  height: 234px;
  z-index: -2;
  border-radius: 20px;
`;

const Name = styled.div`
  display: flex;
  position: relative;
  top: -55px;
  text-align: initial;
  margin: 0 auto;
  color: #ffffff;
  font-size: 23px;
  line-height: 33px;
  margin-block-end: 0;
  margin-block-start: 0;
  width: 80%;
`;

const ListTitle = styled.div`
  display: block;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
`;
