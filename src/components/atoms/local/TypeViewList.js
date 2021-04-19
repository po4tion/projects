import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledTypeViewList = styled.li`
  width: 170px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;

  @media screen and (max-width: 500px) {
    width: 130px;
    font-size: 15px;
  }
`;

function TypeView({ children }) {
  const result = useSelector((state) => state.bgColor.type);

  return <StyledTypeViewList result={result}>{children}</StyledTypeViewList>;
}

export default TypeView;

export const FontFixed = styled(StyledTypeViewList)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
`;
