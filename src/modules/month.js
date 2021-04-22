// chart.js 월별 값들을 위한 상태관리
import { createAction, handleActions } from 'redux-actions';

const MONTH01 = 'month/MONTH01';
const MONTH02 = 'month/MONTH02';
const MONTH03 = 'month/MONTH03';
const MONTH04 = 'month/MONTH04';
const MONTH05 = 'month/MONTH05';
const MONTH06 = 'month/MONTH06';
const MONTH07 = 'month/MONTH07';
const MONTH08 = 'month/MONTH08';

export const month01 = createAction(
  MONTH01,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const month02 = createAction(
  MONTH02,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const month03 = createAction(
  MONTH03,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const month04 = createAction(
  MONTH04,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const month05 = createAction(
  MONTH05,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const month06 = createAction(
  MONTH06,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const month07 = createAction(
  MONTH07,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const month08 = createAction(
  MONTH08,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);

const initialState = {
  month01: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  month02: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  month03: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  month04: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  month05: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  month06: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  month07: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  month08: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
};

const date = handleActions(
  {
    [MONTH01]: (state, action) => ({
      ...state,
      month01: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [MONTH02]: (state, action) => ({
      ...state,
      month02: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [MONTH03]: (state, action) => ({
      ...state,
      month03: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [MONTH04]: (state, action) => ({
      ...state,
      month04: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [MONTH05]: (state, action) => ({
      ...state,
      month05: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [MONTH06]: (state, action) => ({
      ...state,
      month06: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [MONTH07]: (state, action) => ({
      ...state,
      month07: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [MONTH08]: (state, action) => ({
      ...state,
      month08: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
  },
  initialState
);

export default date;
