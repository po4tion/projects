import React from 'react';
import styled from 'styled-components';

const StyledListDateBlock = styled.li`
  border: 1px solid black;
  cursor: pointer;
`;

function ListDateBlock({ children, onClick }) {
  return (
    <StyledListDateBlock onClick={onClick}>{children}</StyledListDateBlock>
  );
}

export default ListDateBlock;
