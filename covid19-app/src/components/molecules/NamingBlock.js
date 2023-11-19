import React from 'react';
import { useSelector } from 'react-redux';

import MainNamingBlock from '../atoms/name/MainNamingBlock';
import SpaceNamingBlock from '../atoms/name/SpaceNamingBlock';
import InnerNamingBlock from '../atoms/name/InnerNamingBlock';
import AttachNamingBlock from '../atoms/name/AttachNamingBlock';
import NumberBlock from '../atoms/name/NumberBlock';
import FixValueBlock from '../atoms/name/FixValueBlock';

// icon
import Arrow from '../atoms/icons/Arrow';

function NamingBlock() {
  const prev = useSelector((state) => state.differ.prev);
  const current = useSelector((state) => state.differ.current);

  return (
    <MainNamingBlock>
      <SpaceNamingBlock>
        <InnerNamingBlock>
          <AttachNamingBlock color="red">확진자</AttachNamingBlock>
          <NumberBlock color="red">
            {current.decideCnt.toLocaleString('ko-KR')}
          </NumberBlock>
          <FixValueBlock color="red">
            {Math.abs(current.decideCnt - prev.decideCnt)}
            <Arrow color="red" />
          </FixValueBlock>
        </InnerNamingBlock>
        <InnerNamingBlock>
          <AttachNamingBlock color="orange">검사진행</AttachNamingBlock>
          <NumberBlock color="orange">
            {current.examCnt.toLocaleString('ko-KR')}
          </NumberBlock>
          <FixValueBlock color="orange">
            {Math.abs(current.examCnt - prev.examCnt)}
            <Arrow color="orange" />
          </FixValueBlock>
        </InnerNamingBlock>
        <InnerNamingBlock>
          <AttachNamingBlock color="green">격리해제</AttachNamingBlock>
          <NumberBlock color="green">
            {current.clearCnt.toLocaleString('ko-KR')}
          </NumberBlock>
          <FixValueBlock color="green">
            {Math.abs(current.clearCnt - prev.clearCnt)}
            <Arrow color="green" />
          </FixValueBlock>
        </InnerNamingBlock>
        <InnerNamingBlock>
          <AttachNamingBlock color="black">사망자</AttachNamingBlock>
          <NumberBlock color="black">
            {current.deathCnt.toLocaleString('ko-KR')}
          </NumberBlock>
          <FixValueBlock color="black">
            {Math.abs(current.deathCnt - prev.deathCnt)}
            <Arrow color="black" />
          </FixValueBlock>
        </InnerNamingBlock>
      </SpaceNamingBlock>
    </MainNamingBlock>
  );
}

export default NamingBlock;
