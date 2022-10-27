import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../componenets/header/Header";
import basicImg from "../../assert/image/basic.png";
import { instance } from "../../shared/Api";
import { useLocation } from "react-router";
import { FaStar } from "react-icons/fa";
import filter from "../../assert/header/filter.png";
import CoseHeader from "../header/CoseHeader";
import CoseSelectModal from "../modal/CoseSelectModal";
import Swal from "sweetalert2";

const MapSearch = () => {
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [modalOn, setModalOn] = useState(false);
  const observerTargetEl = useRef(null);
  const page = useRef(0);
  const navigate = useNavigate();
  let [cose, setCose] = useState(
   JSON.parse(sessionStorage.getItem('TITLE_NAME')) || []
  );
  const { pathname } = useLocation();
  const {searchWord} = useParams();
  
  // ACCESS_TOKEN이 없으면 마이페이지 접근 불가
  const getToken = sessionStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    if(getToken === null){
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        icon: "warning",
      });
      navigate('/login')
    }
  },[getToken]);

  const fetch = useCallback(async () => {
    try {
      const {data} = await instance.get(
        `/api/place/search?keyword=${searchWord}&pageNum=${page.current}&areaCode=0&sigunguCode=0`
      );
      setPosts((prevPosts) => [...prevPosts, ...data.content]);
      setHasNextPage(data.content.length === 10);
      if (data.content.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('TITLE_NAME', JSON.stringify(cose))
  },[cose]);


  const handleAddKeyword = (text,index) => {
    const newKeyword = {
      id: Date.now(),
      title : text[0],
      placeId: text[1]
    }
    setCose([...cose,newKeyword])
    window.location.replace('/cose/add')

  } 

  const initialization = (e) => {
    sessionStorage.removeItem("Title");
  };


  useEffect(() => {
    initialization();
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

  const close = () => {
    setModalOn(false);
  }
  return (
    <StList>
      <CoseHeader searchWords={searchWord}/>
      <Container>
      <HeadTitle>
        {modalOn
        ?<img alt='filter' src={filter} style={{display:"none"}}></img>
        :<img  alt='filter' src={filter} onClick={() => setModalOn(true)}></img>
        }
      </HeadTitle>
      <HelpP></HelpP>
      <CancelBut onClick={() => navigate('/cose/add')}>뒤로가기</CancelBut>
      {modalOn === true
      ?<CoseSelectModal close={close} searchWord={searchWord}/>
      :null
      }
      <Content>
        {posts &&
          posts.map((list) => (
            <Card key={list.placeId} 
                onClick={() => {
                    handleAddKeyword([list.title,list.placeId])
                }}>
              {list.image == null ? (
                <>
                  <BasicImg src={basicImg}/>
                  <Name>
                    <ListTitle style={{ color: "#414141" }}>
                      {list.title}
                    </ListTitle>
                    <div style={{ display: "flex" }}>
                      <FaStar
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      />
                      {list.star}
                    </div>
                  </Name>
                </>
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
                        style={{ color: "#fcc419", marginRight: "0.3rem", marginTop: "0.2rem" }}
                      /> {list.star}
                    </div>
                  </Name>
                </>
              )}
            </Card>
          ))}
      </Content>
      <div ref={observerTargetEl} />
      </Container>
    </StList>
  );
};

export default MapSearch;

const StList = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
  z-index: 999;
`;

const Container = styled.div`
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

const HeadTitle = styled.div`
  display: flex;
  position: fixed;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 40px 0;
  top: 89px;
  max-width: 428px;
  width: 100%;
  z-index: 3;

  & img {
    color: #ffc0c0;
    height:60px;
    cursor:pointer;
  }

`;
const HelpP = styled.p`
  max-width: 428px;
  width:100%;
  padding-top:8.8rem;
  justify-content: flex-start;
  text-align:start;
  color:rgb(255, 133, 133);
  background-color: #ffffff;
  display: flex;
  position:fixed;
  height:60px;
  z-index:2;
`
const Card = styled.div`
  text-align: center;
`;

const Content = styled.div`
  position: relative;
  top: 280px;
`;

const BasicImg = styled.img`
  position: relative;
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
  width: 100%;
  height: 235px;
  border-radius: 20px;
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
  margin-left: 35px;
  color: #ffffff;
  font-size: 23px;
  line-height: 33px;
  margin-block-end: 0;
  margin-block-start: 0;
  gap: 20px;
`;

const ListTitle = styled.div`
  display: block;
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const CancelBut = styled.p`
  cursor: pointer;
  font-weight: bold;
  color: #abd4e2;
  background-color: white;
  border: 3px solid #abd4e2;
  height: 3.5rem;
  top:12.5rem;
  border-radius: 5px;
  line-height: 3.5rem;
  position:fixed;
  width:100%;
  z-index:1;
  max-width:420px;
  display:flex;
  justify-content:center;
  font-size:1.6rem;
`;