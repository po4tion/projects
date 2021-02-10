import React from 'react';
import { Route, Switch } from 'react-router-dom';

// atoms
import MainBackgroundBlock from '../components/atoms/bg/MainBackgroundBlock';
import InnerBgBlock from '../components/atoms/bg/InnerBgBlock';
import MainChartBlock from '../components/atoms/chart/MainChartBlock';

// molecules
import HeadingBlock from '../components/molecules/HeadingBlock';
import TypeBlock from '../components/molecules/TypeBlock';
import DetailBlock from '../components/molecules/DetailBlock';
import SelectDateType from '../components/molecules/SelectDateType';

// API
import CovidData from '../containers/data/CovidData';
import WorldCovidData from '../containers/data/WorldCovidData';
import Highcharts from '../containers/highchart/Highchart';

function Main() {
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
        <Highcharts />
      </InnerBgBlock>
    </MainBackgroundBlock>
  );
}

export default Main;
