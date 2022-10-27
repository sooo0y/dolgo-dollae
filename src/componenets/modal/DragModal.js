import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from "styled-components";

const DragModal = ({onClose, cose}) => {
    const [list, setList] = useState(cose);
    const [dragAndDrop, setDragAndDrop] = useState({
        draggedFrom: null,
        draggedTo: null,
        isDragging: false,
        originalOrder: [],
        updatedOrder: [...list],
      });   
    console.log(dragAndDrop.updatedOrder)

    const onDragStart = (event) => {
    event.currentTarget.style.opacity = "0.4";
    const initialPosition = parseInt(event.currentTarget.dataset.position);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            originalOrder: list,
        });
    };

    const reviseList = () => {
      sessionStorage.setItem('TITLE_NAME', JSON.stringify(list));
      window.location.reload();
    } 
    
    //드래그 했을 시 로컬스토리지에 반영되는 것(수정필요)
    useEffect(() => {
        sessionStorage.setItem('TITLE_NAME', JSON.stringify(dragAndDrop.updatedOrder))
    },[]);

    const onDragOver = (event) => {
        event.preventDefault();
        let newList = dragAndDrop.originalOrder;						   
        const draggedFrom = dragAndDrop.draggedFrom;					   // 드래그 되는 항목의 인덱스(시작)
        const draggedTo = parseInt(event.currentTarget.dataset.position);  // 놓을 수 있는 영역의 인덱스(끝)
        const itemDragged = newList[draggedFrom];						   
        const remainingItems = newList.filter(			// draggedFrom(시작) 항목 제외한 배열 목록 
          (item, index) => index !== draggedFrom
        );
        newList = [										// 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
          ...remainingItems.slice(0, draggedTo),
          itemDragged,
          ...remainingItems.slice(draggedTo),
        ];
        if (draggedTo !== dragAndDrop.draggedTo) {		// 놓을 수 있는 영역이 변경 되면 객체를 변경해줌
          setDragAndDrop({
            ...dragAndDrop,
            updatedOrder: newList,
            draggedTo: draggedTo,
          });
        }
    };

    const onDrop = (event) => {
        setList(dragAndDrop.updatedOrder);
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
    const handleRemoveTitle = (id) => {
      const nextKeyword = list.filter((list) => {
        return list.id !== id
      })
      setList(nextKeyword)
    }
    return (
      <>
        <ul>
          {list.map((item, index) => {
            return (
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="draggable"
                key={index}			
                draggable={true} 				//  draggable => true이면 드래그가 가능합니다.
                data-position={index}			//  dataset에 index값을 주어 선택된 index를 찾을 수 있습니다.
                onDragStart={onDragStart}		//  ex) event.currentTarget.dataset.position
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
              >
              <TitleDiv key={index}>
                  {index+1 === cose.length
                  ?
                  <CoseBox>
                    <LastCoseDiv>
                      <p>{item.title}</p>
                      <DelP onClick={() => handleRemoveTitle(item.id)}>X</DelP>
                    </LastCoseDiv>
                  </CoseBox>
                  :<CoseBox>
                    <CoseDiv>
                      <p>{item.title}</p>
                      <DelP onClick={() => handleRemoveTitle(item.id)}>X</DelP>
                    </CoseDiv>
                    <p style={{paddingTop:"0.1rem"}}>▼</p>
                  </CoseBox>
                  }
              </TitleDiv>
            </li>
            );
          })}
        </ul>  
        <ButDiv>
          {/* <h2 onClick={reviseList}>수정완료</h2>
          <h2 onClick={() => onClose()}>취소</h2> */}
        </ButDiv>
      </>
    )
}

export default DragModal

const ButDiv = styled.div`
  /* display:flex; */
  margin: auto;
  justify-content:center;
  h2{
    margin-right:1rem;
  }
`
const TitleDiv = styled.div`
    width:80%;
    display:flex;
`
const CoseBox = styled.div`
  width:100%;
`
const CoseDiv = styled.div`
  height:30px;
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  border:2px solid black;
  p{
    margin-left:1rem;
  }
`

const LastCoseDiv = styled.div` 
  height:30px;
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  border:2px solid black;
  p{
    margin-left:1rem;
  }
`
const DelP = styled.p`
  margin-right:1rem;
  /* text-align:center; */
`
