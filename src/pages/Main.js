import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// atoms
import MainBackgroundBlock from '../components/atoms/bg/MainBackgroundBlock';
import InnerBgBlock from '../components/atoms/bg/InnerBgBlock';
import Line from '../components/atoms/line/Line';

// molecules
import HeadingBlock from '../components/molecules/HeadingBlock';
import TypeBlock from '../components/molecules/TypeBlock';
import DetailBlock from '../components/molecules/DetailBlock';
import SelectDateType from '../components/molecules/SelectDateType';
import LocalBlock from '../components/molecules/LocalBlock';

// API
import CovidData from '../containers/data/CovidData';
import WorldCovidData from '../containers/data/WorldCovidData';
import Highchart from '../containers/highchart/Highchart';
import HighchartMonth from '../containers/highchart/HighchartMonth';

function Main() {
  const result = useSelector((state) => state.chartType.type);

  let chart = null;

  if (result === 'day') {
    chart = <Highchart />;
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
        <SelectDateType />
        {chart}
        <Line />
        <LocalBlock />
      </InnerBgBlock>
    </MainBackgroundBlock>
  );
}

export default Main;
