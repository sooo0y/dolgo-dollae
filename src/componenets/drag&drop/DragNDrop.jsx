import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useRef } from "react";
import img from "../../assert/image/image.svg";

function ImagePreview({ image, deleteFunc }) {
    return (
      <div className="ImagePreview" draggable>
        <img src={image} alt="preview" />
        <div className="icon_container" onClick={deleteFunc}>
          <i className="fas fa-times"></i>
        </div>
      </div>
    );
}

function DragNDrop({ max = 10 }) {
  
  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const uploadBoxRef = useRef();
  const inputRef = useRef();



  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;
    
    const handleFiles = (files) => {
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        const reader = new FileReader();
        reader.onloadend = (e) => {
          const result = e.target.result;
          if (result) {
            setUploadedImages((state) => [...state, result].slice(0, max));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    
    const changeHandler = (event) => {
      const files = event.target.files;
      handleFiles(files);
    };
    
    const dropHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files;
      handleFiles(files);
    };
    
    const dragOverHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    
    uploadBox.addEventListener("drop", dropHandler);
    uploadBox.addEventListener("dragover", dragOverHandler);
    input.addEventListener("change", changeHandler);
    
    return () => {
      uploadBox.removeEventListener("drop", dropHandler);
      uploadBox.removeEventListener("dragover", dragOverHandler);
      input.removeEventListener("change", changeHandler);
    };
  }, [max]);


  useEffect(() => {
    const imageJSXs = uploadedImages.map((image, index) => {
      const isDeleteImage = (element) => {
        return element === image;
      };
      const deleteFunc = () => {
        uploadedImages.splice(uploadedImages.findIndex(isDeleteImage), 1);
        setUploadedImages([...uploadedImages]);
      };
      return <ImagePreview image={image} deleteFunc={deleteFunc} key={index} />;
    });
    setPreviewImages(imageJSXs);
  }, [uploadedImages]);


  const handleDeleteImage = (id) => {
    setPreviewImages(previewImages.filter((_, index) => index !== id));
    setUploadedImages(uploadedImages.filter((_, index) => index !== id));
  };


  



      return (
        <div>
          <ImageUploadBox>
              <ImageBox ref={uploadBoxRef}>
                
                
                
              </ImageBox>
              
              <div ref={inputRef}/>
          </ImageUploadBox>
          
          <Box>
            {previewImages.map((image, id) => (
                <div key={id}>
                  <DIV>
                    <Img alt={`${image}-${id}`} src={image.props.image} />
                    <DeleteImg onClick={() => handleDeleteImage(id)}>X</DeleteImg>
                  </DIV>
                </div>
              ))}
          </Box>
              
        </div>
        


      );
}


export default DragNDrop;

const Box = styled.div`
  float: right;

  position: absolute;
  top: 160px;
  right: -200px;

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 4fr);
  
`
const Img = styled.img`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 4fr);
  z-index: 2;
  

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
  z-index: 3;
  color: red;
  height: 20px;
  top: 10px;
  right: 10px;
  
  background-color: white;
  border: none;
  cursor: pointer;
`;

const ImageUploadBox = styled.div`

  
`;
const ImageBox = styled.div`
  width: 300px;
  height: 200px;

  position: absolute;

  top: -110px;
  left: -150px;
 
  float: right;

  background-color: white;

  margin: 10px auto 0px auto;

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
const DIV = styled.div`
  
  display: flex;
  justify-content: center;
  grid-template-columns: repeat(4, 4fr);
`
