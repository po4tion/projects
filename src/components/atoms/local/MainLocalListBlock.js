import React from 'react';
import styled from 'styled-components';

const StyledMainLocalListBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: ${({ bg }) =>
    bg === 0 || bg % 2 === 0 ? '#f1f2f6' : '#fff'};
`;

function MainLocalListBlock({ children, bg }) {
  console.log('bg', bg);

  return (
    <StyledMainLocalListBlock bg={bg}>{children}</StyledMainLocalListBlock>
  );
}

export default MainLocalListBlock;
