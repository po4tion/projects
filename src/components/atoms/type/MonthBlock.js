import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledMonthBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  border: 2px solid #778ca3;
  border-radius: 5px;
  background-color: ${({ month, result }) =>
    month === 'month'
      ? result === 'moon'
        ? '#fff'
        : 'rgba(47, 54, 64, 0.9)'
      : 'transparent'};
  cursor: pointer;
  text-decoration: none;
  color: ${({ month, result }) =>
    month === 'month' ? (result === 'moon' ? '#778ca3' : '#fff') : '#778ca3'};
`;

function MonthBlock({ children, month, onClick }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledMonthBlock result={result} month={month} onClick={onClick}>
      {children}
    </StyledMonthBlock>
  );
}

export default MonthBlock;
