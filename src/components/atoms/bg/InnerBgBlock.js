import React from 'react';
import styled from 'styled-components';

const StyledInnerBgBlock = styled.div`
  width: 700px;
  height: 85vh;
`;

function InnerBgBlock({ children }) {
  return <StyledInnerBgBlock>{children}</StyledInnerBgBlock>;
}

export default InnerBgBlock;
