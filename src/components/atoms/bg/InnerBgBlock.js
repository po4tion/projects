import React from 'react';
import styled from 'styled-components';

const StyledInnerBgBlock = styled.div`
  width: 800px;
  height: 85vh;
  border: 1px solid black;
`;

function InnerBgBlock({ children }) {
  return <StyledInnerBgBlock>{children}</StyledInnerBgBlock>;
}

export default InnerBgBlock;
