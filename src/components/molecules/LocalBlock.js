import React from 'react';
import { useSelector } from 'react-redux';

// atoms
import { MainDetailCustom } from '../atoms/details/MainDetailBlock';
import LocalChartBlock from '../atoms/local/LocalChartBlock';
import MainLocalListBlock from '../atoms/local/MainLocalListBlock';
import TypeView from '../atoms/local/TypeView';
import TypeViewList, {
  FontFixed,
  FontFixedUpdate,
} from '../atoms/local/TypeViewList';
import VerticalLine from '../atoms/line/VerticalLine';
import FixValueBlock from '../atoms/name/FixValueBlock';
import Arrow from '../atoms/icons/Arrow';
import { CustomLine, CustomLine02 } from '../atoms/line/Line';

function LocalBlock() {
  const result = useSelector((state) => state.internalLocal);
  const current = result.array;
  const prev = result.prevArray;
  let charList = null;

  if (prev.length !== 0) {
    charList = current.map((x, index) => {
      return (
        <MainLocalListBlock key={index} bg={index}>
          <TypeView idx={index}>
            <FontFixed>{x.gubun}</FontFixed>
            <VerticalLine />
            <FontFixed>{x.defCnt.toLocaleString('ko-KR')}</FontFixed>
            <VerticalLine />
            <FontFixed>
              {(x.defCnt - prev[index].defCnt).toLocaleString('ko-KR')}
            </FontFixed>
            <VerticalLine />
            <FontFixed>
              {x.deathCnt.toLocaleString('ko-KR')}&nbsp;
              <FixValueBlock>
                {(x.deathCnt - prev[index].deathCnt).toLocaleString('ko-KR')}
                <Arrow />
              </FixValueBlock>
            </FontFixed>
          </TypeView>
        </MainLocalListBlock>
      );
    });
  }

  return (
    <>
      <MainDetailCustom>지역별(시, 도)</MainDetailCustom>
      <CustomLine />
      <CustomLine02 />
      <LocalChartBlock>
        <MainLocalListBlock>
          <TypeView>
            <TypeViewList>지역</TypeViewList>
            <VerticalLine />
            <TypeViewList>확진자</TypeViewList>
            <VerticalLine />
            <TypeViewList>당일 확진자</TypeViewList>
            <VerticalLine />
            <TypeViewList>사망자</TypeViewList>
          </TypeView>
        </MainLocalListBlock>
        {charList}
      </LocalChartBlock>
    </>
  );
}

export default LocalBlock;
