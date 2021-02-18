import React from 'react';
import styled from 'styled-components';

const StyledChangeSunList = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
`;

function ChangeSunList({ children, onClick }) {
  return (
    <StyledChangeSunList onClick={onClick}>{children}</StyledChangeSunList>
  );
}

export default ChangeSunList;
