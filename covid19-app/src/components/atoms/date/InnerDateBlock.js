import React from 'react';
import styled from 'styled-components';

const StyledInnerDateBlock = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding-left: 0px;
  list-style: none;
  font-size: 18px;
  border: 1px solid black;
`;

function InnerDateBlock({ children }) {
  return <StyledInnerDateBlock>{children}</StyledInnerDateBlock>;
}

export default InnerDateBlock;
