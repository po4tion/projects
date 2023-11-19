import React from 'react';
import styled from 'styled-components';

const DayBlock = styled.div`
  font-size: 16px;
  user-select: none;
`;

function Day() {
  return <DayBlock>일별</DayBlock>;
}

export default Day;
