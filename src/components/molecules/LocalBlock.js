import React from 'react';

import MainDetailBlock from '../atoms/details/MainDetailBlock';
import LocalChartBlock from '../atoms/local/LocalChartBlock';
import MainLocalListBlock from '../atoms/local/MainLocalListBlock';
import TypeView from '../atoms/local/TypeView';
import TypeViewList, { FontFixed } from '../atoms/local/TypeViewList';
import VerticalLine from '../atoms/line/VerticalLine';

function LocalBlock({ children }) {
  const array = [100, 100, 100, 100, 100];

  const charList = array.map((x, index) => (
    <MainLocalListBlock key={index}>
      <TypeView>
        <FontFixed>{x}</FontFixed>
        <VerticalLine />
        <FontFixed>{x}</FontFixed>
        <VerticalLine />
        <FontFixed>{x}</FontFixed>
        <VerticalLine />
        <FontFixed>{x}</FontFixed>
      </TypeView>
    </MainLocalListBlock>
  ));

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
