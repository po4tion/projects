import React from 'react';
import styled from 'styled-components';

const StyledInnerBgBlock = styled.div`
  width: 700px;
  height: 85vh;

  @media screen and (max-width: 500px) {
    width: 500px;
  }
`;

function InnerBgBlock({ children }) {
  return <StyledInnerBgBlock>{children}</StyledInnerBgBlock>;
}

export default InnerBgBlock;
