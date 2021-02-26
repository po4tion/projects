import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WorldBlock = styled(Link)`
  color: #778ca3;
  text-decoration: none;
`;

function World() {
  return <WorldBlock to="/world">세계</WorldBlock>;
}

export default World;
