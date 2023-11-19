import React from 'react';
import styled from 'styled-components';

const StyledChangeSunList = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

function ChangeSunList({ children, onClick }) {
  return (
    <StyledChangeSunList onClick={onClick}>{children}</StyledChangeSunList>
  );
}

export default ChangeSunList;
