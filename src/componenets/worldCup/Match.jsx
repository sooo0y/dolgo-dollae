import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../header/Header";
import basicImg from "../../assert/image/basic.png";
import detailImg from "../../assert/worldcup//detail.png";
import WorldCupDetail from "./WorldCupDetail";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../modal/ModalPortal";

const Match = () => {
  const navigate = useNavigate();
  const items = JSON.parse(sessionStorage.getItem("Data"));

  const [list, setList] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  const [detail, setDetail] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setList(items);
    setDisplays([items[0], items[1]]);
  }, []);

  const modalHandler = () => {
    setOpen(false);
  };

  const clickHandler = (data) => () => {
    if (list.length <= 2) {
      if (winners.length === 0) {
        setDisplays([data]);
        window.scrollTo({ top: 0, behavior: "smooth" });
        Swal.fire({
          icon: "success",
          title: `${data.title}`,
          text: "(으)로 떠나보는 건 어떠신가요? 😎",
          showCancelButton: true,
          confirmButtonText: "상세페이지로 가기",
          cancelButtonText: "닫기",
          // closeOnConfirm: false,
          // closeOnCancel: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/detail/${data.id}`);
          } else {
            navigate(`/ideal`);
          }
        });
      } else {
        let updatedData = [...winners, data];
        setList(updatedData);
        setDisplays([updatedData[0], updatedData[1]]);
        setWinners([]);

        const num = winners.length + 1;
        console.log(num);

        window.scrollTo({ top: 0, behavior: "smooth" });
        let timerInterval;
        Swal.fire({
          title: `지금부터 ${num}강입니다 😎`,
          icon: "info",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              // b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      }
    } else if (list.length > 2) {
      setWinners([...winners, data]);
      setDisplays([list[2], list[3]]);
      setList(list.slice(2));
    }
  };

  return (
    <StMatch>
      <Header />
      <Container>
        <Explanation>
          * 원하는 장소의 <b style={{ color: "red" }}>이미지</b>를 클릭하여
          선택합니다.
          <br /> * ?를 클릭하면 <b style={{ color: "red" }}>상세 정보</b>을
          확인할 수 있습니다.
        </Explanation>
        {displays.map((data) => (
          <Content key={data.title}>
            <Title>
              <div>
                <p>{data.title}</p>
                <img
                  alt=""
                  src={detailImg}
                  onClick={() => {
                    setDetail(data.id);
                    setOpen(true);
                  }}
                />
              </div>
            </Title>
            <Img
              alt=""
              src={data.image === null ? basicImg : data.image}
              onClick={clickHandler(data)}
            />
          </Content>
        ))}
        {open && (
          <ModalPortal>
            <WorldCupDetail
              detail={detail}
              setDetail={setDetail}
              modalHandler={modalHandler}
            />
          </ModalPortal>
        )}
      </Container>
    </StMatch>
  );
};

export default Match;

const StMatch = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;

const Explanation = styled.div`
  background-color: #eef6fa;
  font-size: 16px;
  line-height: 28px;
  width: 320px;
  margin: 30px auto;
  padding: 15px;
  margin-bottom: -10px;
`;

const Container = styled.div`
  padding-top: 130px;
  justify-content: center;
`;

const Content = styled.div`
  margin: 10px auto;
  text-align: center;
`;

const Img = styled.img`
  margin: 0 auto;
  width: 95%;
  height: 300px;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.div`
  justify-content: center;
  padding-top: 5px;
  background-color: white;
  border-top: 2.5px solid #535353;
  border-bottom: 2.5px solid #535353;
  opacity: 0.8;
  max-width: 80%;
  width: auto;
  display: inline-block;
  border-radius: 3px;
  position: relative;
  bottom: -30px;

  & div {
    display: flex;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
  }

  & p {
    padding-top: 10px;
    font-size: 25px;
    text-align: center;
    max-width: 85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & img {
    width: 35px;
    height: 35px;
    cursor: pointer;
    margin-left: 10px;
    margin-top: 6px;
  }
`;
