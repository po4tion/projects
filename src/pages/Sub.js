// Page View

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
import WorldBlock from '../components/molecules/world/WorldBlock';
import FooterBlock from '../components/molecules/FooterBlock';

// API
import CovidDataW from '../containers/data/world/CovidDataW';

// Chart
import ChartValueW from '../containers/data/world/ChartValueW';
import ChartValueMonthW from '../containers/data/world/ChartValueMonthW';

function Main() {
  const result = useSelector((state) => state.chartType.type);
  const _date = new Date();
  const _dateMonth = _date.getMonth() + 1;
  const _dateYear = _date.getFullYear();

  let chart = null;
  let chartHeading = `세계 코로나 동향 (${_dateMonth}월, ${_dateYear}년)`;

  if (result === 'day') {
    chart = <ChartValueW />;
  } else if (result === 'month') {
    chart = <ChartValueMonthW />;
  }

  return (
    <MainBackgroundBlock>
      <InnerBgBlock>
        <HeadingBlock />
        <TypeBlock />
        <CovidDataW />
        <Line />
        <MainDetailCustom>{chartHeading}</MainDetailCustom>
        <DateBlock />
        {chart}
        <Line />
        <WorldBlock />
        <Line />
        <FooterBlock />
      </InnerBgBlock>
    </MainBackgroundBlock>
  );
}

export default Main;
