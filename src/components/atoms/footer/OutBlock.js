import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledOutBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: ${({ state }) => (state === 'moon' ? '#fff' : '#2f3640')};
  margin-top: 30px;
  margin-bottom: 40px;
  border-radius: 7px;
  text-decoration: none;
`;

function OutBlock({ children }) {
  const state = useSelector((state) => state.bgColor.type);

  return <StyledOutBlock state={state}>{children}</StyledOutBlock>;
}

export default OutBlock;
