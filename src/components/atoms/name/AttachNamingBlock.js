import React from 'react';
import styled from 'styled-components';

const StyledAttachNamingBlock = styled.p`
  display: flex;
  justify-content: center;
  margin: 0;
  color: ${({ color }) => color};
  font-size: 16px;
`;

function AttachNamingBlock({ children, color }) {
  return (
    <StyledAttachNamingBlock color={color}>{children}</StyledAttachNamingBlock>
  );
}

export default AttachNamingBlock;
