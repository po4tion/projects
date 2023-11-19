import React from 'react';
import { GiWorld } from 'react-icons/gi';
import styled from 'styled-components';

const StyledWorld_ = styled(GiWorld)`
  font-size: 16px;
  padding-right: 2px;
`;

function World_() {
  return <StyledWorld_ />;
}

export default World_;
