import React from 'react';
import styled from 'styled-components';

const StyledTypeView = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
`;

function TypeView({ children }) {
  return <StyledTypeView>{children}</StyledTypeView>;
}

export default TypeView;
