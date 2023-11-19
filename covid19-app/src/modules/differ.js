// 전날 대비 증가값 상태 관리
import { createAction, handleActions } from 'redux-actions';

const PREV = 'differ/PREV';
const CURRENT = 'differ/CURRENT';

export const prev = createAction(PREV, (decide, death, clear, exam) => [
  decide,
  death,
  clear,
  exam,
]);
export const current = createAction(CURRENT, (decide, death, clear, exam) => [
  decide,
  death,
  clear,
  exam,
]);

const initialState = {
  prev: {
    decideCnt: 0,
    deathCnt: 0,
    clearCnt: 0,
    examCnt: 0,
  },
  current: {
    decideCnt: 0,
    deathCnt: 0,
    clearCnt: 0,
    examCnt: 0,
  },
};

const differ = handleActions(
  {
    [PREV]: (state, action) => ({
      ...state,
      prev: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        clearCnt: action.payload[2],
        examCnt: action.payload[3],
      },
    }),
    [CURRENT]: (state, action) => ({
      ...state,
      current: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        clearCnt: action.payload[2],
        examCnt: action.payload[3],
      },
    }),
  },
  initialState
);

export default differ;
