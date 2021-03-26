import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const StyledInternalTypeBlock = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  border: 2px solid #778ca3;
  border-radius: 5px;
  background-color: ${({ pathname }) =>
    pathname === '/' ? 'rgba(126, 214, 223, 0.3)' : 'transparent'};
  cursor: pointer;
  text-decoration: none;
`;

function InternalTypeBlock({ children, location }) {
  return (
    <StyledInternalTypeBlock pathname={location.pathname} to="/">
      {children}
    </StyledInternalTypeBlock>
  );
}

export default withRouter(InternalTypeBlock);
