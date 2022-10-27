import React from "react";
import styled from "styled-components";

const ThemeList = ({ post }) => {
  // console.log(post.theme);
  return (
    <>
      <Wrap>
        {post.theme === "12" ? (
          <div>
            <p>관광</p>
          </div>
        ) : post.theme === "14" ? (
          <div>
            <p>관람</p>
          </div>
        ) : post.theme === "28" ? (
          <div>
            <p>액티비티</p>
          </div>
        ) : (
          <div>
            <p>식도락</p>
          </div>
        )}
      </Wrap>
    </>
  );
};

export default ThemeList;
const Wrap = styled.div`
  color: #bfb8b8;
  margin-top: 0.2rem;
`;
