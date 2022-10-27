import React from "react";
import styled from "styled-components";
import { useRef } from "react";
import { useEffect } from "react";

const RecentSearch = ({ onClose, allClear, keywords, ReSearch, oneClear,handleAddKeyword}) => {
  const modalRef = useRef();

//   useEffect(() => {
//     document.addEventListener('mousedown', clickModalOutside)

//     return () => {
//         document.removeEventListener('mousedown', clickModalOutside);
//     }
// })

// const clickModalOutside = event => {
//   if( !modalRef.current.contains(event.target)){
//       onClose();
//   }
// };

  return (
    <HistoryBox>
        <HeaderContainer>
            <RecentP>최근 검색어</RecentP>
            <AllDelete onClick={allClear}>전체삭제</AllDelete>
        </HeaderContainer>
        <div>
            {keywords.map((text,index) =>{
            return(
                <KeywordDiv key={index}>
                <p onClick={() => {ReSearch(text);handleAddKeyword(text)}}>{text}</p>
                <p onClick={() => oneClear(text)}>X</p>
                </KeywordDiv>
            )
            })}
        </div>
        <CloseBut onClick={() => onClose()}>닫기</CloseBut>
    </HistoryBox>
  );
};

export default RecentSearch;

const HistoryBox = styled.div`
  width:86%;
  margin-top:0.5rem;
  background-color:#fff;
  padding-left:1rem;
  padding-right:1rem;
  z-index:1;
`
const HeaderContainer = styled.div`
  display:flex;
  justify-content:space-between;
  margin-bottom:1.3rem;
`
const RecentP = styled.p`
  font-size:1.4rem;
  color: #666666;
`
const AllDelete = styled.p`
  color: rgb(155, 153, 169);
  font-size:1.1rem;
  line-height:1.7rem;
  cursor: pointer;
  &:hover{
      color:#abd4e2;
  }
`
const KeywordDiv = styled.div`
  display:flex;
  justify-content:space-between;
  font-size:1.1rem;
  margin-bottom:1rem;
  cursor: pointer;
  p{
    &:hover{
      color:#abd4e2;
    }
  }

`
const CloseBut = styled.p`
  font-size:1.2rem;
  font-weight:500;
  margin-top:1.3rem;
  padding-bottom:0.8rem;
  text-align:right;
  cursor: pointer;
`