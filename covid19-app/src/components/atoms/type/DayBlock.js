import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledDayBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  border: 2px solid #778ca3;
  border-radius: 5px;
  background-color: ${({ day, result }) =>
    day === 'day'
      ? result === 'moon'
        ? '#fff'
        : 'rgba(47, 54, 64, 0.9)'
      : 'transparent'};
  cursor: pointer;
  text-decoration: none;
  color: ${({ day, result }) =>
    day === 'day' ? (result === 'moon' ? '#778ca3' : '#fff') : '#778ca3'};
`;

function DayBlock({ children, day, onClick }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledDayBlock result={result} day={day} onClick={onClick}>
      {children}
    </StyledDayBlock>
  );
}

export default DayBlock;
