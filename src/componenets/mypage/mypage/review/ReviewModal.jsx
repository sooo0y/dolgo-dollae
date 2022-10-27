import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Star from  "../../../../componenets/star/Star";
import ModalPortal from "../../../../componenets/modal/ModalPortal";
import Modal from "../../../../componenets/modal/Modal";
import ModalImage from "../../../../componenets/modal/ModalImage";



const ReviewModal = ({ item }) => {
  const [modalOn, setModalOn] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const navigate = useNavigate();
  const onClose = () => {
    setImageModal(false)
  };
  const onOpen = () => {
    setImageModal(true)
  }
  const handleModal = () => {
    setModalOn(false);
  };

  return (
    <ComDiv key={item.comment_id}>
      <div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}></div>
          <div style={{ textAlign: "left" }}>
             {item.imageList.map((image, index) => {
                return <DetailImg onClick={onOpen} key={index} alt="" src={image} />;
              })}
          </div>
          <div style={{ paddingTop: "20px" }} >
          <StarDiv>
            <Star key={item.comment_id} comment={item} />
            <Button onClick={() => navigate(`/detail/${item.place_id}`)}>
              상세페이지로
            </Button>
          </StarDiv>
          <p style={{ paddingLeft: "10px", width: "90%", wordWrap: "break-word", lineHeight: "28px"}}>{item.content}</p>
          <ButtonDiv>
            <ReviseBut
              onClick={() =>
                navigate(
                  "/detail/update/" + item.place_id + "/" + item.comment_id
                )
              }
            >
              수정하기
            </ReviseBut>
            <DelBut onClick={() => setModalOn(true)}>삭제하기</DelBut>
          </ButtonDiv>
          </div>
          <ModalPortal>
            {modalOn && <Modal onClose={handleModal} comment={item} />}
          </ModalPortal>
        </div>
        <ModalPortal>
            {imageModal && <ModalImage onClose={onClose} comment={item}/>}
        </ModalPortal> 
      </div>
    </ComDiv>
  );
};

export default ReviewModal;
const ComDiv = styled.div`
  padding-bottom: 2rem;
  margin: 0rem 1rem 0rem 1rem;
  max-width: 428px;
  width: 90%;
`;
const StarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-left: 8px;
`;

const ReviseBut = styled.button`
  cursor: pointer;
  color: white;
  background-color: #abd4e2;
  border: 0px;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.5rem;
  margin-right: 0.5rem;
  width: 100%;
  font-weight: bold;
`;
const DelBut = styled.button`
  cursor: pointer;
  font-weight: 600;
  color: #79b9d3;
  background-color: white;
  border: 3px solid #abd4e2;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.1rem;
  /* margin-left:1rem; */
  width: 100%;
`;
const DetailImg = styled.img`
  width: 95px;
  border-radius: 20px;
  margin-top: 1rem;
  margin-right:0.5rem;
  cursor: pointer;
  @media screen and (max-width: 398px){
    width:82px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const Button = styled.button`
  margin-top: 8px;
  border: 3px solid #ffc0c0;
  background-color: #ffc0c0;
  color: white;
  border-radius: 5px;
  font-weight: 700;
  position: relative;
  margin-right: 10px;
  cursor: pointer;
`;
