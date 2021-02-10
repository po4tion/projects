import React from 'react';

import MainDateBlock from '../atoms/date/MainDateBlock';
import InnerDateBlock from '../atoms/date/InnerDateBlock';
import ListDateBlock from '../atoms/date/ListDateBlock';

function SelectDateType() {
  return (
    <MainDateBlock>
      <InnerDateBlock>
        <ListDateBlock>일별</ListDateBlock>
        <ListDateBlock>월별</ListDateBlock>
      </InnerDateBlock>
    </MainDateBlock>
  );
}

export default SelectDateType;
