import React from 'react';

import { StyledMainTypeBlockCustom } from '../atoms/type/MainTypeBlock';
import InternalTypeBlock from '../atoms/type/InternalTypeBlock';
import WorldTypeBlock from '../atoms/type/WorldTypeBlock';
import Internal from '../atoms/link/Internal';
import World from '../atoms/link/World';
import South from '../atoms/icons/South';
import WorldIcon from '../atoms/icons/World_';

function TypeBlock() {
  return (
    <StyledMainTypeBlockCustom>
      <InternalTypeBlock>
        <South />
        <Internal />
      </InternalTypeBlock>
      <WorldTypeBlock>
        <WorldIcon />
        <World />
      </WorldTypeBlock>
    </StyledMainTypeBlockCustom>
  );
}

export default TypeBlock;
