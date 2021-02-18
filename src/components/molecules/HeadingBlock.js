import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeTypeSun } from '../../modules/bgColor';
import { changeTypeMoon } from '../../modules/bgColor';

import MainHeadingBlock from '../atoms/heading/MainHeadingBlock';
import InnerHeadingBlock from '../atoms/heading/InnerHeadingBlock';
import ChangeSun from '../atoms/heading/ChangeSun';
import ChangeSunList from '../atoms/heading/ChangeSunList';

// icon
import { StyledSun } from '../atoms/icons/Sun';
import { StyledMoonDark } from '../atoms/icons/Moon';

function HeadingBlock() {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.bgColor.type);

  const changedSun = () => dispatch(changeTypeSun());

  const changedMoon = () => dispatch(changeTypeMoon());

  let sunList;

  if (result === 'sun') {
    sunList = (
      <ChangeSunList onClick={changedMoon}>
        <StyledMoonDark />
      </ChangeSunList>
    );
  } else if (result === 'moon') {
    sunList = (
      <ChangeSunList onClick={changedSun}>
        <StyledSun />
      </ChangeSunList>
    );
  }

  return (
    <MainHeadingBlock>
      <InnerHeadingBlock>CORONA DATA</InnerHeadingBlock>
      <ChangeSun>{sunList}</ChangeSun>
    </MainHeadingBlock>
  );
}

export default HeadingBlock;
