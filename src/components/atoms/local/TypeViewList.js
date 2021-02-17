import React from 'react';
import styled from 'styled-components';

const StyledTypeViewList = styled.li`
  width: 170px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

function TypeView({ children }) {
  return <StyledTypeViewList>{children}</StyledTypeViewList>;
}

export default TypeView;

export const FontFixed = styled(StyledTypeViewList)`
  font-size: 16px;
  font-weight: normal;
  color: blue;
`;
