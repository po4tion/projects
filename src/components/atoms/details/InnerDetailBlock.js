import React from 'react';
import styled from 'styled-components';

const StyledInnerDetailBlock = styled.p`
  font-size: 16px;
`;

function InnerDetailBlock({ children }) {
  return <StyledInnerDetailBlock>{children}</StyledInnerDetailBlock>;
}

export default InnerDetailBlock;
