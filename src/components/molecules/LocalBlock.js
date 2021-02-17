import React from 'react';

import MainDetailBlock from '../atoms/details/MainDetailBlock';
import LocalChartBlock from '../atoms/local/LocalChartBlock';
import MainLocalListBlock from '../atoms/local/MainLocalListBlock';
import TypeView from '../atoms/local/TypeView';
import TypeViewList, { FontFixed } from '../atoms/local/TypeViewList';
import VerticalLine from '../atoms/line/VerticalLine';

function LocalBlock({ local }) {
  console.log('local', local);

  const charList = local.map((x, index) => {
    return (
      <MainLocalListBlock key={index} bg={index}>
        <TypeView>
          <FontFixed>{x.gubun}</FontFixed>
          <VerticalLine />
          <FontFixed>{x.defCnt}</FontFixed>
          <VerticalLine />
          <FontFixed>{x.defCnt}</FontFixed>
          <VerticalLine />
          <FontFixed>{x.stdDay}</FontFixed>
        </TypeView>
      </MainLocalListBlock>
    );
  });

  return (
    <>
      <MainDetailBlock>지역별(시, 도)</MainDetailBlock>
      <LocalChartBlock>
        <MainLocalListBlock>
          <TypeView>
            <TypeViewList>지역</TypeViewList>
            <VerticalLine />
            <TypeViewList>총 확진자</TypeViewList>
            <VerticalLine />
            <TypeViewList>당일 확진자</TypeViewList>
            <VerticalLine />
            <TypeViewList>업데이트 시각</TypeViewList>
          </TypeView>
        </MainLocalListBlock>
        {charList}
      </LocalChartBlock>
    </>
  );
}

export default LocalBlock;
