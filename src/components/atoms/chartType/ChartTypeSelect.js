// 차트 API 데이터별 선택 <select>
import React from 'react';
import styled from 'styled-components';
import '../../../fonts/fonts.scss';

const StyledCharttypeSelect = styled.select`
  width: 80px;
  height: 34px;
  margin-right: 1px;
  padding: auto;
  border: 2px solid #778ca3;
  border-radius: 5px;
  color: #778ca3;
  font-size: 16px;
  font-family: 'Jal_Onuel';
  cursor: pointer;
`;

function ChartTypeBlock({ onChange, children }) {
  return (
    <StyledCharttypeSelect name="covid19" onChange={onChange}>
      {children}
    </StyledCharttypeSelect>
  );
}

export default ChartTypeBlock;
