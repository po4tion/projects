import React from 'react';
import styled from 'styled-components';

const StyledMainHeadingBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
  border: 1px solid black;
`;

function MainHeadingBlock({ children }) {
  return <StyledMainHeadingBlock>{children}</StyledMainHeadingBlock>;
}

export default MainHeadingBlock;
