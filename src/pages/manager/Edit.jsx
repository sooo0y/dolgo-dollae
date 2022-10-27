import React from "react";
import styled from "styled-components";
import Header from "../../componenets/header/Header";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../shared/Api";
import { useEffect } from "react";
import img from "../../assert/image/image.svg";
import Swal from "sweetalert2";

const Post = () => {
  const navigate = useNavigate();

  // input에 입력한 img를 저장할 state
  const [image, setImage] = useState([]);

  // image 미리보기를 위한 state
  const [fileImage, setFileImage] = useState([]);

  // place_id를 param에서 가져옴
  const place_id = useParams();

  // 선택한 Do, Si, Theme를 저장할 state
  const [selectedDo, setSelectedDo] = useState();
  const [selectedSi, setSelectedSi] = useState();
  const [selectedTheme, setSelectedTheme] = useState();

  // 기존 데이터를 저장할 state
  const initialState = {
    title: "",
    content: "",
    address: "",
  };

  const [req, setReq] = useState(initialState);
  const [imageUrl, setImageUrl] = useState([]);

  // 서버로부터 기존 데이터 받아와서 state에 저장
  const getData = async () => {
    const res = await instance.get(`/api/place/${place_id.id}`);
    setReq({
      ...req,
      title: res.data.title,
      content: res.data.content,
      address: res.data.address,
    });
    setImageUrl(res.data.imageUrl);
  };

  // 렌더링될 때마다 getData 함수 실행
  useEffect(() => {
    getData();
  }, []);

  // input에 입력한 값을 state에 저장해줄 onChange 함수
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setReq({ ...req, [name]: value });
  };

  const onChangeImg = (e) => {
    // input에 입력한 값을 imageList에 저장
    const imageList = e.target.files;

    // image list 복사
    const imageLists = [...image];
    const imgFiles = [...fileImage];

    // image를 url로 변환하여 imgFiles에 저장
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(e.target.files[i]);
      imgFiles.push(nowImageUrl);
    }

    // image를 imageLists에 저장
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl1 = e.target.files[i];
      imageLists.push(nowImageUrl1);
      continue;
    }

    setFileImage(imgFiles);
    setImage(imageLists);
  };

  // 이미지 삭제
  const handleDeleteImage = (id) => {
    setFileImage(fileImage.filter((_, index) => index !== id));
    setImage(image.filter((_, index) => index !== id));
  };

  // 기존 이미지 삭제
  const handleDeleteImage1 = (id) => {
    setImageUrl(imageUrl.filter((_, index) => index !== id));
  };

  // 수정하기 버튼 Click시 서버로 데이터 전송
  const onSubmitHandler = async (e) => {
    const request = {
      title: req.title,
      content: req.content,
      address: req.address,
      existUrlList: imageUrl,
      theme: selectedTheme,
      areaCode: selectedDo,
      sigunguCode: selectedSi,
    };

    // 빈값일 때 alert
    if (
      request.content === "" ||
      request.address === "" ||
      request.theme === undefined ||
      request.areaCode === undefined ||
      request.sigunguCode === undefined
    ) {
      Swal.fire({
        text: "필수 항목을 모두 작성해주세요.",
        icon: "warning",
      });
      return;
    }
    // formData 형식으로 변환
    else {
      const json = JSON.stringify(request);
      const blob = new Blob([json], { type: "application/json" });
      const formData = new FormData();

      // image를 formData에 image라는 이름으로 저장
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
      // blob을 formData에 data라는 이름으로 저장
      formData.append("data", blob);

      // 서버로 formData 전송
      try {
        const res = await instance.put(
          `/api/auth/place/${place_id.id}`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        Swal.fire({
          text: "게시글이 수정되었습니다.",
          icon: "success",
        });
        navigate(`/request/detail/${req.id}`);
        sessionStorage.removeItem("sameDo");
      } catch {
        Swal.fire({
          text: "내용을 다시 확인해주세요.",
          icon: "warning",
        });
      }
    }
  };

  // 지역별 name, value
  const doList = [
    { name: "도", value: "" },
    { name: "서울", value: 1 },
    { name: "인천", value: 2 },
    { name: "대전", value: 3 },
    { name: "대구", value: 4 },
    { name: "광주", value: 5 },
    { name: "부산", value: 6 },
    { name: "울산", value: 7 },
    { name: "세종", value: 8 },
    { name: "경기", value: 31 },
    { name: "강원", value: 32 },
    { name: "충북", value: 33 },
    { name: "충남", value: 34 },
    { name: "경북", value: 35 },
    { name: "경남", value: 36 },
    { name: "전북", value: 37 },
    { name: "전남", value: 38 },
    { name: "제주", value: 39 },
  ];

  // do 선택 값을 selectedDo와 storage에 저장
  const doSelectHandler = (e) => {
    setSelectedDo(e.target.value);
    const sameDo = doList.find((list) => list.value == e.target.value);
    sessionStorage.setItem("sameDo", sameDo.name);
  };

  const sameDo = sessionStorage.getItem("sameDo");

  // 세부 지역별 해당 do, name, value
  const siList = [
    { do: "서울", name: "시/군", value: "" },
    { do: "서울", name: "강남", value: 1 },
    { do: "서울", name: "강동", value: 2 },
    { do: "서울", name: "강북", value: 3 },
    { do: "서울", name: "강서", value: 4 },
    { do: "서울", name: "관악", value: 5 },
    { do: "서울", name: "광진", value: 6 },
    { do: "서울", name: "구로", value: 7 },
    { do: "서울", name: "금천", value: 8 },
    { do: "서울", name: "노원", value: 9 },
    { do: "서울", name: "도봉", value: 10 },
    { do: "서울", name: "동대문", value: 11 },
    { do: "서울", name: "동작", value: 12 },
    { do: "서울", name: "마포", value: 13 },
    { do: "서울", name: "서대문", value: 14 },
    { do: "서울", name: "서초", value: 15 },
    { do: "서울", name: "성동", value: 16 },
    { do: "서울", name: "성북", value: 17 },
    { do: "서울", name: "송파", value: 18 },
    { do: "서울", name: "양천", value: 19 },
    { do: "서울", name: "영등포", value: 20 },
    { do: "서울", name: "용산", value: 21 },
    { do: "서울", name: "은평", value: 22 },
    { do: "서울", name: "종로", value: 23 },
    { do: "서울", name: "중구", value: 24 },
    { do: "서울", name: "중랑", value: 25 },
    { do: "인천", name: "시/군", value: "" },
    { do: "인천", name: "강화", value: 1 },
    { do: "인천", name: "계양", value: 2 },
    { do: "인천", name: "남동", value: 3 },
    { do: "인천", name: "동구", value: 4 },
    { do: "인천", name: "미추홀", value: 5 },
    { do: "인천", name: "부평", value: 6 },
    { do: "인천", name: "서구", value: 7 },
    { do: "인천", name: "연수", value: 8 },
    { do: "인천", name: "옹진", value: 9 },
    { do: "인천", name: "중구", value: 10 },
    { do: "대전", name: "시/군", value: "" },
    { do: "대전", name: "대덕", value: 1 },
    { do: "대전", name: "동구", value: 2 },
    { do: "대전", name: "서구", value: 3 },
    { do: "대전", name: "유성", value: 4 },
    { do: "대전", name: "중구", value: 5 },
    { do: "대구", name: "시/군", value: "" },
    { do: "대구", name: "남구", value: 1 },
    { do: "대구", name: "달서", value: 2 },
    { do: "대구", name: "달성", value: 3 },
    { do: "대구", name: "동구", value: 4 },
    { do: "대구", name: "북구", value: 5 },
    { do: "대구", name: "서구", value: 6 },
    { do: "대구", name: "수성", value: 7 },
    { do: "대구", name: "중구", value: 8 },
    { do: "광주", name: "시/군", value: "" },
    { do: "광주", name: "광산", value: 0 },
    { do: "광주", name: "남구", value: 0 },
    { do: "광주", name: "동구", value: 0 },
    { do: "광주", name: "북구", value: 0 },
    { do: "광주", name: "서구", value: 0 },
    { do: "부산", name: "시/군", value: "" },
    { do: "부산", name: "강서", value: 1 },
    { do: "부산", name: "금정", value: 2 },
    { do: "부산", name: "기장", value: 3 },
    { do: "부산", name: "남구", value: 4 },
    { do: "부산", name: "동구", value: 5 },
    { do: "부산", name: "동래", value: 6 },
    { do: "부산", name: "부산진", value: 7 },
    { do: "부산", name: "북구", value: 8 },
    { do: "부산", name: "사상", value: 9 },
    { do: "부산", name: "사하", value: 10 },
    { do: "부산", name: "서구", value: 11 },
    { do: "부산", name: "수영", value: 12 },
    { do: "부산", name: "연제", value: 13 },
    { do: "부산", name: "영도", value: 14 },
    { do: "부산", name: "중구", value: 15 },
    { do: "부산", name: "해운대", value: 16 },
    { do: "울산", name: "시/군", value: "" },
    { do: "울산", name: "남구", value: 2 },
    { do: "울산", name: "동구", value: 3 },
    { do: "울산", name: "북구", value: 4 },
    { do: "울산", name: "울주", value: 5 },
    { do: "울산", name: "중구", value: 1 },
    { do: "세종", name: "시/군.", value: "" },
    { do: "세종", name: "세종", value: 0 },
    { do: "경기", name: "시/군", value: "" },
    { do: "경기", name: "가평", value: 1 },
    { do: "경기", name: "고양", value: 2 },
    { do: "경기", name: "과천", value: 3 },
    { do: "경기", name: "광명", value: 4 },
    { do: "경기", name: "광주", value: 5 },
    { do: "경기", name: "구리", value: 6 },
    { do: "경기", name: "군포", value: 7 },
    { do: "경기", name: "김포", value: 8 },
    { do: "경기", name: "남양주", value: 9 },
    { do: "경기", name: "동두천", value: 10 },
    { do: "경기", name: "부천", value: 11 },
    { do: "경기", name: "성남", value: 12 },
    { do: "경기", name: "수원", value: 13 },
    { do: "경기", name: "시흥", value: 14 },
    { do: "경기", name: "안산", value: 15 },
    { do: "경기", name: "안성", value: 16 },
    { do: "경기", name: "안양", value: 17 },
    { do: "경기", name: "양주", value: 18 },
    { do: "경기", name: "양평", value: 19 },
    { do: "경기", name: "여주", value: 20 },
    { do: "경기", name: "연천", value: 21 },
    { do: "경기", name: "오산", value: 22 },
    { do: "경기", name: "용인", value: 23 },
    { do: "경기", name: "의왕", value: 24 },
    { do: "경기", name: "의정부", value: 25 },
    { do: "경기", name: "이천", value: 26 },
    { do: "경기", name: "파주", value: 27 },
    { do: "경기", name: "평택", value: 28 },
    { do: "경기", name: "포천", value: 29 },
    { do: "경기", name: "하남", value: 30 },
    { do: "경기", name: "화성", value: 31 },
    { do: "강원", name: "시/군", value: "" },
    { do: "강원", name: "강릉", value: 1 },
    { do: "강원", name: "고성", value: 2 },
    { do: "강원", name: "동해", value: 3 },
    { do: "강원", name: "삼척", value: 4 },
    { do: "강원", name: "속초", value: 5 },
    { do: "강원", name: "양구", value: 6 },
    { do: "강원", name: "양양", value: 7 },
    { do: "강원", name: "영월", value: 8 },
    { do: "강원", name: "원주", value: 9 },
    { do: "강원", name: "인제", value: 10 },
    { do: "강원", name: "정선", value: 11 },
    { do: "강원", name: "철원", value: 12 },
    { do: "강원", name: "춘천", value: 13 },
    { do: "강원", name: "태백", value: 14 },
    { do: "강원", name: "평창", value: 15 },
    { do: "강원", name: "홍천", value: 16 },
    { do: "강원", name: "화천", value: 17 },
    { do: "강원", name: "횡성", value: 18 },
    { do: "충북", name: "시/군", value: "" },
    { do: "충북", name: "괴산", value: 1 },
    { do: "충북", name: "단양", value: 2 },
    { do: "충북", name: "보은", value: 3 },
    { do: "충북", name: "영동", value: 4 },
    { do: "충북", name: "옥천", value: 5 },
    { do: "충북", name: "음성", value: 6 },
    { do: "충북", name: "제천", value: 7 },
    { do: "충북", name: "증평", value: 12 },
    { do: "충북", name: "진천", value: 8 },
    { do: "충북", name: "청원", value: 9 },
    { do: "충북", name: "청주", value: 10 },
    { do: "충북", name: "충주", value: 11 },
    { do: "충남", name: "시/군", value: "" },
    { do: "충남", name: "계룡", value: 16 },
    { do: "충남", name: "공주", value: 1 },
    { do: "충남", name: "금산", value: 2 },
    { do: "충남", name: "논산", value: 3 },
    { do: "충남", name: "당진", value: 4 },
    { do: "충남", name: "보령", value: 5 },
    { do: "충남", name: "부여", value: 6 },
    { do: "충남", name: "서산", value: 7 },
    { do: "충남", name: "서천", value: 8 },
    { do: "충남", name: "아산", value: 9 },
    { do: "충남", name: "예산", value: 11 },
    { do: "충남", name: "천안", value: 12 },
    { do: "충남", name: "청양", value: 13 },
    { do: "충남", name: "태안", value: 14 },
    { do: "충남", name: "홍성", value: 15 },
    { do: "경북", name: "시/군", value: "" },
    { do: "경북", name: "경산", value: 1 },
    { do: "경북", name: "경주", value: 2 },
    { do: "경북", name: "고령", value: 3 },
    { do: "경북", name: "구미", value: 4 },
    { do: "경북", name: "군위", value: 5 },
    { do: "경북", name: "김천", value: 6 },
    { do: "경북", name: "문경", value: 7 },
    { do: "경북", name: "봉화", value: 8 },
    { do: "경북", name: "상주", value: 9 },
    { do: "경북", name: "성주", value: 10 },
    { do: "경북", name: "안동", value: 11 },
    { do: "경북", name: "영덕", value: 12 },
    { do: "경북", name: "영양", value: 13 },
    { do: "경북", name: "영주", value: 14 },
    { do: "경북", name: "영천", value: 15 },
    { do: "경북", name: "예천", value: 16 },
    { do: "경북", name: "울릉", value: 17 },
    { do: "경북", name: "울진", value: 18 },
    { do: "경북", name: "의성", value: 19 },
    { do: "경북", name: "청도", value: 20 },
    { do: "경북", name: "청송", value: 21 },
    { do: "경북", name: "칠곡", value: 22 },
    { do: "경북", name: "포항", value: 23 },
    { do: "경남", name: "시/군", value: "" },
    { do: "경남", name: "거제", value: 1 },
    { do: "경남", name: "거창", value: 2 },
    { do: "경남", name: "고성", value: 3 },
    { do: "경남", name: "김해", value: 4 },
    { do: "경남", name: "남해", value: 5 },
    { do: "경남", name: "마산", value: 6 },
    { do: "경남", name: "밀양", value: 7 },
    { do: "경남", name: "사천", value: 8 },
    { do: "경남", name: "산청", value: 9 },
    { do: "경남", name: "양산", value: 10 },
    { do: "경남", name: "의령", value: 12 },
    { do: "경남", name: "진주", value: 13 },
    { do: "경남", name: "진해", value: 14 },
    { do: "경남", name: "창녕", value: 15 },
    { do: "경남", name: "창원", value: 16 },
    { do: "경남", name: "통영", value: 17 },
    { do: "경남", name: "하동", value: 18 },
    { do: "경남", name: "함안", value: 19 },
    { do: "경남", name: "함양", value: 20 },
    { do: "경남", name: "합천", value: 21 },
    { do: "전북", name: "시/군", value: "" },
    { do: "전북", name: "고창", value: 1 },
    { do: "전북", name: "군산", value: 2 },
    { do: "전북", name: "김제", value: 3 },
    { do: "전북", name: "남원", value: 4 },
    { do: "전북", name: "모주", value: 5 },
    { do: "전북", name: "부안", value: 6 },
    { do: "전북", name: "순창", value: 7 },
    { do: "전북", name: "완주", value: 8 },
    { do: "전북", name: "익산", value: 9 },
    { do: "전북", name: "임실", value: 10 },
    { do: "전북", name: "장수", value: 11 },
    { do: "전북", name: "전주", value: 12 },
    { do: "전북", name: "정읍", value: 13 },
    { do: "전북", name: "진안", value: 14 },
    { do: "전남", name: "시/군", value: "" },
    { do: "전남", name: "강진", value: 1 },
    { do: "전남", name: "고흥", value: 2 },
    { do: "전남", name: "곡성", value: 3 },
    { do: "전남", name: "광양", value: 4 },
    { do: "전남", name: "구례", value: 5 },
    { do: "전남", name: "나주", value: 6 },
    { do: "전남", name: "담양", value: 7 },
    { do: "전남", name: "목포", value: 8 },
    { do: "전남", name: "무안", value: 9 },
    { do: "전남", name: "보성", value: 10 },
    { do: "전남", name: "순천", value: 11 },
    { do: "전남", name: "신안", value: 12 },
    { do: "전남", name: "여수", value: 13 },
    { do: "전남", name: "영광", value: 16 },
    { do: "전남", name: "영암", value: 17 },
    { do: "전남", name: "완도", value: 18 },
    { do: "전남", name: "장성", value: 19 },
    { do: "전남", name: "장흥", value: 20 },
    { do: "전남", name: "진도", value: 21 },
    { do: "전남", name: "함평", value: 22 },
    { do: "전남", name: "해남", value: 23 },
    { do: "전남", name: "화순", value: 24 },
    { do: "제주", name: "시/군", value: "" },
    { do: "제주", name: "서귀포", value: 3 },
    { do: "제주", name: "제주", value: 4 },
  ];

  // si 선택 값을 selectedSi에 저장
  const SiSelectHandler = (e) => {
    setSelectedSi(e.target.value);
  };

  // 테마 선택
  const themeList = [
    { name: "테마", value: "" },
    { name: "관광", value: "12" },
    { name: "관람", value: "14" },
    { name: "액티비티", value: "28" },
    { name: "식도락", value: "39" },
  ];

  // 테마 선택 값을 selectedTheme에 저장
  const themeSelectHandler = (e) => {
    setSelectedTheme(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StPost>
      <Header />
      <Container>
        <div>
          <Title>
            장소 이름 <span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </Title>
          <Text
            type="text"
            name="title"
            value={req.title}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <Title>
            테마 <span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </Title>
          <Theme onChange={themeSelectHandler} value={selectedTheme}>
            {themeList.map((list) => (
              <option value={list.value} key={list.value}>
                {list.name}
              </option>
            ))}
          </Theme>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Title>
            설명 <span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </Title>
          <Context
            type="text"
            name="content"
            defaultValue={req.content}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <Title>
            지역 <span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </Title>
          <div style={{ display: "flex", width: "90%", margin: "0 auto" }}>
            <Address onChange={doSelectHandler}>
              {doList.map((list, idx) => (
                <option key={idx} name={list.name} value={list.value}>
                  {list.name}
                </option>
              ))}
            </Address>
            <Address onChange={SiSelectHandler}>
              {siList.map((list, idx) => {
                return sameDo === list.do ? (
                  <option key={idx} value={list.value}>
                    {list.name}
                  </option>
                ) : null;
              })}
            </Address>
          </div>
          <Title>
            상세 주소 <span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </Title>
          <Text
            type="text"
            name="address"
            defaultValue={req.address}
            onChange={onChangeHandler}
            style={{ width: "85%" }}
          />
        </div>
        <div>
          <Title>이미지</Title>
          <div style={{ width: "100%" }}>
            <ImgBox>
              <ImgLabel>
                <img alt="" style={{ height: "1.5rem" }} src={img} />
                <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
                  이미지 등록
                </p>
                <ImgInput
                  type="file"
                  name="imgUrl"
                  accept="image/*"
                  multiple
                  onChange={onChangeImg}
                  id="image"
                />
              </ImgLabel>
              {imageUrl?.map((image, id) => (
                <div key={id}>
                  <img
                    style={{
                      width: "102px",
                      height: "102px",
                      borderRadius: "10px",
                    }}
                    alt={`${image}-${id}`}
                    src={image}
                  />
                  <DeleteImg onClick={() => handleDeleteImage1(id)}>
                    X
                  </DeleteImg>
                </div>
              ))}
              {fileImage.map((image, id) => (
                <div key={id}>
                  <Img alt={`${image}-${id}`} src={image} />
                  <DeleteImg onClick={() => handleDeleteImage(id)}>X</DeleteImg>
                </div>
              ))}
            </ImgBox>
          </div>
        </div>
        <Buttons>
          <PostBtn onClick={onSubmitHandler}>수정하기</PostBtn>
          <CancelBtn
            onClick={() => {
              navigate(-1);
              sessionStorage.removeItem("sameDo");
            }}
          >
            취소
          </CancelBtn>
        </Buttons>
      </Container>
    </StPost>
  );
};

export default Post;

const StPost = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
  background-color: #eef6fa;
`;
const Container = styled.div`
  padding-top: 120px;
`;
const Title = styled.p`
  width: 200px;
  height: 40px;
  padding: 40px 0px 0px 35px;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 40px;
`;
const Buttons = styled.div`
  display: flex;
  padding-top: 40px;
  padding-bottom: 50px;
  margin: 0 auto;
  width: 80%;
`;
const Context = styled.textarea`
  width: 85%;
  height: 200px;
  display: flex;
  margin: 0 auto;
  padding: 15px;
  border: none;
  border-radius: 15px;
  resize: none;
  font-size: 14px;
  font-family: bold;
  font-weight: lighter;
  line-height: 25px;
`;
const CancelBtn = styled.div`
  width: 40%;
  height: 40px;
  font-weight: 700;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
  color: #abd4e2;
  background: white;
  border: 3px solid #abd4e2;
  border-radius: 15px;
  cursor: pointer;
  margin: 0 auto;
`;
const PostBtn = styled.div`
  width: 40%;
  height: 40px;
  font-weight: 700;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
  color: white;
  background: #abd4e2;
  border-radius: 15px;
  cursor: pointer;
  margin: 0 auto;
`;
const ImgBox = styled.div`
  display: flex;
  width: 90%;
  margin: 20px 30px;
  flex-wrap: wrap;
  gap: 30px;
`;
const ImgInput = styled.input`
  display: none;
`;
const ImgLabel = styled.label`
  width: 100px;
  height: 100px;
  position: relative;
  background: white;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(155, 153, 169);
  font-size: 1rem;
  border-radius: 15px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  font-synthesis: none;
  ::-webkit-font-smoothing {
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
  }
`;
const DeleteImg = styled.button`
  margin: -10.3px;
  position: relative;
  color: red;
  right: 11.5px;
  bottom: 88px;
  background-color: white;
  border: none;
  cursor: pointer;
`;
const Text = styled.input`
  display: flex;
  margin: 10px auto;
  width: 90%;
  height: 52px;
  background-color: white;
  border-radius: 15px;
  border: none;
  padding-left: 10px;
  font-size: 14px;
  font-family: bold;
  font-weight: lighter;
`;
const Theme = styled.select`
  width: 92%;
  height: 52px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  border: none;
  border-radius: 15px;
  text-align: center;
  font-family: bold;
  font-size: 16px;
  cursor: pointer;
`;
const Address = styled.select`
  width: 47%;
  height: 52px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  border: none;
  border-radius: 15px;
  text-align: center;
  font-family: bold;
  font-size: 16px;
  cursor: pointer;
`;
