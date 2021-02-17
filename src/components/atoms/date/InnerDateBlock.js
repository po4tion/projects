import React from 'react';
import styled from 'styled-components';

const StyledInnerDateBlock = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 40px;
  padding-left: 0px;
  list-style: none;
  font-size: 18px;
`;

function InnerDateBlock({ children }) {
  return <StyledInnerDateBlock>{children}</StyledInnerDateBlock>;
}

export default InnerDateBlock;
