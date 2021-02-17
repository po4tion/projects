import React from 'react';
import { useSelector } from 'react-redux';

import MainDetailBlock from '../atoms/details/MainDetailBlock';
import InnerDetailBlock from '../atoms/details/InnerDetailBlock';
import DownArrow from '../atoms/icons/DownArrow';
import UpArrow from '../atoms/icons/UpArrow';

function DetailBlock() {
  const open = useSelector((state) => state.detail.open);

  let arrow = null;

  if (!open) {
    arrow = <DownArrow />;
  } else {
    arrow = <UpArrow />;
  }

  return (
    <MainDetailBlock>
      <InnerDetailBlock>세부사항 {arrow}</InnerDetailBlock>
    </MainDetailBlock>
  );
}

export default DetailBlock;
