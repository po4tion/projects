// 전 세계 총합 확진자, 사망자 수와 전날 대비 증가수를 위한 상태 관리
import { createAction, handleActions } from 'redux-actions';

const WORLD_DECIDECNT = 'worldValue/WORLD_DECIDECNT';
const WORLD_DEATHCNT = 'worldValue/WORLD_DEATHCNT';
const PREV_WORLD_DECIDECNT = 'worldValue/PREV_WORLD_DECIDECNT';
const PREV_WORLD_DEATHCNT = 'worldValue/PREV_WORLD_DEATHCNT';

export const worldDecideCnt = createAction(WORLD_DECIDECNT, (decide) => decide);
export const worldDeathCnt = createAction(WORLD_DEATHCNT, (death) => death);
export const prevWorldDecideCnt = createAction(
  PREV_WORLD_DECIDECNT,
  (decide) => decide
);
export const prevWorldDeathCnt = createAction(
  PREV_WORLD_DEATHCNT,
  (death) => death
);

const initialState = {
  decideCnt: 0,
  deathCnt: 0,
  prev: {
    decideCnt: 0,
    deathCnt: 0,
  },
};

const worldValue = handleActions(
  {
    [WORLD_DECIDECNT]: (state, action) => ({
      ...state,
      decideCnt: action.payload,
    }),
    [WORLD_DEATHCNT]: (state, action) => ({
      ...state,
      deathCnt: action.payload,
    }),
    [PREV_WORLD_DECIDECNT]: (state, action) => ({
      ...state,
      prev: {
        ...state.prev,
        decideCnt: action.payload,
      },
    }),
    [PREV_WORLD_DEATHCNT]: (state, action) => ({
      ...state,
      prev: {
        ...state.prev,
        deathCnt: action.payload,
      },
    }),
  },
  initialState
);

export default worldValue;
