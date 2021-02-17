import React from 'react';
import styled from 'styled-components';

const StyledMainTypeBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 5vh;
  width: 100%;
`;

function MainTypeBlock({ children }) {
  return <StyledMainTypeBlock>{children}</StyledMainTypeBlock>;
}

export default MainTypeBlock;
