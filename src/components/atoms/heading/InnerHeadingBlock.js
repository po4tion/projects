import React from 'react';
import styled from 'styled-components';

const StyledInnerHeadingBlock = styled.h3`
  margin: 0;
`;

function InnerHeadingBlock({ children }) {
  return <StyledInnerHeadingBlock>{children}</StyledInnerHeadingBlock>;
}

export default InnerHeadingBlock;
