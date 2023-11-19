import React from 'react';
import styled from 'styled-components';

const StyledSpaceNamingBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
`;

function SpaceNamingBlock({ children }) {
  return <StyledSpaceNamingBlock>{children}</StyledSpaceNamingBlock>;
}

export default SpaceNamingBlock;
