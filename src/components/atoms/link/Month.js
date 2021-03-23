import React from 'react';
import styled from 'styled-components';

const MonthBlock = styled.div`
  color: #778ca3;
  cursor: pointer;
`;

function Month({ onClick }) {
  return <MonthBlock onClick={onClick}>월별</MonthBlock>;
}

export default Month;
