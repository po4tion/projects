import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledMainNamingBlock = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 5px 0 0 0;
  height: 100px;
  border-radius: 19px;
  background: ${({ result }) => (result === 'moon' ? '#fff' : '#2f3640')};
  box-shadow: ${({ result }) =>
    result === 'moon'
      ? '5px 5px 7px #9c9c9c, -5px -5px 7px #ffffff'
      : '5px 5px 7px #1d2127, -5px -5px 7px #414b59'};
`;

function MainNamingBlock({ children, open }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledMainNamingBlock open={open} result={result}>
      {children}
    </StyledMainNamingBlock>
  );
}

export default MainNamingBlock;
