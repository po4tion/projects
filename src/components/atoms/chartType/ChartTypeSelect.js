// 차트 API 데이터별 선택 <select>
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import '../../../fonts/fonts.scss';

const StyledCharttypeSelect = styled.select`
  width: 80px;
  height: 34px;
  margin-right: 1px;
  padding: auto;
  border: 2px solid #778ca3;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Jal_Onuel';
  background-color: ${({ result }) =>
    result === 'moon' ? '#fff' : 'rgba(47, 54, 64, 0.9)'};
  cursor: pointer;
  color: ${({ result }) => (result === 'moon' ? '#778ca3' : '#fff')};
`;

function ChartTypeBlock({ onChange, children }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledCharttypeSelect result={result} name="covid19" onChange={onChange}>
      {children}
    </StyledCharttypeSelect>
  );
}

export default ChartTypeBlock;
