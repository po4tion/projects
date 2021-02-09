import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const InternalBlock = styled(Link)`
  color: black;
  text-decoration: none;
`;

function Internal() {
  return <InternalBlock to="/">국내</InternalBlock>;
}

export default Internal;
