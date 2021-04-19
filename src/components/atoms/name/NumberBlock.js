import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledNumberBlock = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 0;
  width: 60%;
  color: ${({ color }) => color};
  font-size: 35px;
  font-weight: bold;
  text-align: center;

  @media screen and (max-width: 500px) {
    font-size: 25px;
  }
`;

function NumberBlock({ children, color }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledNumberBlock result={result} color={color}>
      {children}
    </StyledNumberBlock>
  );
}

export default NumberBlock;
