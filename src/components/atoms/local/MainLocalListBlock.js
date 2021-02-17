import React from 'react';
import styled from 'styled-components';

const StyledMainLocalListBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
`;

function MainLocalListBlock({ children }) {
  return <StyledMainLocalListBlock>{children}</StyledMainLocalListBlock>;
}

export default MainLocalListBlock;
