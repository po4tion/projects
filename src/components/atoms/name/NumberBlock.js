import React from 'react';
import styled from 'styled-components';

const StyledNumberBlock = styled.p`
  margin-top: 15px;
  margin-left: 25%;
  width: 50%;
  border: 1px solid black;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
`;

function NumberBlock({ children }) {
  return <StyledNumberBlock>{children}</StyledNumberBlock>;
}

export default NumberBlock;
