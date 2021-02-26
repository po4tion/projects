import React from 'react';
import styled from 'styled-components';

const StyledListDateBlock = styled.li`
  display: flex;
  align-itmes: center;
  justify-content: center;
  border: 1px solid #778ca3;
  width: 50px;
  height: 30px;
  color: #778ca3;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;

function ListDateBlock({ children, onClick }) {
  return (
    <StyledListDateBlock onClick={onClick}>{children}</StyledListDateBlock>
  );
}

export default ListDateBlock;
