import React from 'react';
import styled from 'styled-components';

const StyledListDateBlock = styled.li`
  border-radius: 50px;
  background: linear-gradient(145deg, #dbdada, #ffffff);
  box-shadow: 4px 4px 4px #cfcece, -4px -4px 4px #ffffff;
  padding: 7px;
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
