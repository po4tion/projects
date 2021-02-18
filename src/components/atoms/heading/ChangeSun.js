import React from 'react';
import styled from 'styled-components';

const StyledChangeSun = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  list-style: none;
  padding: 0;
  width: 50px;
`;

function ChangeSun({ children }) {
  return <StyledChangeSun>{children}</StyledChangeSun>;
}

export default ChangeSun;
