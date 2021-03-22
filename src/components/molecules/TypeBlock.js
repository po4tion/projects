import React from 'react';
import { withRouter } from 'react-router-dom';

import { StyledMainTypeBlockCustom } from '../atoms/type/MainTypeBlock';
import InternalTypeBlock, {
  StyledInternalTypeBlockCustom,
} from '../atoms/type/InternalTypeBlock';
import WorldTypeBlock, {
  StyledWorldTypeBlockCustom,
} from '../atoms/type/WorldTypeBlock';
import Internal from '../atoms/link/Internal';
import World from '../atoms/link/World';
import South from '../atoms/icons/South';
import WorldIcon from '../atoms/icons/World_';

function TypeBlock({ location }) {
  const pathname = location.pathname;
  let input;

  if (pathname === '/') {
    input = (
      <>
        <StyledInternalTypeBlockCustom>
          <South />
          <Internal />
        </StyledInternalTypeBlockCustom>
        <WorldTypeBlock>
          <WorldIcon />
          <World />
        </WorldTypeBlock>
      </>
    );
  } else {
    input = (
      <>
        <InternalTypeBlock>
          <South />
          <Internal />
        </InternalTypeBlock>
        <StyledWorldTypeBlockCustom>
          <WorldIcon />
          <World />
        </StyledWorldTypeBlockCustom>
      </>
    );
  }

  return <StyledMainTypeBlockCustom>{input}</StyledMainTypeBlockCustom>;
}

export default withRouter(TypeBlock);
