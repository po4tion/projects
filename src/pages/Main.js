import React from 'react';

// atoms
import MainBackgroundBlock from '../components/atoms/bg/MainBackgroundBlock';
import InnerBgBlock from '../components/atoms/bg/InnerBgBlock';

// molecules
import HeadingBlock from '../components/molecules/HeadingBlock';
import TypeBlock from '../components/molecules/TypeBlock';
import NamingBlock from '../components/molecules/NamingBlock';
import DetailBlock from '../components/molecules/DetailBlock';

function Main() {
  return (
    <MainBackgroundBlock>
      <InnerBgBlock>
        <HeadingBlock />
        <TypeBlock />
        <NamingBlock />
        <DetailBlock />
      </InnerBgBlock>
    </MainBackgroundBlock>
  );
}

export default Main;
