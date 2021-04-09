import React from 'react';
import styled from 'styled-components';

const StyledLocalChartBlock = styled.div`
  width: 700px;
  max-width: 700px;
  height: auto;
`;

function LocalChartBlock({ children }) {
  return <StyledLocalChartBlock>{children}</StyledLocalChartBlock>;
}

export default LocalChartBlock;
