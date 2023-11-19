// chart.js의 세계 - 월별 데이터를 위한 상태 관리
import { createAction, handleActions } from 'redux-actions';

const WORLD_MONTH01 = 'worldMonth/WORLD_MONTH01';
const WORLD_MONTH02 = 'worldMonth/WORLD_MONTH02';
const WORLD_MONTH03 = 'worldMonth/WORLD_MONTH03';
const WORLD_MONTH04 = 'worldMonth/WORLD_MONTH04';
const WORLD_MONTH05 = 'worldMonth/WORLD_MONTH05';
const WORLD_MONTH06 = 'worldMonth/WORLD_MONTH06';
const WORLD_MONTH07 = 'worldMonth/WORLD_MONTH07';
const WORLD_MONTH08 = 'worldMonth/WORLD_MONTH08';

export const worldMonthValue01 = createAction(
  WORLD_MONTH01,
  (decide, death) => [decide, death]
);
export const worldMonthValue02 = createAction(
  WORLD_MONTH02,
  (decide, death) => [decide, death]
);
export const worldMonthValue03 = createAction(
  WORLD_MONTH03,
  (decide, death) => [decide, death]
);
export const worldMonthValue04 = createAction(
  WORLD_MONTH04,
  (decide, death) => [decide, death]
);
export const worldMonthValue05 = createAction(
  WORLD_MONTH05,
  (decide, death) => [decide, death]
);
export const worldMonthValue06 = createAction(
  WORLD_MONTH06,
  (decide, death) => [decide, death]
);
export const worldMonthValue07 = createAction(
  WORLD_MONTH07,
  (decide, death) => [decide, death]
);
export const worldMonthValue08 = createAction(
  WORLD_MONTH08,
  (decide, death) => [decide, death]
);

const initialState = {
  value01: {
    decide: 0,
    death: 0,
  },
  value02: {
    decide: 0,
    death: 0,
  },
  value03: {
    decide: 0,
    death: 0,
  },
  value04: {
    decide: 0,
    death: 0,
  },
  value05: {
    decide: 0,
    death: 0,
  },
  value06: {
    decide: 0,
    death: 0,
  },
  value07: {
    decide: 0,
    death: 0,
  },
  value08: {
    decide: 0,
    death: 0,
  },
};

const worldMonth = handleActions(
  {
    [WORLD_MONTH01]: (state, action) => ({
      ...state,
      value01: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_MONTH02]: (state, action) => ({
      ...state,
      value02: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_MONTH03]: (state, action) => ({
      ...state,
      value03: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_MONTH04]: (state, action) => ({
      ...state,
      value04: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_MONTH05]: (state, action) => ({
      ...state,
      value05: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_MONTH06]: (state, action) => ({
      ...state,
      value06: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_MONTH07]: (state, action) => ({
      ...state,
      value07: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_MONTH08]: (state, action) => ({
      ...state,
      value08: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
  },
  initialState
);

export default worldMonth;
