// 국내 Page View

import React from 'react';
import { useSelector } from 'react-redux';

// atoms
import MainBackgroundBlock from '../components/atoms/bg/MainBackgroundBlock';
import InnerBgBlock from '../components/atoms/bg/InnerBgBlock';
import Line from '../components/atoms/line/Line';
import { MainDetailCustom } from '../components/atoms/details/MainDetailBlock';

// molecules
import HeadingBlock from '../components/molecules/HeadingBlock';
import TypeBlock from '../components/molecules/TypeBlock';
import DateBlock from '../components/molecules/DateBlock';
import FooterBlock from '../components/molecules/FooterBlock';

// API
import CovidData from '../containers/data/CovidData';
import LocalCovidData from '../containers/data/LocalCovidData';

// Chart
import ChartValue from '../containers/data/days/ChartValue';
import ChartValueMonth from '../containers/data/days/ChartValueMonth';

function Main() {
  const result = useSelector((state) => state.chartType.type);

  // 차트 날짜 계산
  const _date = new Date();
  const _dateMonth = _date.getMonth() + 1;
  const _dateYear = _date.getFullYear();

  let chart = null;
  let chartHeading = `코로나 동향 (${_dateMonth}월, ${_dateYear}년)`;

  // 일별, 월별 카테고리에 따라 그래프 변경
  if (result === 'day') {
    chart = <ChartValue />;
  } else if (result === 'month') {
    chart = <ChartValueMonth />;
  }

  return (
    <MainBackgroundBlock>
      <InnerBgBlock>
        <HeadingBlock />
        <TypeBlock />
        <CovidData />
        <Line />
        <MainDetailCustom>{chartHeading}</MainDetailCustom>
        <DateBlock />
        {chart}
        <Line />
        <LocalCovidData />
        <Line />
        <FooterBlock />
      </InnerBgBlock>
    </MainBackgroundBlock>
  );
}

export default Main;
