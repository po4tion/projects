import React from 'react';

import MainNamingBlock from '../atoms/name/MainNamingBlock';
import SpaceNamingBlock from '../atoms/name/SpaceNamingBlock';
import InnerNamingBlock from '../atoms/name/InnerNamingBlock';
import AttachNamingBlock from '../atoms/name/AttachNamingBlock';
import NumberBlock from '../atoms/name/NumberBlock';

function NamingBlock({ coronic }) {
  return (
    <MainNamingBlock>
      <SpaceNamingBlock>
        <InnerNamingBlock>
          <AttachNamingBlock>총 확진자 수</AttachNamingBlock>
          <NumberBlock>{coronic}</NumberBlock>
        </InnerNamingBlock>
        <InnerNamingBlock>
          <AttachNamingBlock>당일 확진자 수</AttachNamingBlock>
          <NumberBlock>1,000</NumberBlock>
        </InnerNamingBlock>
      </SpaceNamingBlock>
      {/* <SpaceNamingBlock>
        <InnerNamingBlock />
        <InnerNamingBlock />
      </SpaceNamingBlock>
      <SpaceNamingBlock>
        <InnerNamingBlock />
        <InnerNamingBlock />
      </SpaceNamingBlock> */}
    </MainNamingBlock>
  );
}

export default NamingBlock;
