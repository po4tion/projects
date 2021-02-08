import React from 'react';
import styled from 'styled-components';

const StyledAttachNamingBlock = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

function AttachNamingBlock({ children }) {
  return <StyledAttachNamingBlock>{children}</StyledAttachNamingBlock>;
}

export default AttachNamingBlock;
