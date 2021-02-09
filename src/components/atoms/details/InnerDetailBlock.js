import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { openAction } from '../../../modules/detail';

const StyledInnerDetailBlock = styled.p`
  font-size: 16px;
  cursor: pointer;
`;

function InnerDetailBlock({ children }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.detail.open);

  return (
    <StyledInnerDetailBlock onClick={() => dispatch(openAction())}>
      {children}
    </StyledInnerDetailBlock>
  );
}

export default InnerDetailBlock;
