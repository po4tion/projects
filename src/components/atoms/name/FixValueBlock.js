import React from 'react';
import styled from 'styled-components';

const StyledFixValueBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 15px;
  padding: 0 3px;
  background-color: #dfe6e9;
`;

function FixValueBlock({ children }) {
  return <StyledFixValueBlock>{children}</StyledFixValueBlock>;
}

export default FixValueBlock;
