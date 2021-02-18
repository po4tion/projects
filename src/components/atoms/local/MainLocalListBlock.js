import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledMainLocalListBlock = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 7px;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: ${({ bg }) =>
    bg === 0 || bg % 2 === 0 ? '#2f3640' : '#fff'};
`;

function MainLocalListBlock({ children, bg }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledMainLocalListBlock bg={bg} result={result}>
      {children}
    </StyledMainLocalListBlock>
  );
}

export default MainLocalListBlock;
