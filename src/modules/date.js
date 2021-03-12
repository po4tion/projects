import { createAction, handleActions } from 'redux-actions';

const FIRST = 'date/FIRST';
const SECOND = 'date/SECOND';
const THIRD = 'date/THIRD';
const FOURTH = 'date/FOURTH';
const FIFTH = 'date/FIFTH';
const SIXTH = 'date/SIXTH';
const SEVENTH = 'date/SEVENTH';

export const first = createAction(FIRST, (first) => first);
export const second = createAction(SECOND, (second) => second);
export const third = createAction(THIRD, (third) => third);
export const fourth = createAction(FOURTH, (fourth) => fourth);
export const fifth = createAction(FIFTH, (fifth) => fifth);
export const sixth = createAction(SIXTH, (sixth) => sixth);
export const seventh = createAction(SEVENTH, (seventh) => seventh);

const initialState = {
  first: 0,
  second: 0,
  third: 0,
  fourth: 0,
  fifth: 0,
  sixth: 0,
  seventh: 0,
};

const date = handleActions(
  {
    [FIRST]: (state, action) => ({
      ...state,
      first: action.payload,
    }),
    [SECOND]: (state, action) => ({
      ...state,
      second: action.payload,
    }),
    [THIRD]: (state, action) => ({
      ...state,
      third: action.payload,
    }),
    [FOURTH]: (state, action) => ({
      ...state,
      fourth: action.payload,
    }),
    [FIFTH]: (state, action) => ({
      ...state,
      fifth: action.payload,
    }),
    [SIXTH]: (state, action) => ({
      ...state,
      sixth: action.payload,
    }),
    [SEVENTH]: (state, action) => ({
      ...state,
      seventh: action.payload,
    }),
  },
  initialState
);

export default date;
