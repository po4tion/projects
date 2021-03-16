// 차트 API 데이터별 선택 <select>
import React from 'react';
import styled from 'styled-components';

const StyledCharttypeSelect = styled.select`
  background-color: #fff;
`;

function ChartTypeBlock({ onChange, children }) {
  return (
    <StyledCharttypeSelect name="covid19" onChange={onChange}>
      {children}
    </StyledCharttypeSelect>
  );
}

export default ChartTypeBlock;
