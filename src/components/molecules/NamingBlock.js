import React from 'react';
import { useSelector } from 'react-redux';

import MainNamingBlock from '../atoms/name/MainNamingBlock';
import SpaceNamingBlock from '../atoms/name/SpaceNamingBlock';
import InnerNamingBlock from '../atoms/name/InnerNamingBlock';
import AttachNamingBlock from '../atoms/name/AttachNamingBlock';
import NumberBlock from '../atoms/name/NumberBlock';
import FixValueBlock from '../atoms/name/FixValueBlock';

// icon
import { StyledArrowUp } from '../atoms/icons/Arrow';

function NamingBlock({ coronic }) {
  const differ = useSelector((state) => state.differ.result);

  return (
    <MainNamingBlock>
      {coronic ? (
        <>
          <SpaceNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>확진자 </AttachNamingBlock>
              <NumberBlock>{coronic.decideCnt}</NumberBlock>
              <FixValueBlock>
                {differ}
                <StyledArrowUp />
              </FixValueBlock>
            </InnerNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>사망자</AttachNamingBlock>
              <NumberBlock>{coronic.deathCnt}</NumberBlock>
              <FixValueBlock>
                {differ}
                <StyledArrowUp />
              </FixValueBlock>
            </InnerNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>격리해제</AttachNamingBlock>
              <NumberBlock>{coronic.clearCnt}</NumberBlock>
              <FixValueBlock>
                {differ}
                <StyledArrowUp />
              </FixValueBlock>
            </InnerNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>검사진행</AttachNamingBlock>
              <NumberBlock>{coronic.examCnt}</NumberBlock>
              <FixValueBlock>
                {differ}
                <StyledArrowUp />
              </FixValueBlock>
            </InnerNamingBlock>
          </SpaceNamingBlock>
        </>
      ) : null}
    </MainNamingBlock>
  );
}

export default NamingBlock;
