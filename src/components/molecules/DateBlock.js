// 코로나 차트 API 데이터별 / 일별 / 월별 선택 기능
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTypeDay,
  changeTypeMonth,
  changeTypeOption,
} from '../../modules/chartType';

import MainTypeBlock from '../atoms/type/MainTypeBlock';
import InternalTypeBlock, {
  StyledInternalTypeBlockCustom,
} from '../atoms/type/InternalTypeBlock';
import WorldTypeBlock, {
  StyledWorldTypeBlockCustom,
} from '../atoms/type/WorldTypeBlock';
import AlignBlock from '../atoms/type/AlignBlock';
import Day from '../atoms/link/Day';
import Month from '../atoms/link/Month';

// 차트 타입
import ChartTypeSelect from '../atoms/chartType/ChartTypeSelect';
import ChartTypeOption from '../atoms/chartType/ChartTypeOption';

function DateBlock() {
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

  const onChange = (e) => dispatch(changeTypeOption(e.target.value));

  return (
    <MainTypeBlock>
      <ChartTypeSelect onChange={onChange}>
        <ChartTypeOption value="decide">확진자</ChartTypeOption>
        <ChartTypeOption value="death">사망자</ChartTypeOption>
        <ChartTypeOption value="exam">검사진행</ChartTypeOption>
        <ChartTypeOption value="clear">격리해제</ChartTypeOption>
        <ChartTypeOption value="care">치료중</ChartTypeOption>
      </ChartTypeSelect>
      <AlignBlock>
        {day_type}
        {month_type}
      </AlignBlock>
    </MainTypeBlock>
  );
}

export default DateBlock;
