import { BrowserRouter, Route, Routes } from "react-router-dom";

// user
import Login from "../pages/user/Login";
import KakaoLogin from "../pages/user/KakaoLogin";
import SignUp from "../pages/user/SignUp";

// list
import Select from "../pages/tourist/Select";
import List from "../pages/tourist/List";
import Detail from "../pages/tourist/Detail";
import DetailRevise from "../componenets/details/DetailRevise";
import DetailForm from "../componenets/details/DetailForm";
import Main from "../pages/tourist/Main";
import Random from "../pages/tourist/Random";
import RndLocation from "../componenets/random/RndLocation";
import RandomSelect from "../componenets/random/RandomSelect";
import RandomList from "../componenets/random/RandomList";
import SearchPage from "../pages/tourist/SearchPage";
import SearchSelList from "../componenets/searchList/SearchSelList";
import WorldCup from "../componenets/worldCup/WorldCup";
import Match from "../componenets/worldCup/Match";
import RecentReview from "../pages/tourist/RecentReview";

// mypage
import MyPage from "../pages/mypage/MyPage";
import MyPageChange from "../pages/mypage/MyPageChange";
import MyRequestDetail from "../componenets/mypage/mypage/request/MyRequestDetail";
import MapLike from "../componenets/mypage/mypage/likeList/MapLike";
import SelectLike from "../componenets/mypage/mypage/likeList/SelectLike";

//cose
import MapSearch from "../componenets/cose/MapSearch";
import Cose from "../pages/cose/Cose";
import CoseMap from "../componenets/cose/CoseMap";
import MapLine from "../componenets/cose/MapLine";
import MapSearchSel from "../componenets/cose/MapSearchSel";
import CoseRevise from "../componenets/cose/coseReviser/CoseRevise";
import ReviseSearch from "../componenets/cose/coseReviser/ReviseSearch";
import ReviseSearchSel from "../componenets/cose/coseReviser/ReviseSearchSel";

// request
import EditRequest from "../pages/request/EditRequest";
import PostRequest from "../pages/request/PostRequest";

// manager
import RequestList from "../pages/manager/RequestList";
import RequestDetail from "../pages/manager/RequestDetail";
import Post from "../pages/manager/Post";
import Edit from "../pages/manager/Edit";

import { useEffect } from "react";
import axios from "axios";
import { EventSourcePolyfill } from "event-source-polyfill";
import { instance } from "./Api";





function Router() {
  // 토큰 재발급
  const getToken = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/member/retoken",
        {},
        {
          headers: {
            RefreshToken: sessionStorage.getItem("REFRESH_TOKEN"),
          },
        }
      );

      sessionStorage.removeItem("REFRESH_TOKEN");
      sessionStorage.setItem("ACCESS_TOKEN", res.headers.authorization);
      sessionStorage.setItem("REFRESH_TOKEN", res.headers.refreshtoken);

      // console.log("토큰이 갱신되었습니다.");
    } catch {
      // console.log("토큰 갱신에 실패하였습니다.");
    }
  };

  useEffect(() => {
    // refreshToken이 존재하면 구독하기
    if (sessionStorage.getItem("REFRESH_TOKEN")) {
      isSSE();
    }

    // refreshToken이 존재하면 토큰 재발급
    setInterval(() => {
      if (sessionStorage.getItem("REFRESH_TOKEN") !== null) {
        getToken();
      } else {
        return;
      }
    }, 600000);
  }, []);

  // 스크롤 맨 위 고정
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SSE
  let eventSource = undefined;

  const isSSE = () => {
    eventSource = new EventSourcePolyfill(
      process.env.REACT_APP_BASE_URL + `/api/auth/notice/subscribe`,
      {
        headers: {
          Authorization: sessionStorage.getItem("ACCESS_TOKEN"),
          RefreshToken: sessionStorage.getItem("REFRESH_TOKEN"),
        },
        heartbeatTimeout: 1000 * 60 * 20,
      }
    );
    // console.log("구독성공");
    eventSource.addEventListener("sse", function (event) {
      console.log(event)
      const data = JSON.parse(event.data);
      (async () => {
        // console.log(data)
        // 브라우저 알림
        const showNotification = () => {
          const notification = new Notification(
            "돌고돌래에서 알림이 도착했습니다.",
            {
              body: data.content,
            }
          );
          // console.log("알림성공");
          setTimeout(() => {
            notification.close();
          }, 10 * 1000);
          // notification.addEventListener("click", () => {
          //   window.open(data.url, "_blank");
          // });
        };
        // 브라우저 알림 허용 권한
        let granted = false;
        if (Notification.permission === "granted") {
          granted = true;
        } else if (Notification.permission !== "denied") {
          let permission = await Notification.requestPermission();
          granted = permission === "granted";
        }
        // 알림 보여주기
        if (granted === true) {
          showNotification();
        }
      })();
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* main */}
        <Route path="/" element={<Main />} />

        {/* user */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />

        {/* mypage */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/change" element={<MyPageChange />} />
        <Route path="/mypage/like/map" element={<MapLike />} />
        <Route path="/mypage/like/select" element={<SelectLike />} />
        <Route path="/myrequest/detail/:id" element={<MyRequestDetail />} />

        {/* request */}
        <Route path="/request/edit/:id" element={<EditRequest />} />
        <Route path="/request/post" element={<PostRequest />} />

        {/* manager */}
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/post" element={<Post />} />
        <Route path="/request/list" element={<RequestList />} />
        <Route path="/request/detail/:id" element={<RequestDetail />} />

        {/* list */}
        <Route path="/select" element={<Select />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/detail/update/:placeId/:id" element={<DetailRevise />} />
        <Route path="/detail/form/:id" element={<DetailForm />} />
        <Route path="/random" element={<Random />} />
        <Route path="/rndlocation" element={<RndLocation />} />
        <Route path="/rndselect/:si/:area" element={<RandomSelect />} />
        <Route path="/rnd" element={<RandomList />} />
        <Route path="/search/:title" element={<SearchPage />} />
        <Route path="/search/:title/:si/:area" element={<SearchSelList />} />
        <Route path="/cose" element={<Cose />} />
        <Route path="/cose/detail/:id" element={<CoseMap />} />
        <Route path="/cose/revise/:id" element={<CoseRevise />} />
        <Route path="/cose/add" element={<MapLine />} />
        <Route path="/cose/add/:searchWord" element={<MapSearch />} />
        <Route path="/cose/add/:searchWord/:si/:area" element={<MapSearchSel />} />
        <Route path="/cose/revises/:searchWord" element={<ReviseSearch />} />
        <Route path="/cose/revises/:searchWord/:si/:area" element={<ReviseSearchSel />} />
        <Route path="/ideal" element={<WorldCup />} />
        <Route path="/ideal/match" element={<Match />} />
        <Route path="/review/recent" element={<RecentReview />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
