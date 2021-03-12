import { createAction, handleActions } from 'redux-actions';

const FIRST = 'date/FIRST';
const SECOND = 'date/SECOND';
const THIRD = 'date/THIRD';
const FOURTH = 'date/FOURTH';
const FIFTH = 'date/FIFTH';
const SIXTH = 'date/SIXTH';
const SEVENTH = 'date/SEVENTH';

export const first = createAction(
  FIRST,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const second = createAction(
  SECOND,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const third = createAction(
  THIRD,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const fourth = createAction(
  FOURTH,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const fifth = createAction(
  FIFTH,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const sixth = createAction(
  SIXTH,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);
export const seventh = createAction(
  SEVENTH,
  (decideCnt, deathCnt, examCnt, clearCnt, careCnt) => [
    decideCnt,
    deathCnt,
    examCnt,
    clearCnt,
    careCnt,
  ]
);

const initialState = {
  first: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  second: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  third: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  fourth: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  fifth: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  sixth: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
  seventh: {
    decideCnt: 0,
    deathCnt: 0,
    examCnt: 0,
    clearCnt: 0,
    careCnt: 0,
  },
};

const date = handleActions(
  {
    [FIRST]: (state, action) => ({
      ...state,
      first: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [SECOND]: (state, action) => ({
      ...state,
      second: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [THIRD]: (state, action) => ({
      ...state,
      third: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [FOURTH]: (state, action) => ({
      ...state,
      fourth: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [FIFTH]: (state, action) => ({
      ...state,
      fifth: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [SIXTH]: (state, action) => ({
      ...state,
      sixth: {
        decideCnt: action.payload[0],
        deathCnt: action.payload[1],
        examCnt: action.payload[2],
        clearCnt: action.payload[3],
        careCnt: action.payload[4],
      },
    }),
    [SEVENTH]: (state, action) => ({
      ...state,
      seventh: {
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
