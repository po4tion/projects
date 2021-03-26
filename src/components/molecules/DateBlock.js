// 코로나 차트 API 데이터별 / 일별 / 월별 선택 기능
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

// module
import {
  changeTypeDay,
  changeTypeMonth,
  changeTypeOption,
} from '../../modules/chartType';

// atoms
import MainTypeBlock from '../atoms/type/MainTypeBlock';
import DayBlock from '../atoms/type/DayBlock';
import MonthBlock from '../atoms/type/MonthBlock';
import AlignBlock from '../atoms/type/AlignBlock';
import Day from '../atoms/link/Day';
import Month from '../atoms/link/Month';

// 차트 타입
import ChartTypeSelect from '../atoms/chartType/ChartTypeSelect';
import ChartTypeOption from '../atoms/chartType/ChartTypeOption';

function DateBlock({ location }) {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.chartData.type);

  const onClickDay = () => dispatch(changeTypeDay());
  const onClickMonth = () => dispatch(changeTypeMonth());

  const onChange = (e) => dispatch(changeTypeOption(e.target.value));

  // pathname에 따른 optiontype
  let options = (
    <>
      <ChartTypeOption value="decide">확진자</ChartTypeOption>
      <ChartTypeOption value="death">사망자</ChartTypeOption>
      <ChartTypeOption value="exam">검사진행</ChartTypeOption>
      <ChartTypeOption value="clear">격리해제</ChartTypeOption>
      <ChartTypeOption value="care">치료중</ChartTypeOption>
    </>
  );

  if (location.pathname === '/world') {
    options = (
      <>
        <ChartTypeOption value="decide">확진자</ChartTypeOption>
        <ChartTypeOption value="death">사망자</ChartTypeOption>
      </>
    );
  }

  return (
    <MainTypeBlock>
      <ChartTypeSelect onChange={onChange}>{options}</ChartTypeSelect>
      <AlignBlock>
        <DayBlock day={result} onClick={onClickDay}>
          <Day />
        </DayBlock>
        <MonthBlock month={result} onClick={onClickMonth}>
          <Month />
        </MonthBlock>
      </AlignBlock>
    </MainTypeBlock>
  );
}

export default withRouter(DateBlock);
