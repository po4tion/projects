import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const StyledInnerNamingBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${({ pathname }) => (pathname === '/world' ? '50%' : '25%')};
  height: 100px;
  margin-left: 15px;

  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

function InnerNamingBlock({ children, location }) {
  return (
    <StyledInnerNamingBlock pathname={location.pathname}>
      {children}
    </StyledInnerNamingBlock>
  );
}

export default withRouter(InnerNamingBlock);
