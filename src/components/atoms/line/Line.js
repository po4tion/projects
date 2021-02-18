import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledLine = styled.hr`
  margin-top: 25px;
  border-top: ${({ result }) =>
    result === 'moon' ? '1px solid #f5f6fa' : '1px solid #353b48'};
`;

function Line() {
  const result = useSelector((state) => state.bgColor.type);

  return <StyledLine result={result} />;
}

export default Line;

export const CustomLine = styled(StyledLine)`
  width: 60px;
  margin-top: 5px;
`;

export const CustomLine02 = styled(StyledLine)`
  width: 30px;
  margin-top: 5px;
`;
