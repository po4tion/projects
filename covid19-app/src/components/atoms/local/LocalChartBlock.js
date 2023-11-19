import React from 'react';
import styled from 'styled-components';

const StyledLocalChartBlock = styled.div`
  width: 700px;
  max-width: 700px;
  height: auto;

  @media screen and (max-width: 500px) {
    width: 500px;
    max-width: 500px;
  }
`;

function LocalChartBlock({ children }) {
  return <StyledLocalChartBlock>{children}</StyledLocalChartBlock>;
}

export default LocalChartBlock;
