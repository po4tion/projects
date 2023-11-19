import React from 'react';
import styled from 'styled-components';

const InternalBlock = styled.p`
  font-size: 16px;
  user-select: none;
`;

function Internal() {
  return <InternalBlock>국내</InternalBlock>;
}

export default Internal;
