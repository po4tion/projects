import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTypeDay } from '../../modules/chartType';
import { changeTypeMonth } from '../../modules/chartType';

import MainTypeBlock from '../atoms/type/MainTypeBlock';
import InternalTypeBlock, {
  StyledInternalTypeBlockCustom,
} from '../atoms/type/InternalTypeBlock';
import WorldTypeBlock, {
  StyledWorldTypeBlockCustom,
} from '../atoms/type/WorldTypeBlock';
import Day from '../atoms/link/Day';
import Month from '../atoms/link/Month';

function TypeBlock() {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.chartData.type);

  const onClickDay = () => dispatch(changeTypeDay());
  const onClickMonth = () => dispatch(changeTypeMonth());

  let day_type = null;

  let month_type = null;

  if (result === 'day') {
    day_type = (
      <StyledInternalTypeBlockCustom>
        <Day onClick={onClickDay} />
      </StyledInternalTypeBlockCustom>
    );
    month_type = (
      <WorldTypeBlock>
        <Month onClick={onClickMonth} />
      </WorldTypeBlock>
    );
  } else if (result === 'month') {
    day_type = (
      <InternalTypeBlock>
        <Day onClick={onClickDay} />
      </InternalTypeBlock>
    );
    month_type = (
      <StyledWorldTypeBlockCustom>
        <Month onClick={onClickMonth} />
      </StyledWorldTypeBlockCustom>
    );
  }

  return (
    <MainTypeBlock>
      <select>d</select>
      {day_type}
      {month_type}
    </MainTypeBlock>
  );
}

export default TypeBlock;
