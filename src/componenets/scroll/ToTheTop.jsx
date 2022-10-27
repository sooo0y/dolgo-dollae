import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import styled from "styled-components";

function ToTheTop() {
  // 토글 여부를 결정하는 state 선언
  const [toggleBtn, setToggleBtn] = useState(false);

  // window 객체에서 scrollY 값을 받아옴
  // 어느정도 스크롤이 된건지 판단 후, 토글 여부 결정
  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 0 ? setToggleBtn(true) : setToggleBtn(false);
  };

  // scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    
  }, []);


  // 버튼 클릭 시 스크롤을 맨 위로 올려주는 함수
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 토글 여부 state에 따라 버튼을 보여주거나 감추게 만듦
  return toggleBtn ? (
    <Button01 onClick={goToTop}>
		Top
    </Button01>
  ) : null;
}

export default ToTheTop;

const Button01 = styled.button`
  position: absolute;
  left: 80%;
  top: 650%;
  width: 80px;
  height: 80px;

  background-color: white;

  border: 5px solid #abd4e2;
  border-radius: 40px;

  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 25px;
  text-align: center;

  &:hover {
    cursor: pointer;
    border: 5px solid dodgerblue;
  }
`;