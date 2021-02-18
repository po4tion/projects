import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledMainDetailBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #778ca3;
  font-weight: bold;
  height: 30px;
`;

function MainDetailBlock({ children }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledMainDetailBlock result={result}>{children}</StyledMainDetailBlock>
  );
}

export default MainDetailBlock;

export const MainDetailCustom = styled(StyledMainDetailBlock)`
  padding-top: 10px;
  font-size: 20px;
`;
