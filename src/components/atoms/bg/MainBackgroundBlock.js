import React from 'react';
import styled from 'styled-components';

import '../../../fonts/fonts.scss';

const StyledMainBackgroundBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  font-family: 'Jal_Onuel';
  z-index: -1;
  overflow: scroll;
`;

function MainBackgroundBlock({ children }) {
  return <StyledMainBackgroundBlock>{children}</StyledMainBackgroundBlock>;
}

export default MainBackgroundBlock;
