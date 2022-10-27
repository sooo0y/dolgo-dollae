import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../shared/Api";
import Swal from "sweetalert2";
import ModalPortal from "../modal/ModalPortal";
import CoseBack from "../modal/CoseBack";

const MapCose = ({ title, isTitle }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [cose, setCose] = useState(
    JSON.parse(sessionStorage.getItem("TITLE_NAME")) || []
  );
  const [dragAndDrop, setDragAndDrop] = useState({
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [...cose],
  });
  // ACCESS_TOKEN이 없으면 마이페이지 접근 불가
  const getToken = sessionStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    if (getToken === null) {
      Swal.fire({
        text: "로그인이 필요한 서비스입니다.",
        icon: "warning",
      });
      navigate("/login");
    }
  }, [getToken]);

  useEffect(() => {
    JSON.parse(sessionStorage.getItem("TITLE_NAME"));
  }, []);
  const onDragStart = (event) => {
    event.currentTarget.style.opacity = "0.4";
    const initialPosition = parseInt(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      originalOrder: cose,
    });
  };

  //드래그 했을 시 로컬스토리지에 반영되는 것(수정필요)
  useEffect(() => {
    sessionStorage.setItem(
      "TITLE_NAME",
      JSON.stringify(cose)
    );
  }, [cose]);

  //취소 버튼 모달
  const onClose = () => {
    setModal(false);
  };
  const onOpen = () => {
    setModal(true);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom; // 드래그 되는 항목의 인덱스(시작)
    const draggedTo = parseInt(event.currentTarget.dataset.position); // 놓을 수 있는 영역의 인덱스(끝)
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      // draggedFrom(시작) 항목 제외한 배열 목록
      (item, index) => index !== draggedFrom
    );
    newList = [
      // 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];
    if (draggedTo !== dragAndDrop.draggedTo) {
      // 놓을 수 있는 영역이 변경 되면 객체를 변경해줌
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (event) => {
    setCose(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
    });
  };

  const onDragLeave = (event) => {
    event.currentTarget.classList.remove("over");
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  const onDragEnter = (event) => {
    event.currentTarget.classList.add("over");
  };

  const onDragEnd = (event) => {
    event.currentTarget.style.opacity = "1";
    const listItens = document.querySelectorAll(".draggable");
    listItens.forEach((item) => {
      item.classList.remove("over");
    });
  };

  //코스목록안에 있는 개별 항목 제거
  const handleRemoveTitle = (id) => {
    const nextKeyword = cose.filter((list) => {
      return list.id !== id;
    });
    setCose(nextKeyword);
  };

  const onAddComment = async (e) => {
    e.preventDefault();
    if (title === "") {
      Swal.fire({
        text: "제목을 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    if (cose.length < 2) {
      Swal.fire({
        text: "여행지를 두 곳 이상 선택해주세요.",
        icon: "warning",
      });
      return;
    }
    const payload = {
      name: title,
      data: cose,
    };
    try {
      const res = await instance.post(`/api/auth/course`, payload, {
        headers: {
          contentType: "application/json",
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "작성 완료",
        showConfirmButton: false,
        timer: 1000,
      }).then((Swal) => window.location.replace("/cose"));
      return res.data;
    } catch (error) {}
  };

  return (
    <>
      {cose?.length !== 0 ? (
        <DescDiv>
          <p>▼ 드래그해서 순서를 변경하세요.</p>
        </DescDiv>
      ) : null}

      <Cose1Box>
        <Cose1Div>
          <ul>
            {cose.map((item, index) => {
              return (
                <li
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="draggable"
                  key={index}
                  draggable={true} //  draggable => true이면 드래그가 가능
                  data-position={index} //  dataset에 index값을 주어 선택된 index를 찾을 수 있다
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onDragEnter={onDragEnter}
                  onDragEnd={onDragEnd}
                >
                  <TitleDiv key={index}>
                    {index + 1 === cose.length ? (
                      <CoseBox>
                        <LastCoseDiv>
                          <Title>
                            <p>{item.title}</p>
                          </Title>
                          <DelP onClick={() => handleRemoveTitle(item.id)}>
                            X
                          </DelP>
                        </LastCoseDiv>
                      </CoseBox>
                    ) : (
                      <CoseBox>
                        <CoseDiv>
                          <Title>
                            <p>{item.title}</p>
                          </Title>
                          <DelP onClick={() => handleRemoveTitle(item.id)}>
                            X
                          </DelP>
                        </CoseDiv>
                        <p
                          style={{
                            paddingTop: "0.8rem",
                            paddingBottom: "0.5rem",
                            textAlign: "center",
                          }}
                        >
                          ▼
                        </p>
                      </CoseBox>
                    )}
                  </TitleDiv>
                </li>
              );
            })}
          </ul>
        </Cose1Div>
        <ButDiv>
          <AddBut onClick={onAddComment}>작성완료</AddBut>
          <CancelBut onClick={onOpen}>취소</CancelBut>
        </ButDiv>
        <ModalPortal>{modal && <CoseBack onClose={onClose} />}</ModalPortal>
      </Cose1Box>
    </>
  );
};

export default MapCose;

const Cose1Box = styled.div`
  text-align: center;
  /* display:flex; */
  margin: auto;
  flex-wrap: wrap;
  font-family: bold;
`;
const Cose1Div = styled.div`
  margin: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;
const DescDiv = styled.div`
  width: 80%;
  margin: auto;
  font-size: 15px;
  color: #bfb8b8;
  text-align: center;
  padding-top: 20px;
`;
const ButDiv = styled.div`
  width: 80%;
  display: flex;
  margin: 4rem auto;
  justify-content: center;
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
  border-radius: 5px;
  line-height: 2.1rem;
  width: 100%;
`;
const TitleDiv = styled.div`
  width: 80%;
  display: flex;
  margin: 5px auto;
`;
const CoseBox = styled.div`
  width: 100%;
  max-width: 428px;
  font-family: bold;
`;
const CoseDiv = styled.div`
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-left: -0.2rem;
  cursor: pointer;
  background-color: #eef6fa;
  &:hover {
    transform: scale(1.05);
    transition-duration: 0.1s;
  }
`;

const LastCoseDiv = styled.div`
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-left: -0.2rem;
  cursor: pointer;
  background-color: #eef6fa;
  &:hover {
    transform: scale(1.05);
    transition-duration: 0.1s;
  }
`;
const DelP = styled.p`
  margin-right: 1rem;
  /* text-align:center; */
  cursor: pointer;
  &:hover {
    color: #abd4e2;
  }
`;
const Title = styled.div`
  display: block;
  width: 90%;
  text-align: left;

  & p {
    white-space: nowrap;
    margin-left: 10px;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
