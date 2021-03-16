import React from 'react';
import styled from 'styled-components';

const StyledSpaceNamingBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  border: 1px solid red;
`;

function SpaceNamingBlock({ children }) {
  return <StyledSpaceNamingBlock>{children}</StyledSpaceNamingBlock>;
}

export default SpaceNamingBlock;
