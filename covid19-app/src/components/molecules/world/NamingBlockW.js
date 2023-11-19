import React from 'react';
import { useSelector } from 'react-redux';

import MainNamingBlock from '../../atoms/name/MainNamingBlock';
import SpaceNamingBlock from '../../atoms/name/SpaceNamingBlock';
import InnerNamingBlock from '../../atoms/name/InnerNamingBlock';
import AttachNamingBlock from '../../atoms/name/AttachNamingBlock';
import NumberBlock from '../../atoms/name/NumberBlock';
import FixValueBlock from '../../atoms/name/FixValueBlock';

// icon
import Arrow from '../../atoms/icons/Arrow';

function NamingBlock() {
  const cnt = useSelector((state) => state.worldValue);

  return (
    <MainNamingBlock>
      <SpaceNamingBlock>
        <InnerNamingBlock>
          <AttachNamingBlock color="red">확진자 </AttachNamingBlock>
          <NumberBlock color="red">
            {cnt.decideCnt.toLocaleString('ko-KR')}
          </NumberBlock>
          <FixValueBlock color="red">
            {Math.abs(cnt.decideCnt - cnt.prev.decideCnt).toLocaleString(
              'ko-KR'
            )}
            <Arrow />
          </FixValueBlock>
        </InnerNamingBlock>
        <InnerNamingBlock>
          <AttachNamingBlock color="black">사망자</AttachNamingBlock>
          <NumberBlock>{cnt.deathCnt.toLocaleString('ko-KR')}</NumberBlock>
          <FixValueBlock>
            {Math.abs(cnt.deathCnt - cnt.prev.deathCnt).toLocaleString('ko-KR')}
            <Arrow />
          </FixValueBlock>
        </InnerNamingBlock>
      </SpaceNamingBlock>
    </MainNamingBlock>
  );
}

export default NamingBlock;
