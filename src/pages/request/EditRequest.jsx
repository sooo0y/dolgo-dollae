import React from "react";
import styled from "styled-components";
import Header from "../../componenets/header/Header";
import { useState } from "react";
import { instance } from "../../shared/Api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditRequest = () => {
  const navigate = useNavigate();

  // storage에서 가져온 id와 title
  const id = sessionStorage.getItem("place_id");
  const title = sessionStorage.getItem("place_title");

  const initialState = {
    title: title,
    content: "",
    type: "",
  };

  const [req, setReq] = useState(initialState);
  console.log(req);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setReq({ ...req, [name]: value });
  };

  const [image, setImage] = useState([]);
  const [fileImage, setFileImage] = useState([]);

  const onChangeImg = (e) => {
    const imageList = e.target.files;
    const imageLists = [...image];

    const imgFiles = [...fileImage];
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(e.target.files[i]);
      imgFiles.push(nowImageUrl);
    }

    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl1 = e.target.files[i];
      imageLists.push(nowImageUrl1);
      continue;
    }

    setFileImage(imgFiles);
    setImage(imageLists);
  };

  //이미지 삭제
  const handleDeleteImage = (id) => {
    setFileImage(fileImage.filter((_, index) => index !== id));
    setImage(image.filter((_, index) => index !== id));
  };

  const onSubmitHandler = async (e) => {
    if (req.content === "" || req.type === "") {
      Swal.fire({
        text: "필수 항목을 모두 작성해주세요.",
        icon: "warning",
      });
      return;
    } else {
      const json = JSON.stringify(req);
      const blob = new Blob([json], { type: "application/json" });
      const formData = new FormData();

      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
      formData.append("data", blob);

      await instance.post(`/api/auth/order/${id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      Swal.fire({
        text: "게시글 수정 또는 삭제 요청이 완료되었습니다.",
        icon: "success",
      });
      navigate(-1);
    }
  };

  return (
    <StEditRequest>
      <Header />
      <Container>
        <div>
          <Title>
            여행지 <span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </Title>
          <Name>{title}</Name>
        </div>
        <div>
          <Title>
            신고 유형 <span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </Title>
          <div
            style={{ display: "flex", marginLeft: "35px", marginTop: "15px" }}
          >
            <label style={{ marginRight: "15px", fontSize: "18px" }}>
              <input
                type="radio"
                name="type"
                value="수정"
                onChange={onChangeHandler}
                style={{ width: "15px", height: "15px", marginRight: "10px" }}
              />
              수정
            </label>
            <label style={{ marginRight: "15px", fontSize: "18px" }}>
              <input
                type="radio"
                name="type"
                value="삭제"
                onChange={onChangeHandler}
                style={{ width: "15px", height: "15px", marginRight: "10px" }}
              />
              삭제
            </label>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Title>
            신고 내용 <span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </Title>
          <Context
            type="text"
            name="content"
            value={req.content}
            onChange={onChangeHandler}
            placeholder="요청할 부분과 사유에 대해 자세히 서술해주세요."
          />
        </div>
        <div>
          <Title>이미지</Title>
          <div style={{ width: "100%" }}>
            <ImgBox>
              <ImgLabel>
                <img
                  alt=""
                  style={{ height: "1.5rem" }}
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICAgIDxwYXRoIGZpbGw9IiNEQ0RCRTQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI4LjQ3MSAzMkgzLjUzYy0uOTcxIDAtMS44OTQtLjQyMi0yLjUyOS0xLjE1N2wtLjAyNi0uMDNBNCA0IDAgMCAxIDAgMjguMTk4VjguNjA3QTQgNCAwIDAgMSAuOTc0IDUuOTlMMSA1Ljk2YTMuMzQzIDMuMzQzIDAgMCAxIDIuNTI5LTEuMTU2aDIuNTM0YTIgMiAwIDAgMCAxLjUzNy0uNzJMMTAuNC43MkEyIDIgMCAwIDEgMTEuOTM3IDBoOC4xMjZBMiAyIDAgMCAxIDIxLjYuNzJsMi44IDMuMzYzYTIgMiAwIDAgMCAxLjUzNy43MmgyLjUzNGMuOTcxIDAgMS44OTQuNDIzIDIuNTI5IDEuMTU3bC4wMjYuMDNBNCA0IDAgMCAxIDMyIDguNjA2djE5LjU5MWE0IDQgMCAwIDEtLjk3NCAyLjYxN2wtLjAyNi4wM0EzLjM0MyAzLjM0MyAwIDAgMSAyOC40NzEgMzJ6TTE2IDkuNmE4IDggMCAxIDEgMCAxNiA4IDggMCAwIDEgMC0xNnptMCAxMi44YzIuNjQ3IDAgNC44LTIuMTUzIDQuOC00LjhzLTIuMTUzLTQuOC00LjgtNC44YTQuODA1IDQuODA1IDAgMCAwLTQuOCA0LjhjMCAyLjY0NyAyLjE1MyA0LjggNC44IDQuOHoiLz4KPC9zdmc+Cg=="
                />
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
          <PostBtn
            onClick={() => {
              onSubmitHandler();
              sessionStorage.removeItem("place_id");
            }}
          >
            작성하기
          </PostBtn>
          <CancelBtn
            onClick={() => {
              navigate(-1);
              sessionStorage.removeItem("place_id");
            }}
          >
            취소
          </CancelBtn>
        </Buttons>
      </Container>
    </StEditRequest>
  );
};

export default EditRequest;

const StEditRequest = styled.div`
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
const Name = styled.p`
  font-size: 20px;
  padding-top: 10px;
  padding-left: 38px;
  color: #727272;
`;
const Buttons = styled.div`
  display: flex;
  padding-top: 40px;
  padding-bottom: 50px;
  gap: 20px;
  margin: 0 auto;
  width: 90%;
`;
const Context = styled.textarea`
  width: 80%;
  height: 200px;
  display: flex;
  margin: 0 auto;
  border: none;
  border-radius: 15px;
  resize: none;
  font-size: 14px;
  font-family: bold;
  font-weight: lighter;
  padding: 15px;
  line-height: 30px;
`;
const CancelBtn = styled.div`
  width: 150px;
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
  width: 150px;
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
