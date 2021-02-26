import React from 'react';
import styled from 'styled-components';

const DayBlock = styled.a`
  color: #778ca3;
  text-decoration: none;
`;

function Day({ onClick }) {
  return <DayBlock onClick={onClick}>일별</DayBlock>;
}

export default Day;
