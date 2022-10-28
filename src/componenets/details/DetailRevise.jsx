import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { _updateComment, _getComments } from "../../redux/modules/comment";
import { instance } from "../../shared/Api";
import Header from "../header/Header";
import img from "../../assert/image/image.svg";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

const DetailRevise = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { placeId } = useParams();
  const [isActive, setIsActive] =useState(false);
  const [content, setContent] = useState("");
  const [contentMessage, setContentMessage] = useState("");
  const [isContent, setIsContent] = useState(false);
  const [title, setTitle] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const [star, setStar] = useState();
  const [image, setImage] = useState(null);
  const [fileImage1, setFileImage1] = useState([]);
  const [fileImage, setFileImage] = useState([]);
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  //후기작성 기존 데이터 불러오기
  const fetch = async () => {
    const response = await instance.get(`/api/comment/${placeId}`);

    const commentList = response.data.find((comment) => {
      return comment.comment_id === Number(id);
    });

    setTitle(commentList?.title);
    setContent(commentList?.content);
    setStar(commentList?.star);
    setFileImage1([...commentList?.imageList]);
    setImage([]);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    sendReview();
  }, [clicked]);

  //별점 입력하기
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

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
        alwaysKeepResolution : true, 
      }
      return await imageCompression(image, options);
    } catch(e){
      console.log(e);
    };
  };

  //이미지 미리보기 및 파일 추가
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
    if (imageLists.length + fileImage1.length> 3) {
      Swal.fire({
        text: "이미지는 최대 3개까지 등록 가능합니다",
        icon: "warning",
      });
      imageLists = imageLists.slice(0, 3-fileImage1.length);
    }
    if(imgFiles.length + fileImage1.length> 3){
      imgFiles = imgFiles.slice(0, 3-fileImage1.length);
    }
    setFileImage(imgFiles);
    setImage(imageLists);
  };

  //추가이미지 삭제
  const handleDeleteImage = (id) => {
    setFileImage(fileImage.filter((_, index) => index !== id));
    setImage(image.filter((_, index) => index !== id));
  };

  //기존이미지 삭제
  const handleDeleteImage1 = (id) => {
    setFileImage1(fileImage1.filter((_, index) => index !== id));
  };

  //내용 유효성 검사
  const onChangeContent = (e) => {
    const contentRegex =
    /^(?=.*[a-zA-z0-9가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^*+=]).{10,3000}$/gs;
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

  //제목 유효성 검사
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
    existUrlList: fileImage1,
  };
  const onChangeHandler = (event, setState) => setState(event.target.value);

  //후기 수정하기 완료 버튼
  const onUpdatePost = async (e) => {
    e.preventDefault();
    if (title === "" || content === "" || star === 0) {
      Swal.fire({
        text: "필수항목을 입력해주세요.",
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
      placeId: placeId,
      id: id,
      formData: formData,
    };
    for (let value of payload.formData.values()) {
      console.log(value);
    }
    dispatch(_updateComment(payload))
    .then((dispatch) => 
      Swal.fire({
      position: 'center',
      icon: 'success',
      title: '수정 완료',
      showConfirmButton: false,
      timer: 1000
    }));
  };

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <St>
      <Header />
      <Box>
        <BoxTitle>
          <BoxSpan>
            <span>*</span>은 필수항목입니다.
          </BoxSpan>
        </BoxTitle>
        <LiTilte>
          <b>
            제목<span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </b>
          <InputTit
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력해주세요."
          />
        </LiTilte>
        <Message>
          {title.length > 0 && <p style={{ color: "rgb(255, 80, 88)" }}>{titleMessage}</p>}
        </Message>
        <LiImg>
          <ImgTitle>
            <b>이미지</b>
          </ImgTitle>
          <div style={{ width: "100%" }}>
            <ImgBox>
              <ImgLabel>
                <img
                  alt=""
                  style={{ height: "20px" }}
                  src={img}
                />
                <p style={{ marginTop: "15px", fontSize: "12px" }}>
                  이미지 등록
                </p>
                <ImgInput
                  type="file"
                  name="imageList"
                  accept="image/*"
                  multiple
                  onChange={onChangeImg}
                  id="image"
                />
              </ImgLabel>
              {fileImage1.map((image, id) => (
                <div key={id}>
                  <img
                    style={{ width: "102px", height: "102px", borderRadius: "10px" }}
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
        </LiImg>
        <Wrap>
          <RatingText>
            별점<span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </RatingText>
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
        </Wrap>
        <LiTilte>
          <b>
            후기<span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </b>
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
            <p style={{ color: "rgb(255, 80, 88)" }}>{contentMessage}</p>
          )}
        </Message>
        <ButtonDiv>
         <ReviseBut onClick={onUpdatePost}>수정하기</ReviseBut>
          <DelBut onClick={() => navigate("/detail/" + placeId)}>뒤로가기</DelBut>
        </ButtonDiv>
      </Box>
    </St>
  );
};

export default DetailRevise;
const St = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;

  & b {
    font-size: 20px;
  }
`;

const Box = styled.div`
  height: 100%;
  padding-top: 145px;
  background-color: #eef6fa;
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
  padding-left: 1.3rem;
  width: 80%;
  height: 48px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
`;

const ImgBox = styled.div`
  padding-left: 1.3rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
`;

const ImgInput = styled.input`
  display: none;
`;

const ImgLabel = styled.label`
  width: 100px;
  height: 100px;
  position: relative;
  border: none;
  background: rgb(250, 250, 253);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(155, 153, 169);
  font-size: 1rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
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
  right: 11px;
  bottom: 88.5px;
  background-color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
const LiTilte = styled.li`
  padding: 10px 0px;
  width: 100%;
  b {
    padding-left: 1.3rem;
    width: 80%;
    height: 48px;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    font-size: 20px;
  }
`;

const InputTit = styled.input`
  font-size: 15px;
  width: 83%;
  border: none;
  height: 40px;
  color: rgb(155, 153, 169);
  padding: 0px 1rem;
  border-radius: 15px;
  height: 52px;
`;
const Message = styled.div`
  margin-bottom: 25px;
  margin-top: 10px;
  font-weight: 500;
  width: 94%;
  font-size: 1rem;
  text-align: end;
`;
const InputCom = styled.textarea`
  width: 90%;
  height: 100%;
  min-height: 163px;
  padding: 1rem;
  font-size: 14px;
  resize: none;
  border: none;
  color:rgb(155, 153, 169);
  border-radius: 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
const Wrap = styled.div`
  display: flex;
  /* flex-direction: column; */
  padding-top: 15px;
`;

const RatingText = styled.b`
  padding-left: 1.3rem;
  width: 100px;
  height: 48px;
  font-size: 15px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
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

const DelBut = styled.button`
  cursor: pointer;
  font-weight: 600;
  color: #79b9d3;
  background-color: white;
  border: 3px solid #abd4e2;
  height: 2.5rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  line-height: 2.1rem;
  /* margin-left:1rem; */
  width: 150px;
`;
const NotBut = styled.button`
  cursor: pointer;
  color: #79b9d3;
  border: 3px solid #abd4e2;
  background-color: white;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.1rem;
  /* margin-right:1rem; */
  width: 150px;
  font-weight: bold;
`;

const ReviseBut = styled.button`
  cursor: pointer;
  color: white;
  background-color: #abd4e2;
  border: 0px;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.5rem;
  /* margin-right:1rem; */
  width: 150px;
  font-weight: bold;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 15px;
  padding-bottom: 30px;
`;
