import React from 'react';
import styled from 'styled-components';

const MonthBlock = styled.div`
  font-size: 16px;
  user-select: none;
`;

function Month() {
  return <MonthBlock>월별</MonthBlock>;
}

export default Month;
