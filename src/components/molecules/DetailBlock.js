import React from 'react';

import MainDetailBlock from '../atoms/details/MainDetailBlock';
import InnerDetailBlock from '../atoms/details/InnerDetailBlock';
import DownArrow from '../atoms/icons/DownArrow';

function DetailBlock() {
  return (
    <MainDetailBlock>
      <InnerDetailBlock>
        세부사항 <DownArrow />
      </InnerDetailBlock>
    </MainDetailBlock>
  );
}

export default DetailBlock;
