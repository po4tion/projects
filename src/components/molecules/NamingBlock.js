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

function NamingBlock({ coronic }) {
  const prev = useSelector((state) => state.differ.prev);
  const current = useSelector((state) => state.differ.current);

  console.log(prev);

  let result = <StyledArrowUp />;

  if (current - prev < 0) {
    result = <StyledArrowDown />;
  }

  return (
    <MainNamingBlock>
      {coronic ? (
        <>
          <SpaceNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>확진자 </AttachNamingBlock>
              <NumberBlock>{coronic.decideCnt}</NumberBlock>
              <FixValueBlock>
                {Math.abs(current - prev)}
                {result}
              </FixValueBlock>
            </InnerNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>사망자</AttachNamingBlock>
              <NumberBlock>{coronic.deathCnt}</NumberBlock>
              <FixValueBlock>
                {Math.abs(current - prev)}
                {result}
              </FixValueBlock>
            </InnerNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>격리해제</AttachNamingBlock>
              <NumberBlock>{coronic.clearCnt}</NumberBlock>
              <FixValueBlock>
                {Math.abs(current - prev)}
                {result}
              </FixValueBlock>
            </InnerNamingBlock>
            <InnerNamingBlock>
              <AttachNamingBlock>검사진행</AttachNamingBlock>
              <NumberBlock>{coronic.examCnt}</NumberBlock>
              <FixValueBlock>
                {Math.abs(current - prev)}
                {result}
              </FixValueBlock>
            </InnerNamingBlock>
          </SpaceNamingBlock>
        </>
      ) : null}
    </MainNamingBlock>
  );
}

export default NamingBlock;
