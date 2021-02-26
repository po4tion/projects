import React from 'react';
import { useDispatch } from 'react-redux';
import { changeTypeDay } from '../../modules/chartType';
import { changeTypeMonth } from '../../modules/chartType';

import MainTypeBlock from '../atoms/type/MainTypeBlock';
import InternalTypeBlock from '../atoms/type/InternalTypeBlock';
import WorldTypeBlock from '../atoms/type/WorldTypeBlock';
import Day from '../atoms/link/Day';
import Month from '../atoms/link/Month';

function TypeBlock() {
  const dispatch = useDispatch();

  const onClickDay = () => dispatch(changeTypeDay());
  const onClickMonth = () => dispatch(changeTypeMonth());

  return (
    <MainTypeBlock>
      <InternalTypeBlock>
        <Day onClick={onClickDay} />
      </InternalTypeBlock>
      <WorldTypeBlock>
        <Month onClick={onClickMonth} />
      </WorldTypeBlock>
    </MainTypeBlock>
  );
}

export default TypeBlock;
