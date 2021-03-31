import React from 'react';
import styled from 'styled-components';

const StyledFixValueBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  color: ${({ color }) => color};
`;

function FixValueBlock({ children, color }) {
  return <StyledFixValueBlock color={color}>{children}</StyledFixValueBlock>;
}

export default FixValueBlock;
