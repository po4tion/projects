import React from 'react';
import styled from 'styled-components';

const StyledMainTypeBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  width: 100%;
`;

function MainTypeBlock({ children }) {
  return <StyledMainTypeBlock>{children}</StyledMainTypeBlock>;
}

export default MainTypeBlock;

export const StyledMainTypeBlockCustom = styled(StyledMainTypeBlock)`
  height: 80px;
  justify-content: center;
  margin-bottom: 20px;
`;
