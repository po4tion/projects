import { createAction, handleActions } from 'redux-actions';

const PREV = 'differ/PREV';
const CURRENT = 'differ/CURRENT';

export const prev = createAction(PREV, (prev) => prev);
export const current = createAction(CURRENT, (current) => current);

const initialState = {
  prev: 0,
  current: 0,
};

const differ = handleActions(
  {
    [PREV]: (state, action) => ({
      ...state,
      prev: action.payload,
    }),
    [CURRENT]: (state, action) => ({
      ...state,
      current: action.payload,
    }),
  },
  initialState
);

export default differ;
