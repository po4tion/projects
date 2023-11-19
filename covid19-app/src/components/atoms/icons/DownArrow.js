import React from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import styled from 'styled-components';

const StyledDownArrow = styled(AiOutlineArrowDown)`
  font-size: 13px;
`;

function DownArrow() {
  return <StyledDownArrow />;
}

export default DownArrow;
