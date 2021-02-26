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

  if (coronic) {
    if (open) {
      details = (
        <>
          <SpaceNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>검사진행</AttachNamingBlock>
              <NumberBlock>{coronic.examCnt} 명</NumberBlock>
            </InnerNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>치료중</AttachNamingBlock>
              <NumberBlock>{coronic.careCnt} 명</NumberBlock>
            </InnerNamingBlock>
          </SpaceNamingBlock>
          <SpaceNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>확진률</AttachNamingBlock>
              <NumberBlock>{coronic.accDefRate.toFixed(2)}%</NumberBlock>
            </InnerNamingBlock>
          </SpaceNamingBlock>
        </>
      );
    }
  }

  return (
    <MainNamingBlock open={open}>
      {coronic ? (
        <>
          <SpaceNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>총 확진자 수</AttachNamingBlock>
              <NumberBlock>{coronic.decideCnt} 명</NumberBlock>
            </InnerNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>당일 확진자 수</AttachNamingBlock>
              <NumberBlock>1,000 명</NumberBlock>
            </InnerNamingBlock>
          </SpaceNamingBlock>
          <SpaceNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>사망자</AttachNamingBlock>
              <NumberBlock>{coronic.deathCnt} 명</NumberBlock>
            </InnerNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>격리해제</AttachNamingBlock>
              <NumberBlock>{coronic.clearCnt} 명</NumberBlock>
            </InnerNamingBlock>
          </SpaceNamingBlock>
        </>
      ) : null}

      {details}
    </MainNamingBlock>
  );
}

export default NamingBlock;
