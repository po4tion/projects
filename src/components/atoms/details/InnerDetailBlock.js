import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openAction } from '../../../modules/detail';

const StyledInnerDetailBlock = styled.div`
  border-radius: 50px;
  background: linear-gradient(145deg, #dbdada, #ffffff);
  box-shadow: 10px 10px 10px #cfcece, -10px -10px 10px #ffffff;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;

function InnerDetailBlock({ children }) {
  const dispatch = useDispatch();

  return (
    <StyledInnerDetailBlock onClick={() => dispatch(openAction())}>
      {children}
    </StyledInnerDetailBlock>
  );
}

export default InnerDetailBlock;
