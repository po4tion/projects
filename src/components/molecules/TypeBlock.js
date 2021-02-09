import React from 'react';

import MainTypeBlock from '../atoms/type/MainTypeBlock';
import InternalTypeBlock from '../atoms/type/InternalTypeBlock';
import WorldTypeBlock from '../atoms/type/WorldTypeBlock';
import Internal from '../atoms/link/Internal';
import World from '../atoms/link/World';

function TypeBlock() {
  return (
    <MainTypeBlock>
      <InternalTypeBlock>
        <Internal />
      </InternalTypeBlock>
      <WorldTypeBlock>
        <World />
      </WorldTypeBlock>
    </MainTypeBlock>
  );
}

export default TypeBlock;
