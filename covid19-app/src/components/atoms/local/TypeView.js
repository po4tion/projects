import React from 'react';
import styled from 'styled-components';

const StyledTypeView = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  color: ${({ idx }) => (idx === 0 || idx % 2 === 0 ? '#2f3640' : '#fff')};
  user-select: none;
`;

function TypeView({ children, idx }) {
  return <StyledTypeView idx={idx}>{children}</StyledTypeView>;
}

export default TypeView;
