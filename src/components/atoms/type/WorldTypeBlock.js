import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const StyledWorldTypeBlock = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  margin-left: 1px;
  border: 2px solid #778ca3;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ pathname }) =>
    pathname === '/world' ? 'rgba(126, 214, 223, 0.3)' : 'transparent'};
  text-decoration: none;
`;

function WorldTypeBlock({ children, location }) {
  return (
    <StyledWorldTypeBlock pathname={location.pathname} to="/world">
      {children}
    </StyledWorldTypeBlock>
  );
}

export default withRouter(WorldTypeBlock);
