// 차트 API 데이터별 선택 <select>
import React from 'react';
import styled from 'styled-components';

const StyledChartTypeOption = styled.option`
  color: #778ca3;
`;

function ChartTypeOption({ value, children }) {
  return (
    <StyledChartTypeOption value={value}>{children}</StyledChartTypeOption>
  );
}

export default ChartTypeOption;
