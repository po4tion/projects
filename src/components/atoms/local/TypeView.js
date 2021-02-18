import React from 'react';
import styled from 'styled-components';

const StyledTypeView = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  color: ${({ idx }) => (idx === 0 || idx % 2 === 0 ? '#dcdde1' : '#718093')};
`;

function TypeView({ children, idx }) {
  return <StyledTypeView idx={idx}>{children}</StyledTypeView>;
}

export default TypeView;
