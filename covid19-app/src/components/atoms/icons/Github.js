import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledGithub = styled(AiFillGithub)`
  color: ${({ state }) => (state === 'moon' ? '#2f3640' : '#fff')};
  font-size: 48px;
`;

function Github() {
  const state = useSelector((state) => state.bgColor.type);

  return <StyledGithub state={state} />;
}

export default Github;
