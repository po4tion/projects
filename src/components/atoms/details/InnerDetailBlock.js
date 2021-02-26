import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openAction } from '../../../modules/detail';

const StyledInnerDetailBlock = styled.div`
  border: 1px solid #778ca3;
  border-radius: 5px;
  padding: 8px;
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

/* const StyledInnerDetailBlock = styled.div`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`; */
