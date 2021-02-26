import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// atoms
import MainBackgroundBlock from '../components/atoms/bg/MainBackgroundBlock';
import InnerBgBlock from '../components/atoms/bg/InnerBgBlock';
import Line from '../components/atoms/line/Line';
import { MainDetailCustom } from '../components/atoms/details/MainDetailBlock';

// molecules
import HeadingBlock from '../components/molecules/HeadingBlock';
import TypeBlock from '../components/molecules/TypeBlock';
import DetailBlock from '../components/molecules/DetailBlock';
import DateBlock from '../components/molecules/DateBlock';

// API
import CovidData from '../containers/data/CovidData';
import LocalCovidData from '../containers/data/LocalCovidData';
import WorldCovidData from '../containers/data/WorldCovidData';
// import Highchart from '../containers/highchart/Highchart';
import HighchartMonth from '../containers/highchart/HighchartMonth';
import ChartValue from '../containers/data/days/ChartValue';

function Main() {
  const result = useSelector((state) => state.chartType.type);
  const _date = new Date();
  const _dateMonth = _date.getMonth() + 1;
  const _dateYear = _date.getFullYear();

  let chart = null;
  let chartHeading = `코로나 동향 (${_dateMonth}월, ${_dateYear}년)`;

  if (result === 'day') {
    chart = <ChartValue />;
  } else if (result === 'month') {
    chart = <HighchartMonth />;
  }

  return (
    <MainBackgroundBlock>
      <InnerBgBlock>
        <HeadingBlock />
        <TypeBlock />
        <Switch>
          <Route path="/" exact component={CovidData} />
          <Route path="/world" exact component={WorldCovidData} />
        </Switch>
        <DetailBlock />
        <Line />
        <MainDetailCustom>{chartHeading}</MainDetailCustom>
        <DateBlock />
        {chart}
        <Line />
        <LocalCovidData />
      </InnerBgBlock>
    </MainBackgroundBlock>
  );
}

export default Main;
