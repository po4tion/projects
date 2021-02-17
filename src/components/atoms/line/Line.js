import React from 'react';
import styled from 'styled-components';

const StyledLine = styled.hr`
  margin-top: 15px;
  border-top: 1px solid red;
`;

function Line() {
  return <StyledLine />;
}

export default Line;
