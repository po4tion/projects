import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTypeDay } from '../../modules/chartType';
import { changeTypeMonth } from '../../modules/chartType';

import MainDateBlock from '../atoms/date/MainDateBlock';
import InnerDateBlock from '../atoms/date/InnerDateBlock';
import ListDateBlock from '../atoms/date/ListDateBlock';

function SelectDateType() {
  const dispatch = useDispatch();
  const result = useSelector((state) => console.log(state.chartType.type));

  const onClickDay = () => dispatch(changeTypeDay());
  const onClickMonth = () => dispatch(changeTypeMonth());

  return (
    <MainDateBlock>
      <InnerDateBlock>
        <ListDateBlock onClick={onClickDay}>일별</ListDateBlock>
        <ListDateBlock onClick={onClickMonth}>월별</ListDateBlock>
      </InnerDateBlock>
    </MainDateBlock>
  );
}

export default SelectDateType;
