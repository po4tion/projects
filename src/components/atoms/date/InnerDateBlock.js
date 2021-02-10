import React from 'react';
import styled from 'styled-components';

const StyledInnerDateBlock = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  padding-left: 0px;
  list-style: none;
  border: 1px solid black;
  font-size: 18px;
`;

function InnerDateBlock({ children }) {
  return <StyledInnerDateBlock>{children}</StyledInnerDateBlock>;
}

export default InnerDateBlock;
