import React from 'react';
import { useSelector } from 'react-redux';
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
  background-color: ${({ pathname, result }) =>
    pathname === '/'
      ? result === 'moon'
        ? '#fff'
        : 'rgba(47, 54, 64, 0.9)'
      : 'transparent'};
  cursor: pointer;
  text-decoration: none;
  color: ${({ pathname, result }) =>
    pathname === '/' ? (result === 'moon' ? '#778ca3' : '#fff') : '#778ca3'};
`;

function InternalTypeBlock({ children, location }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledInternalTypeBlock
      result={result}
      pathname={location.pathname}
      to="/"
    >
      {children}
    </StyledInternalTypeBlock>
  );
}

export default withRouter(InternalTypeBlock);

// color: ${({ pathname }) => (pathname === '/' ? '#fff' : '#778ca3')};
