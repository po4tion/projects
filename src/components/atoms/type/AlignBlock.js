import React from 'react';
import styled from 'styled-components';

const StyledAlignBlock = styled.div`
  display: flex;
`;

function AlignBlock({ children }) {
  return <StyledAlignBlock>{children}</StyledAlignBlock>;
}

export default AlignBlock;
