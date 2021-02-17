import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openAction } from '../../../modules/detail';

const StyledInnerDetailBlock = styled.p`
  border: 1px solid black;
  font-size: 16px;
  cursor: pointer;
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
