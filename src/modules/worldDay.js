import { createAction, handleActions } from 'redux-actions';

const WORLD_DAY01 = 'worldDay/WORLD_DAY01';
const WORLD_DAY02 = 'worldDay/WORLD_DAY02';
const WORLD_DAY03 = 'worldDay/WORLD_DAY03';
const WORLD_DAY04 = 'worldDay/WORLD_DAY04';
const WORLD_DAY05 = 'worldDay/WORLD_DAY05';
const WORLD_DAY06 = 'worldDay/WORLD_DAY06';
const WORLD_DAY07 = 'worldDay/WORLD_DAY07';
const WORLD_DAY08 = 'worldDay/WORLD_DAY08';

export const worldDayValue01 = createAction(WORLD_DAY01, (decide, death) => [
  decide,
  death,
]);
export const worldDayValue02 = createAction(WORLD_DAY02, (decide, death) => [
  decide,
  death,
]);
export const worldDayValue03 = createAction(WORLD_DAY03, (decide, death) => [
  decide,
  death,
]);
export const worldDayValue04 = createAction(WORLD_DAY04, (decide, death) => [
  decide,
  death,
]);
export const worldDayValue05 = createAction(WORLD_DAY05, (decide, death) => [
  decide,
  death,
]);
export const worldDayValue06 = createAction(WORLD_DAY06, (decide, death) => [
  decide,
  death,
]);
export const worldDayValue07 = createAction(WORLD_DAY07, (decide, death) => [
  decide,
  death,
]);
export const worldDayValue08 = createAction(WORLD_DAY08, (decide, death) => [
  decide,
  death,
]);

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

const worldDay = handleActions(
  {
    [WORLD_DAY01]: (state, action) => ({
      ...state,
      value01: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_DAY02]: (state, action) => ({
      ...state,
      value02: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_DAY03]: (state, action) => ({
      ...state,
      value03: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_DAY04]: (state, action) => ({
      ...state,
      value04: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_DAY05]: (state, action) => ({
      ...state,
      value05: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_DAY06]: (state, action) => ({
      ...state,
      value06: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_DAY07]: (state, action) => ({
      ...state,
      value07: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
    [WORLD_DAY08]: (state, action) => ({
      ...state,
      value08: {
        decide: action.payload[0],
        death: action.payload[1],
      },
    }),
  },
  initialState
);

export default worldDay;
