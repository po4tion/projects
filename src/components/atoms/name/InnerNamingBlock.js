import React from 'react';
import styled from 'styled-components';

const StyledInnerNamingBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 25%;
  height: 100px;
  margin-left: 15px;

  @media screen and (max-width: 500px) {
    width: auto;
    font-size: 10px;
  }
`;

function InnerNamingBlock({ children }) {
  return <StyledInnerNamingBlock>{children}</StyledInnerNamingBlock>;
}

export default InnerNamingBlock;
