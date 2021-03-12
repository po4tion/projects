import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledNumberBlock = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 0;
  width: 60%;
  color: ${({ result }) => (result === 'moon' ? '#f5f6fa' : '#2c3a47')};
  font-size: 35px;
  font-weight: bold;
  text-align: center;
`;

function NumberBlock({ children }) {
  const result = useSelector((state) => state.bgColor.type);

  return <StyledNumberBlock result={result}>{children}</StyledNumberBlock>;
}

export default NumberBlock;
