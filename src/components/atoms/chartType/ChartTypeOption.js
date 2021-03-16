// 차트 API 데이터별 선택 <select>
import React from 'react';
import styled from 'styled-components';

const StyledChartTypeOption = styled.option`
  background-color: #fff;
`;

function ChartTypeOption({ value, children }) {
  return (
    <StyledChartTypeOption value={value}>{children}</StyledChartTypeOption>
  );
}

export default ChartTypeOption;
