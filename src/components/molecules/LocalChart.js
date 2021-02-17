import LocalChartBlock from '../atoms/local/LocalChartBlock';
import MainLocalListBlock from '../atoms/local/MainLocalListBlock';
import TypeView from '../atoms/local/TypeView';
import TypeViewList from '../atoms/local/TypeViewList';
import RemoveVerticalLine from '../atoms/line/RemoveVerticlaLine';

function LocalBlock() {
  return (
    <>
      <LocalChartBlock>
        <MainLocalListBlock>
          <TypeView>
            <TypeViewList>지역</TypeViewList>
            <RemoveVerticalLine />
            <TypeViewList>총 확진자</TypeViewList>
            <RemoveVerticalLine />
            <TypeViewList>당일 확진자</TypeViewList>
            <RemoveVerticalLine />
            <TypeViewList>업데이트 시각</TypeViewList>
          </TypeView>
        </MainLocalListBlock>
      </LocalChartBlock>
    </>
  );
}

export default LocalBlock;
