import React from 'react';
import { GiSouthKorea } from 'react-icons/gi';
import styled from 'styled-components';

const StyledSouth = styled(GiSouthKorea)`
  color: #778ca3;
  font-size: 16px;
`;

function South() {
  return <StyledSouth />;
}

export default South;
