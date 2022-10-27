/* global kakao */
import React from "react";
import styled from "styled-components";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { _getComments } from "../../redux/modules/comment";
import Review from "../../componenets/details/Review";
import DetailImage from "../../componenets/details/DetailImage";
import { instance } from "../../shared/Api";
import Like from "../../componenets/like/Like";
import Header from "../../componenets/header/Header";
import { FaStar } from "react-icons/fa";
import ThemeList from "../../componenets/theme/ThemeList";
import DeletePostModal from "../../componenets/modal/DeletePostModal";
import Swal from "sweetalert2";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState("");
  const [number, setNumber] = useState(1);
  const login = sessionStorage.getItem("username");

  // 게시글 삭제버튼 클릭시 modal open
  const [deleteModal, setDeleteModal] = useState(false);

  const { isLoading, error, comment } = useSelector((state) => state.comment);

  const fetch = async () => {
    const response = await instance.get(`/api/place/${id}`);
    setPosts(response?.data);
  };
  useEffect(() => {
    dispatch(_getComments(id));
    // dispatch(_getDetail(id))
    fetch();
  }, []);

  if (isLoading) {
    return <div>로딩중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const newText = posts?.content?.replace(/(<([^>]+)>)/gi, "\n"); //태그 제거
  const tmp = newText?.replace(/&nbsp;/gi, " "); //공백 제거
  const tmp2 = tmp?.replace(/&lt;/gi, ""); //부등호(<) 제거
  const tmp3 = tmp2?.replace(/&gt;/gi, ""); //부등호(>) 제거

  const requestBtn = () => {
    if (login === null) {
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        icon: "warning",
      });
      navigate("/login");
    } else {
      sessionStorage.setItem("place_id", posts.id);
      sessionStorage.setItem("place_title", posts.title);
      navigate(`/request/edit/${posts.id}`);
    }
  };

  return (
    <>
      <BoxDiv>
        <Header />
        <Box>
          <Cover>
            <ImgCover>
              <DetailImage post={posts} key={posts.id} />
              <ThemeDiv>
                <ThemeList post={posts} />
              </ThemeDiv>
              <TitleLikeDiv>
                <TitleSpan>{posts.title}</TitleSpan>
                <Like id={id}></Like>
              </TitleLikeDiv>
              {/* {posts.likes} */}
              <StarThemeDiv>
                <div style={{ display: "flex" }}>
                  <FaStar
                    style={{
                      color: "#fcc419",
                      marginRight: "0.3rem",
                      marginTop: "-0.1rem",
                    }}
                  />
                  <span style={{ fontWeight: "600", lineHeight: "1rem" }}>
                    {posts.star}
                  </span>
                  <span style={{ color: "#8f8f8f", lineHeight: "1rem" }}>
                    /5
                  </span>
                </div>
                <div>
                  <Request style={{ marginRight: "5px" }} onClick={requestBtn}>
                    🚨
                  </Request>
                </div>
              </StarThemeDiv>
              {sessionStorage.getItem("role") === "ADMIN" ? (
                <Manager>
                  <button onClick={() => navigate(`/edit/${id}`)}>
                    수정
                  </button>
                  <button onClick={() => setDeleteModal(!deleteModal)}>
                    삭제
                  </button>
                </Manager>
              ) : null}
              {deleteModal === true ? (
                <DeletePostModal
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                />
              ) : null}
            </ImgCover>
          </Cover>
          <Title></Title>
          <Location>
            <div style={{ justifyContent: "center", marginBottom: "30px" }}>
              <p
                style={{
                  color: "#BFB8B8",
                  fontSize: "1.3rem",
                  marginBottom: "1rem",
                }}
              >
                위치
              </p>
              <p style={{ fontWeight: "600" }}>{posts.address}</p>
            </div>
            <MapDiv>
              <Map
                center={{ lat: posts?.mapY || "", lng: posts?.mapX || "" }}
                level={8}
                style={{
                  width: "100%",
                  height: "30vh",
                  borderRadius: "20px",
                  margin: "0 auto",
                }}
              >
                <MapMarker
                  position={{
                    lat: posts?.mapY || "",
                    lng: posts?.mapX || "",
                  }}
                />
              </Map>
            </MapDiv>
          </Location>
          <DescDiv>
            <p
              style={{
                color: "#BFB8B8",
                fontSize: "1.3rem",
                marginBottom: "1rem",
              }}
            >
              설명
            </p>
            <DesP>{tmp3}</DesP>
          </DescDiv>
          <SearchDate>
            <SearchP style={{ marginTop: "2rem" }}>더 알아보기</SearchP>
            <SearchDiv>
              <ALink
                target="_blank"
                rel="noreferrer"
                href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${posts.title}`}
              >
                <ImgLink
                  alt=""
                  src="https://www.siksinhot.com/static2/images/mobile/bg_site_img01.gif"
                />
              </ALink>
              <ALink
                target="_blank"
                rel="noreferrer"
                href={`https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=${posts.title}`}
              >
                <ImgLink
                  alt=""
                  src="https://www.siksinhot.com/static2/images/mobile/bg_site_img02.gif"
                />
              </ALink>
              <ALink
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/search?q=${posts.title}`}
              >
                <ImgLink
                  alt=""
                  src="https://www.siksinhot.com/static2/images/mobile/bg_site_img03.gif"
                />
              </ALink>
            </SearchDiv>
          </SearchDate>
          {/* {formOpen === true
          ?<DetailForm close={close}/>
          :null} */}
          <ReviewDiv>
            <Review comment={comment} number={number} />
            {/* <h1 style={{color:"white"}}>공백</h1> */}
          </ReviewDiv>
        </Box>
      </BoxDiv>
    </>
  );
};
export default Detail;

const BoxDiv = styled.div`
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
`;
const Box = styled.div`
  padding-top: 7.4rem;
  /* border:2px solid #79B9D3; */
`;
const Cover = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  /* background: rgb(249, 249, 249); */
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #eef6fa;
`;
const ImgCover = styled.div`
  flex-shrink: 0;
  width: 90%;
  max-width: 428px;
  min-height: 450px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const ThemeDiv = styled.div`
  padding-top: 2rem;
`;

const TitleLikeDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
`;
const TitleSpan = styled.b`
  font-weight: 700;
  font-size: 18px;
  margin: 5px 0;
`;
const Title = styled.div`
  margin: 0 auto;
  width: 100%;
  justify-content: space-between;
  display: flex;
`;
const StarThemeDiv = styled.div`
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Location = styled.div`
  margin: 0 auto;
  width: 90%;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;
const MapDiv = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const DescDiv = styled.div`
  width: 90%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-top: 50px;
`;
const DesP = styled.p`
  font-family: Noto Sans KR;
  text-align: justify;
  white-space: pre-wrap;
  line-height: 30px;
`;
const SearchDate = styled.div`
  padding-top: 20px;
  width: 90%;
  margin: 0 auto;
`;
const SearchP = styled.p`
  color: #bfb8b8;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;
const SearchDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding-top: 10px;
`;
const ALink = styled.a`
  width: 6rem;
  height: 40px;
`;
const ImgLink = styled.img`
  width: 100%;
  height: 100%;
`;
// const CommentDiv = styled.div`
//   border-top: 3px solid #522772;
//   border-bottom: 3px solid #522772;
//   text-align:start;
//   margin-top:10px;
// `
// const FormBut = styled.div`
//  display:flex;
//  justify-content:flex-end;
//  margin-top:60px;
// `
const ReviewDiv = styled.div`
  width: 95%;
  margin: 0 auto;
`;
const Request = styled.span`
  cursor: pointer;
`;
const Manager = styled.div`
  float: right;
  margin-top: 25px;

  & button {
    margin-left: 10px;
    background-color: white;
    border: none;
    font-weight: bold;
    width: 65px;
    height: 25px;
    cursor: pointer;
  }
`;
