import React from 'react';
import styled from 'styled-components';

const StyledMainNamingBlock = styled.div`
  max-width: 80%;
  margin: 0 auto;
  height: 100px;
  border: 1px solid black;
`;

function MainNamingBlock({ children, open }) {
  return <StyledMainNamingBlock open={open}>{children}</StyledMainNamingBlock>;
}

export default MainNamingBlock;
