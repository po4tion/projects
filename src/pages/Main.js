import React from 'react';
import { Route, Switch } from 'react-router-dom';

// atoms
import MainBackgroundBlock from '../components/atoms/bg/MainBackgroundBlock';
import InnerBgBlock from '../components/atoms/bg/InnerBgBlock';

// molecules
import HeadingBlock from '../components/molecules/HeadingBlock';
import TypeBlock from '../components/molecules/TypeBlock';
import DetailBlock from '../components/molecules/DetailBlock';

import CovidData from '../containers/data/CovidData';
import WorldCovidData from '../containers/data/WorldCovidData';

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
      </InnerBgBlock>
    </MainBackgroundBlock>
  );
}

export default Main;
