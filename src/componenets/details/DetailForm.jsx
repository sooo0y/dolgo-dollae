import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import Header from "../header/Header";
import { useRef } from "react";
import img from "../../assert/image/image.svg";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { _postComment } from "../../redux/modules/comment";
import imageCompression from "browser-image-compression";

const DetailForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const inputFocus = useRef(null);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [contentMessage, setContentMessage] = useState("");
  const [isContent, setIsContent] = useState(false);
  const [title, setTitle] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const [star, setStar] = useState();
  const [image, setImage] = useState([]);
  const [fileImage, setFileImage] = useState([]);
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]);

  //제목부분에 커서
  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    setStar(score);
  };
  //이미지 리사이징
  const compressImage = async (image) => {
    try{
      const options = {
        maxSizeMb: 1,
        maxWidthOrHeight: 600,
        alwaysKeepResolution : true, //품질만 낮추고 항상 너비와 높이 유지
      }
      return await imageCompression(image, options);
    } catch(e){
      console.log(e);
    };
  };

  //이미지 미리보기 및 리사이징
  const onChangeImg = async(e) => {
    const imageList = e.target.files;
    let imageLists = [...image];
    let imgFiles = [...fileImage];
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(e.target.files[i]);
      imgFiles.push(nowImageUrl);
    }
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl1 = e.target.files[i];
      const compressedImage = await compressImage(nowImageUrl1);
      imageLists.push(compressedImage);
    }

    //이미지 개수 최대 3개까지 등록가능
    if (imageLists.length > 3) {
      Swal.fire({
        text: "이미지는 최대 3개까지 등록 가능합니다",
        icon: "warning",
      });
      imageLists = imageLists.slice(0, 3);
    }
    if (imgFiles.length > 3) {
      imgFiles = imgFiles.slice(0, 3);
    }
    setFileImage(imgFiles);
    setImage(imageLists);
  };

  //이미지 삭제
  const handleDeleteImage = (id) => {
    setFileImage(fileImage.filter((_, index) => index !== id));
    setImage(image.filter((_, index) => index !== id));
  };

  //후기 내용 10글자 이상 작성
  const onChangeContent = (e) => {
    const contentRegex =
      /^(?=.*[a-zA-z0-9가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^*+=-]).{10,3000}$/;
    const contentCurrnet = e.target.value;
    setContent(contentCurrnet);

    if (!contentRegex.test(contentCurrnet)) {
      setContentMessage("10글자 이상 작성해주세요");
      setIsContent(false);
    } else {
      setContentMessage(null);
      setIsContent(true);
    }
  };
  const onChangeTitle = (e) => {
    const TitleRegex = /^(?=.*[a-zA-z0-9가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^*+=-]).{1,20}$/;
    const TitleCurrnet = e.target.value;
    setTitle(TitleCurrnet);

    if (!TitleRegex.test(TitleCurrnet)) {
      setTitleMessage("20글자 이하로 작성해주세요 ");
      setIsTitle(false);
    } else {
      setTitleMessage(null);
      setIsTitle(true);
    }
  };
  const data = {
    title: title,
    content: content,
    star: Number(star),
    // nickname:nickname
  };


  const onAddComment = async (e) => {
    e.preventDefault();
    if (title === "" || content === "" || star === 0) {
      Swal.fire({
        text: "필수항목을 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    if (isContent !== true || isTitle !== true) {
      Swal.fire({
        text: "형식을 확인해주세요",
        icon: "warning",
      });
      return;
    }
    let json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    formData.append("data", blob);

    const payload = {
      id: id,
      formData: formData,
    };
    for (let value of payload.formData.values()) {
      console.log(value);
    }
    dispatch(_postComment(payload))
    .then(( dispatch ) => Swal.fire({
      position: 'center',
      icon: 'success',
      title: '작성 완료',
      showConfirmButton: false,
      timer: 1000
    }))
  };

  return (
    <StDetailForm>
      <Header />
      <Box>
        <BoxTitle>
          <BoxSpan>
            <span>*</span>은 필수항목입니다.
          </BoxSpan>
        </BoxTitle>
        <LiTilte>
          <PTitle>
            제목
            <span style={{ color: "rgb(255, 80, 88)", fontWeight: "600" }}>
              *
            </span>
          </PTitle>
          <InputTit
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력해주세요"
            ref={inputFocus}
          />
        </LiTilte>
        <Message>
          {title.length > 0 && <p style={{ color: "red" }}>{titleMessage}</p>}
        </Message>
        <LiImg>
          <ImgTitle>
            <b>이미지</b>
          </ImgTitle>
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
              {fileImage.map((image, id) => (
                <div key={id}>
                  <Img alt={`${image}-${id}`} src={image} />
                  <DeleteImg onClick={() => handleDeleteImage(id)}>X</DeleteImg>
                </div>
              ))}
            </ImgBox>
          </div>
        </LiImg>
        <Wrap>
          <RatingText>
            별점{" "}
            <span style={{ color: "rgb(255, 80, 88)", fontWeight: "600" }}>
              *
            </span>
          </RatingText>
          <StarDiv>
            <Stars>
              {[0, 1, 2, 3, 4].map((el, idx) => {
                return (
                  <FaStar
                    key={idx}
                    size="50"
                    onClick={() => handleStarClick(el)}
                    className={clicked[el] && "yellowStar"}
                  />
                );
              })}
            </Stars>
          </StarDiv>
        </Wrap>
        <LiTilte>
          <PTitle>
            후기
            <span style={{ color: "rgb(255, 80, 88)", fontWeight: "600" }}>
              *
            </span>
          </PTitle>
          <InputCom
            type="text"
            name="content"
            value={content}
            onChange={onChangeContent}
            placeholder="후기를 남겨주세요"
          />
        </LiTilte>
        <Message>
          {content.length > 0 && (
            <p style={{ color: "red" }}>{contentMessage}</p>
          )}
        </Message>
        <ButDiv>
          <AddBut onClick={onAddComment}>작성하기</AddBut>
          <CancelBut onClick={() => navigate("/detail/" + id)}>
            취소하기
          </CancelBut>
        </ButDiv>
      </Box>
    </StDetailForm>
  );
};

export default DetailForm;

const StDetailForm = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;

const Box = styled.div`
  margin: 0 20px;
  margin-top: 145px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border-radius: 10px;
`;
const BoxTitle = styled.div`
  justify-content: center;
`;

const BoxSpan = styled.p`
  color: rgb(255, 80, 88);
  text-align: right;
  line-height: 2rem;
  padding-right: 10px;
`;
const LiImg = styled.li`
  width: 90%;
  padding: 10px 0px;
`;
const ImgTitle = styled.div`
  padding-left: 0.5rem;
  width: 80%;
  height: 48px;
  font-size: 20px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;
const ImgBox = styled.div`
  padding-left: 0.5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const ImgInput = styled.input`
  display: none;
`;
const ImgLabel = styled.label`
  width: 100px;
  height: 100px;
  position: relative;
  background: rgba(172, 212, 228, 0.35);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(155, 153, 169);
  font-size: 1rem;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }
`;
const Img = styled.img`
  width: 102px;
  height: 102px;
  font-synthesis: none;
  border-radius: 10px;
  ::-webkit-font-smoothing {
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
  }
`;
const DeleteImg = styled.button`
  margin: -10.3px;
  position: relative;
  color: red;
  right: 10.9px;
  bottom: 88.9px;
  background-color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
const LiTilte = styled.li`
  padding: 10px 0px;
  /* display: flex; */
  width: 100%;
`;
const PTitle = styled.b`
  padding-left: 0.5rem;
  height: 48px;
  align-items: center;
  display: flex;
  font-size: 20px;
`;
const InputTit = styled.input`
  width: 95%;
  height: 52px;
  background-color: rgba(172, 212, 228, 0.35);
  border-radius: 15px;
  border: none;
  padding-left: 10px;
  font-family: bold;
`;
const Message = styled.div`
  margin-bottom: 25px;
  font-weight: 500;
  width: 96%;
  font-size: 1rem;
  text-align: end;
`;
const InputCom = styled.textarea`
  width: 95%;
  font-family: bold;
  min-height: 163px;
  padding: 0px 1rem;
  font-size: 14px;
  resize: none;
  border: 3px solid #79b9d3;
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  height: 100%;
  background-color: rgba(172, 212, 228, 0.35);
  border-radius: 15px;
  border: none;
  padding-top: 15px;
  padding-left: 10px;
`;
const Wrap = styled.div`
  display: flex;
  /* flex-direction: column; */
  padding-top: 15px;
`;

const RatingText = styled.b`
  padding-left: 0.5rem;
  width: 20%;
  height: 48px;
  font-size: 20px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;
const StarDiv = styled.div`
  display: flex;
`;
const Stars = styled.div`
  width: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-top: 5px; */

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
const ButDiv = styled.div`
  display: flex;
  margin: 40px auto;
  width: 80%;
`;
const AddBut = styled.button`
  cursor: pointer;
  color: white;
  background-color: #abd4e2;
  border: 0px;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.5rem;
  margin-right: 1rem;
  width: 100%;
  font-weight: bold;
`;

const CancelBut = styled.button`
  cursor: pointer;
  font-weight: bold;
  color: #abd4e2;
  background-color: white;
  border: 3px solid #abd4e2;
  height: 2.5rem;
  /* margin-right:0.5rem; */
  border-radius: 5px;
  line-height: 2.1rem;
  /* margin-left:1rem; */
  width: 100%;
`;
