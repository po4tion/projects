import React from 'react';
import styled from 'styled-components';

const StyledWorldTypeBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  margin-left: 1px;
  border: 2px solid #778ca3;
  border-radius: 5px;
  cursor: pointer;
`;

function WorldTypeBlock({ children }) {
  return <StyledWorldTypeBlock>{children}</StyledWorldTypeBlock>;
}

export default WorldTypeBlock;

export const StyledWorldTypeBlockCustom = styled(StyledWorldTypeBlock)`
  background-color: rgba(126, 214, 223, 0.3);
`;
