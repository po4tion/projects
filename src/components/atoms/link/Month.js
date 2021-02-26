import React from 'react';
import styled from 'styled-components';

const MonthBlock = styled.a`
  color: #778ca3;
  text-decoration: none;
`;

function Month({ onClick }) {
  return <MonthBlock onClick={onClick}>월별</MonthBlock>;
}

export default Month;
