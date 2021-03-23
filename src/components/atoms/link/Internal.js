import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const InternalBlock = styled(Link)`
  color: #778ca3;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
`;

function Internal() {
  return <InternalBlock to="/">국내</InternalBlock>;
}

export default Internal;
