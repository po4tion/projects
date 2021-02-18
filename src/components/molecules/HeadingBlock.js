import React from 'react';
import { useDispatch } from 'react-redux';

import { changeTypeSun } from '../../modules/bgColor';
import { changeTypeMoon } from '../../modules/bgColor';

import MainHeadingBlock from '../atoms/heading/MainHeadingBlock';
import InnerHeadingBlock from '../atoms/heading/InnerHeadingBlock';
import ChangeSun from '../atoms/heading/ChangeSun';
import ChangeSunList from '../atoms/heading/ChangeSunList';

// icon
import { StyledSun, StyledSunDark } from '../atoms/icons/Sun';
import { StyledMoon, StyledMoonDark } from '../atoms/icons/Moon';

function HeadingBlock() {
  const dispatch = useDispatch();

  const changedSun = () => dispatch(changeTypeSun());

  const changedMoon = () => dispatch(changeTypeMoon());

  return (
    <MainHeadingBlock>
      <InnerHeadingBlock>CORONA DATA</InnerHeadingBlock>
      <ChangeSun>
        <ChangeSunList onClick={changedSun}>
          <StyledSunDark />
        </ChangeSunList>
        <ChangeSunList onClick={changedMoon}>
          <StyledMoonDark />
        </ChangeSunList>
      </ChangeSun>
    </MainHeadingBlock>
  );
}

export default HeadingBlock;
