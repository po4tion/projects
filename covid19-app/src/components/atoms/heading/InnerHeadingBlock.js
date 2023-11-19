import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import '../../../fonts/fonts.scss';

const StyledInnerHeadingBlock = styled.a`
  margin: 0;
  color: ${({ result }) => (result === 'moon' ? '#f5f6fa' : '#182c61')};
  font-size: 35px;
  font-family: 'Noto Sans', sans-serif;
  text-decoration: none;
  user-select: none;
`;

function InnerHeadingBlock({ children }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledInnerHeadingBlock href="/" result={result}>
      {children}
    </StyledInnerHeadingBlock>
  );
}

export default InnerHeadingBlock;
