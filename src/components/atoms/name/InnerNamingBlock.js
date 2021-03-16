import React from 'react';
import styled from 'styled-components';

const StyledInnerNamingBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 48%;
  height: 100px;
  border: 1px solid blue;
`;

function InnerNamingBlock({ children }) {
  return <StyledInnerNamingBlock>{children}</StyledInnerNamingBlock>;
}

export default InnerNamingBlock;
