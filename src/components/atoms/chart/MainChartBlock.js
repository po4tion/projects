import React from 'react';
import styled from 'styled-components';

const StyledMainChartBlock = styled.div`
  border: 1px solid orange;
  width: 100%;
  height: 400px;
`;

function MainChartBlock({ children }) {
  return <StyledMainChartBlock>{children}</StyledMainChartBlock>;
}

export default MainChartBlock;
