import React from 'react';

import MainTypeBlock from '../atoms/type/MainTypeBlock';
import InternalTypeBlock from '../atoms/type/InternalTypeBlock';
import WorldTypeBlock from '../atoms/type/WorldTypeBlock';

function TypeBlock() {
  return (
    <MainTypeBlock>
      <InternalTypeBlock />
      <WorldTypeBlock />
    </MainTypeBlock>
  );
}

export default TypeBlock;
