import React from 'react';
import { useSelector } from 'react-redux';

import MainNamingBlock from '../atoms/name/MainNamingBlock';
import SpaceNamingBlock from '../atoms/name/SpaceNamingBlock';
import InnerNamingBlock from '../atoms/name/InnerNamingBlock';
import AttachNamingBlock from '../atoms/name/AttachNamingBlock';
import NumberBlock from '../atoms/name/NumberBlock';
import FixValueBlock from '../atoms/name/FixValueBlock';

// icon
import { StyledArrowUp, StyledArrowDown } from '../atoms/icons/Arrow';

function NamingBlock() {
  const prev = useSelector((state) => state.differ.prev);
  const current = useSelector((state) => state.differ.current);

  let result = <StyledArrowUp />;

  // if (current - prev < 0) {
  //   result = <StyledArrowDown />;
  // }

  return (
    <MainNamingBlock>
      <>
        <SpaceNamingBlock>
          <InnerNamingBlock>
            <AttachNamingBlock>확진자 </AttachNamingBlock>
            <NumberBlock>{current.decideCnt}</NumberBlock>
            <FixValueBlock>
              {Math.abs(current.decideCnt - prev.decideCnt)}
              {result}
            </FixValueBlock>
          </InnerNamingBlock>
          <InnerNamingBlock>
            <AttachNamingBlock>사망자</AttachNamingBlock>
            <NumberBlock>{current.deathCnt}</NumberBlock>
            <FixValueBlock>
              {Math.abs(current.deathCnt - prev.deathCnt)}
              {result}
            </FixValueBlock>
          </InnerNamingBlock>
          <InnerNamingBlock>
            <AttachNamingBlock>격리해제</AttachNamingBlock>
            <NumberBlock>{current.clearCnt}</NumberBlock>
            <FixValueBlock>
              {Math.abs(current.clearCnt - prev.clearCnt)}
              {result}
            </FixValueBlock>
          </InnerNamingBlock>
          <InnerNamingBlock>
            <AttachNamingBlock>검사진행</AttachNamingBlock>
            <NumberBlock>{current.examCnt}</NumberBlock>
            <FixValueBlock>
              {Math.abs(current.examCnt - prev.examCnt)}
              {result}
            </FixValueBlock>
          </InnerNamingBlock>
        </SpaceNamingBlock>
      </>
    </MainNamingBlock>
  );
}

export default NamingBlock;
