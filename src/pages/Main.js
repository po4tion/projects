import React from 'react';

// atoms
import MainBackgroundBlock from '../components/atoms/bg/MainBackgroundBlock';
import InnerBgBlock from '../components/atoms/bg/InnerBgBlock';

// molecules
import HeadingBlock from '../components/molecules/HeadingBlock';
import TypeBlock from '../components/molecules/TypeBlock';
import DetailBlock from '../components/molecules/DetailBlock';

import CovidData from '../containers/data/CovidData';

function Main() {
  return (
    <MainBackgroundBlock>
      <InnerBgBlock>
        <HeadingBlock />
        <TypeBlock />
        <CovidData />
        <DetailBlock />
      </InnerBgBlock>
    </MainBackgroundBlock>
  );
}

export default Main;
