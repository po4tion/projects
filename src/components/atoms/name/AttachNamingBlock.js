import React from 'react';
import styled from 'styled-components';

const StyledAttachNamingBlock = styled.p`
  display: flex;
  justify-content: center;
  margin: 0;
  color: #778ca3;
  font-size: 16px;
  font-weight: bold;
`;

function AttachNamingBlock({ children }) {
  return <StyledAttachNamingBlock>{children}</StyledAttachNamingBlock>;
}

export default AttachNamingBlock;
