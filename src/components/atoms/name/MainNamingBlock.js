import React from 'react';
import styled from 'styled-components';

const StyledMainNamingBlock = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100px;
`;

function MainNamingBlock({ children }) {
  return <StyledMainNamingBlock>{children}</StyledMainNamingBlock>;
}

export default MainNamingBlock;
