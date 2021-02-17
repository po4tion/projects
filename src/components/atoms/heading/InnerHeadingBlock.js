import React from 'react';
import styled from 'styled-components';

import '../../../fonts/fonts.scss';

const StyledInnerHeadingBlock = styled.p`
  margin: 0;
  color: #182c61;
  font-size: 35px;
  font-family: 'Noto Sans', sans-serif;
`;

function InnerHeadingBlock({ children }) {
  return <StyledInnerHeadingBlock>{children}</StyledInnerHeadingBlock>;
}

export default InnerHeadingBlock;
