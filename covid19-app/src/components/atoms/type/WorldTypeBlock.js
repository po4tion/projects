import React from 'react';
import { useSelector } from 'react-redux';
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
  background-color: ${({ pathname, result }) =>
    pathname === '/world'
      ? result === 'moon'
        ? '#fff'
        : 'rgba(47, 54, 64, 0.9)'
      : 'transparent'};
  text-decoration: none;
  color: ${({ pathname, result }) =>
    pathname === '/world'
      ? result === 'moon'
        ? '#778ca3'
        : '#fff'
      : '#778ca3'};
`;

function WorldTypeBlock({ children, location }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledWorldTypeBlock
      result={result}
      pathname={location.pathname}
      to="/world"
    >
      {children}
    </StyledWorldTypeBlock>
  );
}

export default withRouter(WorldTypeBlock);

// '#fff' : '#778ca3'
