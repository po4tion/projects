import React from 'react';
import styled from 'styled-components';

const StyledWorldTypeBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  border: 1px solid black;
  cursor: pointer;
`;

function InternalTypeBlock({ children }) {
  return <StyledWorldTypeBlock>{children}</StyledWorldTypeBlock>;
}

export default InternalTypeBlock;
