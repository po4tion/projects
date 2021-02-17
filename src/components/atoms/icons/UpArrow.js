import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import styled from 'styled-components';

const StyledUpArrow = styled(AiOutlineArrowUp)`
  font-size: 13px;
`;

function UpArrow() {
  return <StyledUpArrow />;
}

export default UpArrow;
