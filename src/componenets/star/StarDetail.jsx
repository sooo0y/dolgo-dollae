import React from 'react'
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StarDetail = ({posts}) => {
  return (
    <>
    <Wrap>
     {posts.star === 5
      ? <div>
          <FaStar style={{color:"#fcc419"}}/>
          <FaStar style={{color:"#fcc419"}}/>
          <FaStar style={{color:"#fcc419"}}/>
          <FaStar style={{color:"#fcc419"}}/>
          <FaStar style={{color:"#fcc419"}}/>
        </div>
      :(posts.star === 4
      ? <div>
          <FaStar style={{color:"#fcc419"}}/>
          <FaStar style={{color:"#fcc419"}}/>
          <FaStar style={{color:"#fcc419"}}/>
          <FaStar style={{color:"#fcc419"}}/>
      </div>
      :(posts.star === 3
        ? <div>
            <FaStar style={{color:"#fcc419"}}/>
            <FaStar style={{color:"#fcc419"}}/>
            <FaStar style={{color:"#fcc419"}}/>
          </div>
      :(posts.star === 2
      ? <div>
          <FaStar style={{color:"#fcc419"}}/>
          <FaStar style={{color:"#fcc419"}}/>
        </div>
      :(posts.star === 0
        ? <div>
            <FaStar style={{color:"#fcc419"}}/>
          </div>
        :null
      ))))  
      }
      </Wrap>
    </>
  )
}

export default StarDetail

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 0.35rem;
  line-height:1.5rem;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

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