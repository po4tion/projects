import React from 'react';
import styled from 'styled-components';

const StyledInternalTypeBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  border: 1px solid #778ca3;
  border-radius: 5px;
  cursor: pointer;
`;

function InternalTypeBlock({ children }) {
  return <StyledInternalTypeBlock>{children}</StyledInternalTypeBlock>;
}

export default InternalTypeBlock;

export const StyledInternalTypeBlockCustom = styled(StyledInternalTypeBlock)`
  background-color: rgba(126, 214, 223, 0.3);
`;
