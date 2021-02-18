import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import '../../../fonts/fonts.scss';

const StyledMainBackgroundBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ result }) => (result === 'moon' ? '#000' : '#fff')};
  font-family: 'Jal_Onuel';
  z-index: -1;
  overflow: scroll;
`;

function MainBackgroundBlock({ children }) {
  const result = useSelector((state) => state.bgColor.type);

  return (
    <StyledMainBackgroundBlock result={result}>
      {children}
    </StyledMainBackgroundBlock>
  );
}

export default MainBackgroundBlock;
