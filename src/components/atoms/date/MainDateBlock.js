import React from 'react';
import styled from 'styled-components';

const StyledMainDateBlock = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  border: 1px solid black;
  height: 30px;
  width: 100%;
`;

function MainDateBlock({ children }) {
  return <StyledMainDateBlock>{children}</StyledMainDateBlock>;
}

export default MainDateBlock;
