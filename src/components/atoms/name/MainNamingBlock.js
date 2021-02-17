import React from 'react';
import styled from 'styled-components';

const StyledMainNamingBlock = styled.div`
  width: 100%;
  height: ${({ open }) => (open ? '400px' : '100px')};
`;

function MainNamingBlock({ children, open }) {
  return <StyledMainNamingBlock open={open}>{children}</StyledMainNamingBlock>;
}

export default MainNamingBlock;
