import React from 'react';
import styled from 'styled-components';

const WorldBlock = styled.p`
  font-size: 16px;
  user-select: none;
`;

function World() {
  return <WorldBlock>세계</WorldBlock>;
}

export default World;
