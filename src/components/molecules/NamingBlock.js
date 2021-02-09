import React from 'react';
import { useSelector } from 'react-redux';

import MainNamingBlock from '../atoms/name/MainNamingBlock';
import SpaceNamingBlock from '../atoms/name/SpaceNamingBlock';
import InnerNamingBlock from '../atoms/name/InnerNamingBlock';
import AttachNamingBlock from '../atoms/name/AttachNamingBlock';
import NumberBlock from '../atoms/name/NumberBlock';

function NamingBlock({ coronic }) {
  const open = useSelector((state) => state.detail.open);

  let details = null;

  if (open) {
    details = (
      <>
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
      </>
    );
  }

  return (
    <MainNamingBlock open={open}>
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
      {details}
    </MainNamingBlock>
  );
}

export default NamingBlock;
