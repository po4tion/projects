import React from 'react';
import { useSelector } from 'react-redux';

import { MainDetailCustom } from '../../atoms/details/MainDetailBlock';
import LocalChartBlock from '../../atoms/local/LocalChartBlock';
import MainLocalListBlock from '../../atoms/local/MainLocalListBlock';
import TypeView from '../../atoms/local/TypeView';
import TypeViewList, { FontFixed } from '../../atoms/local/TypeViewList';
import VerticalLine from '../../atoms/line/VerticalLine';
import FixValueBlock from '../../atoms/name/FixValueBlock';
import Arrow from '../../atoms/icons/Arrow';

import { CustomLine, CustomLine02 } from '../../atoms/line/Line';

function WorldBlock() {
  const result = useSelector((state) => state.worldLocal.array);
  const prevResult = useSelector((state) => state.worldLocal.prevArray);

  let charList;

  if (prevResult.length !== 0) {
    charList = result.map((x, index) => {
      return (
        <MainLocalListBlock key={index} bg={index}>
          <TypeView idx={index}>
            <FontFixed>{x.nationNm}</FontFixed>
            <VerticalLine />
            <FontFixed>{x.natDefCnt.toLocaleString('ko-KR')}</FontFixed>
            <VerticalLine />
            <FontFixed>
              {(x.natDefCnt - prevResult[index].natDefCnt).toLocaleString(
                'ko-KR'
              )}
            </FontFixed>
            <VerticalLine />
            <FontFixed>
              {x.natDeathCnt.toLocaleString('ko-KR')}&nbsp;
              <FixValueBlock color="rgb(255, 87, 51)">
                {(x.natDeathCnt - prevResult[index].natDeathCnt).toLocaleString(
                  'ko-KR'
                )}
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

export default WorldBlock;
