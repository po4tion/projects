import React from 'react';
import styled from 'styled-components';

const StyledMainBackgroundBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f5ddc4;
  z-index: -1;
`;

function MainBackgroundBlock({ children }) {
  return <StyledMainBackgroundBlock>{children}</StyledMainBackgroundBlock>;
}

export default MainBackgroundBlock;
