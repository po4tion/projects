import { createAction, handleActions } from 'redux-actions';

const DIFFER = 'differ/DIFFER';

export const difference = createAction(DIFFER, (differ) => differ);

const initialState = {
  result: 0,
};

const differ = handleActions(
  {
    [DIFFER]: (_, action) => ({
      result: action.payload,
    }),
  },
  initialState
);

export default differ;
